
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import { PublisherFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
   
    await PublisherFactory.createMany(20)
  }
}
