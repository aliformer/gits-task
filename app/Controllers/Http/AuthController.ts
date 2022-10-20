import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        const userSchema = schema.create({
          username: schema.string({ trim: true }, [
            rules.unique({table: 'users', column: 'username', caseInsensitive: true}),
          ]),
          email: schema.string({ trim: true }, [
            rules.email(),
            rules.unique({table: 'users', column: 'email', caseInsensitive: true}),
          ]),
          password: schema.string({ trim: true }, [rules.minLength(8)]),
        })
    
        const data = await request.validate({ schema: userSchema })
        const user = await User.create(data)
       return  response.created(user)
      }
    
      public async login({ request, auth }: HttpContextContract) {
        const email = await request.input('email')
        const password = await request.input('password')
        const token = await auth.attempt(email, password)
        return token.toJSON()
       
      }
    
      public async logout({ response, auth }: HttpContextContract) {
        await auth.logout()
        response.send('logout successful')
      }
}
