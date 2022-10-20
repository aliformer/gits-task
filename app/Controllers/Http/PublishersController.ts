// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publisher from 'App/Models/Publisher'
import { schema, validator} from '@ioc:Adonis/Core/Validator'

export default class PublishersController {
     private bookSchema(){
            return schema.create({
            name: schema.string({trim: true}),
            email: schema.string({trim: true}),
            address : schema.string({ trim: true }),
            establish_date : schema.date(),
        })
    }
  
    public async getPublishers({response}: HttpContextContract){
        const publishers = await Publisher.all()
        console.log(publishers)
        return response.json(publishers)
    }
    public async getPublisherById({response, params} : HttpContextContract){
        const {id} = params

        const publisher = await Publisher.findOrFail(id)
        if(!publisher){
            return response.status(404).json({message: 'Publisher not found'})
        }
        return response.json(publisher)
    }

    public async editPublisher({request, response, params} : HttpContextContract){
        const {id} = params
        const publisher = await Publisher.findOrFail(id)
        const data = {...publisher, ...request.body()}
      
        const validation = await  validator.validate({schema: this.bookSchema(),data})
        const update = await Publisher
        .query()
        .where('id', id)
        .update({...validation })
      
        if(!update){
            return response.status(404).json({message: 'Publisher not found'})
        }
        return response.json(update)
    }
    public async storePublisher({request, response} : HttpContextContract){
      
        try {
            const publisher = new Publisher()
            const data = await request.validate({schema: this.bookSchema()})
            const result = await  publisher.fill(data)
            publisher.save()
            return response.send({message: result})
        }
        catch (error) {
            return response.badRequest(error)
        }
    }
}
