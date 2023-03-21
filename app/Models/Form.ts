import User from "App/Models/User";
import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Question from "./Question";

export default class Form extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public studentId: number;

  @column()
  public state: boolean;

  @column()
  public answerId: boolean;

  @column()
  public answers: string;

  @belongsTo(() => User)
  public student: BelongsTo<typeof User>;

  // @hasMany(() => Question)
  // public questions: HasMany<typeof Question>;
}
