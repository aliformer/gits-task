import { DateTime } from 'luxon'
import { BaseModel, hasMany, column, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'
export default class Author extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public birthdate: Date

  @hasMany(() => Book, {
    foreignKey: 'author_id'
  })
  public books : HasMany <typeof Book>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}