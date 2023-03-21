import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import RoleNumbers from "App/resources/roles";

export default class Roles extends BaseSchema {
  protected tableName = "roles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("id").unsigned().primary();
      table.string("name");
      table.boolean("state");
    });

    this.defer(async (db) => {
      await db.table(this.tableName).insert([
        {
          id: RoleNumbers.ADMIN,
          name: "Admin User",
          state: true,
        },
        {
          id: RoleNumbers.STUDENT,
          name: "Basic User",
          state: true,
        },
      ]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
