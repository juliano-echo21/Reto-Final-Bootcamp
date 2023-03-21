import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import docTypes from "App/resources/docTypes";

export default class CreatingDocTypes extends BaseSchema {
  protected tableName = "type_documents";

  public async up() {
    this.defer(async (db) => {
      await db.table(this.tableName).insert([
        {
          id: docTypes.Cedula,
          name: "Cedula",
          state: true,
        },
        {
          id: docTypes["Tarjeta Identidad"],
          name: "Tarjeta de Identidad",
          state: true,
        },
      ]);
    });
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
