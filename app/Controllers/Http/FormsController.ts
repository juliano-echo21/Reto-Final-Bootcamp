import Question from "App/Models/Question";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Form from "App/Models/Form";

export default class FormsController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    const { estudianteId, answers } = request.all();

    try {
      console.log(typeof answers);
      const form = new Form();

      form.studentId = estudianteId;
      form.answers = JSON.stringify(answers);

      await form.save();
      response
        .status(200)
        .json({ state: true, message: "Respuestas almacenadas con exito" });
    } catch (error) {
      console.log(error);
      response.status(400).json({
        state: false,
        message: "No se pudieron almacenar las respuestas",
      });
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({ request, response }: HttpContextContract) {
    try {
      const questions = await Question.query().preload("answers");
      response.status(200).json({ state: true, questions: questions });
    } catch (error) {
      response
        .status(400)
        .json({ state: false, message: "Error al obtener el listado" });
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
