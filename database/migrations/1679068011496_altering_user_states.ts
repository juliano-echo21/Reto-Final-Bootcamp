import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AlteringUserStates extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean("state").alter().notNullable().defaultTo(true);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // table.boolean("state").notNullable;
    });
  }
}
