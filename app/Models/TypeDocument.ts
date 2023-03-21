import { HasMany } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import { hasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class TypeDocument extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @hasMany(() => User)
  public users: HasMany<typeof User>;
}
