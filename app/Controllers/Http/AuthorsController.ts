import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author'
import {schema, validator} from '@ioc:Adonis/Core/Validator'
export default class AuthorsController {
    private authorSchema(){
        return schema.create({
        name: schema.string({trim: true}),
        address: schema.string({trim: true}),
        birthdate : schema.string({ trim: true })
    })
}

public async getAuthors({ response }: HttpContextContract){
    const author = await Author.all()
    console.log(author)
    return response.json(author)
}
public async getAuthorById({response, params} : HttpContextContract){
    const {id} = params

    const author = await Author.findOrFail(id)
    if(!author){
        return response.status(404).json({message: 'Author not found'})
    }
    return response.json(author)
}

public async editAuthor({request, response, params} : HttpContextContract){
    const {id} = params
    const author = await Author.findOrFail(id)
    const data = {...author, ...request.body()}
  
    const validation = await  validator.validate({schema: this.authorSchema(),data})
    const update = await Author
    .query()
    .where('id', id)
    .update({...validation })
  
    if(!update){
        return response.status(404).json({message: 'Author not found'})
    }
    return response.json(update)
}
public async storeAuthor({request, response} : HttpContextContract){
  
    try {
        const author = new Author()
        const data = await request.validate({schema: this.authorSchema()})
        const result = await  author.fill(data)
        author.save()
        return response.send({message: result})
    }
    catch (error) {
        return response.badRequest(error)
    }
}

public async deleteAuthor({response, params} : HttpContextContract){
    const {id} = params
   try {
    const author = await Author.findOrFail(id)
    await author.delete()
    return response.send({message: 'Author deleted'})
}
    catch (error) {
        return response.badRequest(error)
    }
    
}
}

