import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Question from "./Question";

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public questionId: number;

  @column()
  public answer: string;

  @column()
  public isCorrect: boolean;

  @column()
  public state: boolean;

  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>;
}
