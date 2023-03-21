import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Cascades extends BaseSchema {
  protected tableName = "answers";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("question_id").onDelete("CASCADE");
    });
  }

  public async down() {}
}
