import UsuariosController from "App/Controllers/Http/UsersController";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
const jwt = require("jsonwebtoken");

export default class UserPermission {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader: any = ctx.request.header("authorization");

    try {
      const usuariosController = new UsuariosController();
      const { id } = await usuariosController.obtenerPayload(
        authorizationHeader
      );
      const user = await User.find(id);

      if (!user) {
        return ctx.response.status(401).json({
          msj: "Token no válido",
        });
      }

      if (user.roleId != 0) {
        return ctx.response.status(401).json({
          msj: "No tiene permisos para acceder a esta ruta",
        });
      }
      await next();
    } catch (error) {
      console.log(error);
      ctx.response.status(400).json({ msj: "Token no valido" });
    }
  }
}
