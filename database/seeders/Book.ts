
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { BookFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
BookFactory.createMany(20)
  }
}