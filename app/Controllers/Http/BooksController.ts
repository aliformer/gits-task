import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import { schema, validator} from '@ioc:Adonis/Core/Validator'

export default class BooksController {
     private bookSchema(){
            return schema.create({
            description: schema.string({trim: true}),
            title : schema.string({ trim: true }),
            isbn : schema.string({ trim: true }),
            language : schema.string({ trim: true }),
            year : schema.number(),
            author_id: schema.number(),
            publisher_id: schema.number(),
            pages: schema.number()
        })
    }
  
    public async getBooks({request, response}: HttpContextContract){
        const books = await Book.all()
        console.log(books)
        return response.json(books)
    }
    public async getBookById({response, params} : HttpContextContract){
        const {id} = params

        const book = await Book.findOrFail(id)
        if(!book){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.json(book)
    }

    public async editBook({request, response, params} : HttpContextContract){
        const {id} = params
        const book = await Book.findOrFail(id)
        const data = {...book, ...request.body()}
      
        const validation = await  validator.validate({schema: this.bookSchema(),data})
        const update = await Book
        .query()
        .where('id', id)
        .update({...validation })
      
        if(!update){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.json(update)
    }
    public async storeBook({request, response} : HttpContextContract){
      
        try {
            const book = new Book()
            const data = await request.validate({schema: this.bookSchema()})
            const result = await  book.fill(data)
            book.save()
            return response.send({message: result})
        }
        catch (error) {
            return response.badRequest(error)
        }
    }
}
