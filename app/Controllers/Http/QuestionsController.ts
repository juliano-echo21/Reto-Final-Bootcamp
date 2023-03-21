import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Answer from "App/Models/Answer";
import Question from "App/Models/Question";

export default class QuestionsController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    const { question, options } = request.all();
    const questionInput = new Question();
    questionInput.question = question;
    questionInput.state = true;

    try {
      await questionInput.save();

      const questionId = await this.getQuestionId(question);

      console.log(options);

      options.forEach((element) => {
        let answer = new Answer();
        answer.questionId = questionId;
        answer.answer = element["answer"];
        answer.isCorrect = element["isCorrect"];
        answer.state = true;
        console.log(answer);
        answer.save();
      });

      response
        .status(200)
        .json({ state: true, message: "Pregunta creada exitosamente" });
    } catch (error) {
      response
        .status(400)
        .json({ state: false, message: "Error al crear la pregunta" });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const questionQuery = await Question.all();
      response.status(200).json({ state: true, questions: questionQuery });
    } catch (error) {
      response
        .status(400)
        .json({ state: false, message: "Error al listar las preguntas" });
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    const id = request.param("id");
    try {
      const question = await Question.find(id);
      console.log(Boolean(question), "questiondel");
      if (question) {
        await question.delete();
        response
          .status(200)
          .json({ state: true, message: "Pregunta eliminada con exito" });
      } else {
        response
          .status(400)
          .json({ state: false, message: "Error al eliminar la pregunta" });
      }
    } catch (error) {
      console.log(error);
      response
        .status(400)
        .json({ state: false, message: "Error a eliminar la pregunta" });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param("id");
    const newQuestion = request.input("question");
    try {
      const questionToUpdate = await Question.find(id);
      if (questionToUpdate) {
        questionToUpdate.question = newQuestion;
        questionToUpdate.save();
        response
          .status(200)
          .json({ state: true, message: "Pregunta editada con exito" });
      } else {
        response
          .status(400)
          .json({ state: false, message: "Error al editar la pregunta" });
      }
    } catch (error) {
      response
        .status(400)
        .json({ state: false, message: "Error al editar la pregunta" });
    }
  }
  public async updateAnswer({ request, response }: HttpContextContract) {
    const id = request.param("id");
    const newAnswer = request.input("opcion");
    const newValue = request.input("iscorrect");
    try {
      const answerToUpdate = await Answer.find(id);
      console.log(answerToUpdate);
      if (answerToUpdate) {
        answerToUpdate.answer = newAnswer;
        answerToUpdate.isCorrect = newValue;
        answerToUpdate.save();
        response
          .status(200)
          .json({ state: true, message: "Opción editada con exito" });
      } else {
        response
          .status(400)
          .json({ state: false, message: "No se encontró esa opcion" });
      }
    } catch (error) {
      response
        .status(400)
        .json({ state: false, message: "Error al editar la opción" });
    }
  }

  public async getOptions({ request, response }: HttpContextContract) {
    const id = request.param("id");
    try {
      const questions = await Answer.query().where("question_id", id);
      response.status(200).json({
        state: true,
        message: "Listado de opciones",
        options: questions,
      });
    } catch (error) {
      response.status(400).json({
        state: false,
        message: "Error al obtener el listado de opciones",
      });
    }
  }

  public async edit({}: HttpContextContract) {}

  public async getQuestionId(question) {
    const questionToReturn = await Question.findBy("question", question);
    if (questionToReturn) {
      // console.log(questionToReturn.$attributes.id);
      return questionToReturn.$attributes.id;
    }
  }
}
