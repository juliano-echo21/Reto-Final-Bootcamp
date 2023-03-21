import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Role from "./Role";
import TypeDocument from "./TypeDocument";
import Form from "./Form";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public firstName: string;

  @column()
  public secondName: string;

  @column()
  public surname: string;

  @column()
  public secondSurName: string;

  @column()
  public documentNumber: string;

  @column()
  public typeDocument: number;

  @column()
  public password: string;

  @column()
  public email: string;

  @column()
  public roleId: number;

  @column()
  public phone: string;

  @column()
  public state: boolean;

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>;

  @belongsTo(() => TypeDocument)
  public documentType: BelongsTo<typeof TypeDocument>;

  @hasMany(() => Form)
  public forms: HasMany<typeof Form>;
}
