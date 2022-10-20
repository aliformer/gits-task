import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Author from "./Author";
import Publisher from "./Publisher";
export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public isbn: string;

  @belongsTo(() => Publisher, {
    localKey: "id",
  })
  public publisher_id: BelongsTo<typeof Publisher>;

  @belongsTo(() => Author, {
    localKey: "id",
  })
  public author_id: BelongsTo<typeof Author>;

  @column()
  public description: string;

  @column()
  public title: string;

  @column()
  public publisher: string;

  @column()
  public isbn: string;

  @column()
  public language: string;

  @column()
  public year: number;

  @column()
  public pages: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
