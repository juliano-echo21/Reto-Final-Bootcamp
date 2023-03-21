import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary;
      table.string("first_name").notNullable();
      table.string("second_name").notNullable();
      table.string("surname").notNullable();
      table.string("second_sur_name").notNullable();
      table.string("document_number").notNullable();
      table
        .integer("type_document")
        .references("id")
        .inTable("type_documents")
        .unsigned()
        .notNullable();
      table.string("password").notNullable();
      table
        .integer("role_id")
        .references("id")
        .inTable("roles")
        .unsigned()
        .notNullable();
      table.string("phone").notNullable();
      table.string("email").notNullable();
      table.boolean("state").notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
