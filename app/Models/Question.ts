import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Answer from "./Answer";

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public question: string;

  @column()
  public state: boolean;

  // @belongsTo(() => Form)
  // public form: BelongsTo<typeof Form>;

  @hasMany(() => Answer)
  public answers: HasMany<typeof Answer>;
}
