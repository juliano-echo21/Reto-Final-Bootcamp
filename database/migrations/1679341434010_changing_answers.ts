import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ChangingAnswers extends BaseSchema {
  protected tableName = "forms";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("answers");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("answers");
    });
  }
}
