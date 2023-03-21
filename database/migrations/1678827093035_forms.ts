import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Forms extends BaseSchema {
  protected tableName = "forms";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("student_id")
        .references("id")
        .inTable("users")
        .unsigned()
        .notNullable();

      table.boolean("state").notNullable().defaultTo(true);
      table.boolean("answer_id").notNullable().defaultTo(false);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
