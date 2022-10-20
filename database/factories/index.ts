import Factory from '@ioc:Adonis/Lucid/Factory'
import Author from 'App/Models/Author'
import Book from 'App/Models/Book'
import Publisher from 'App/Models/Publisher'

export const AuthorFactory = Factory
  .define(Author, ({ faker }) => {
    return {
        name :  faker.name.fullName(),
        address :  faker.address.streetAddress(),
        birthdate :  faker.date.birthdate()
    }
  })
  .build()
export const BookFactory = Factory
.define(Book, ({ faker }) => {
  return {
   description : faker.lorem.paragraph(2),
   title : faker.random.words(),
   isbn : faker.random.words(),
   author_id : faker.random.numeric(2),
   publisher_id : faker.random.numeric(2),
   language : faker.address.country(),
   year : faker.date.past().getFullYear(),
   pages : faker.random.numeric(2)
  }
})
.build()

export const PublisherFactory = Factory
.define(Publisher, ({ faker }) => {
  return {
    name :  faker.name.fullName(),
    email :  faker.internet.email(),
    address :  faker.address.streetAddress(),
    established_date :  faker.date.birthdate(),
  }
})
.build()