import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title')
      table.integer('publisher_id')
      .unsigned()
      .references('id')
      .inTable('publishers')
      .onUpdate('NO ACTION')
      .onDelete('SET NULL');
      table.string('description')
      table.string('isbn')
      table.string('language')
      table.integer('year')
      table.integer('pages')
      table.integer('author_id')
      .unsigned()
      .references('id')
      .inTable('authors')
      .onUpdate('NO ACTION')
      .onDelete('SET NULL');
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
