/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')



Route.get('/books', 'BooksController.getBooks').middleware('auth')
Route.post('/books', 'BooksController.storeBook').middleware('auth')
Route.get('/books/:id', 'BooksController.getBookById').middleware('auth')
Route.put('/books/:id', 'BooksController.editBook').middleware('auth')


Route.get('/authors', 'AuthorsController.getAuthors').middleware('auth')
Route.post('/authors', 'AuthorsController.storeAuthor').middleware('auth')
Route.get('/authors/:id', 'AuthorsController.getAuthorById').middleware('auth')
Route.put('/authors/:id', 'AuthorsController.editAuthor').middleware('auth')

Route.get('/publishers', 'PublishersController.getPublishers').middleware('auth')
Route.post('/publishers', 'PublishersController.storePublisher').middleware('auth')
Route.get('/publishers/:id', 'PublishersController.getPublisherById').middleware('auth')
Route.put('/publishers/:id', 'PublishersController.editPublisher').middleware('auth')