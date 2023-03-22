import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UsersController from "App/Controllers/Http/UsersController";

export default class AuthJwt {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const authorizationHeader = ctx.request.header("authorization");
    if (authorizationHeader == undefined) {
      return ctx.response.status(400).send({
        msg: "lack of token",
        state: 401,
      });
    }
    const token = authorizationHeader;
    const userController = new UsersController();
    try {
      let newToken = userController.verifyToken(token);
    } catch (error) {}
    await next();
  }
}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import UsuariosController from 'App/Controllers/Http/UsuariosController'

// export default class AuthJwt {
//   public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
//     const authorizationHeader = ctx.request.header('authorization')
//     if(authorizationHeader == undefined) {
//       return ctx.response.status(400).send({
//         mensaje: "Falta el token de autorización",
//         estado: 401,
//       })
//     }
