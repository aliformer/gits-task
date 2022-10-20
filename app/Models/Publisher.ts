import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class Publisher extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public address: string

  @column()
  public established_date : Date

  @hasOne(() => Book, {
    foreignKey: 'publisher_id'
  })
  public Book : HasOne <typeof Book>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
