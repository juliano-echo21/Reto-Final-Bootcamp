import User from "App/Models/User";
import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @hasMany(() => User)
  public users: HasMany<typeof User>;
}
