import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
import Env from "@ioc:Adonis/Core/Env";

export default class UsersController {
  public async showUser({ request, response }: HttpContextContract) {
    const id = request.param("id");
    try {
      const user = await this.checkUserById(id);
      response.status(200).json(user);
    } catch (error) {
      response.status(400).json({
        state: false,
        message: "Error al consultar el detalle del usuario",
      });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    // const { firstName, secondName, password, } = request.all();
    const {
      firstName,
      secondName,
      surname,
      secondSurName,
      typeDocument,
      documentNumber,
      email,
      phone,
      password,
      rol,
    } = request.all();

    let b = await this.checkUser(documentNumber);

    if (!b) {
      const user = new User();

      try {
        user.firstName = firstName;
        user.secondName = secondName;
        user.surname = surname;
        user.secondSurName = secondSurName;
        user.documentNumber = documentNumber;
        user.typeDocument = typeDocument;
        user.email = email;
        user.phone = phone;
        user.roleId = rol;

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        return response.status(200).json({
          state: true,
          message: "Estudiante creado correctamente",
        });
      } catch (error) {
        console.log(error);
        return response.status(400).json({
          state: false,
          message: "Fallo en la creación del estudiante",
        });
      }
    } else {
      return response.status(400).json({
        state: false,
        message: "exist Fallo en la creación del estudiante",
      });
    }
  }

  public async login({ request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    try {
      const user = await User.findBy("email", email);
      if (!user) {
        return response
          .status(400)
          .json({ state: false, message: "constraseña o email invalido " });
      }
      const validPass = bcryptjs.compareSync(password, user.password);
      if (!validPass) {
        return response
          .status(400)
          .json({ state: false, message: "constraseña o email invalido " });
      }

      const payload = {
        name: user.firstName,
        id: user.id,
      };
      const token = await this.generarToken(payload);
      response.status(200).json({
        token: token,
        state: true,
        id: user.id,
        name: `${user.firstName} ${user.secondName} ${user.secondSurName}`,
        role: user.roleId,
        message: "Ingreso exitoso",
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({ msg: "server error", error });
    }
  }

  public async generarToken(payload) {
    const options = {
      expiresIn: "15 mins",
    };
    return jwt.sign(payload, Env.get("JWT_SECRET_KEY"), options);
  }

  public async show({ request, response }: HttpContextContract) {
    // const { filter, id } = request.all();

    // console.log(filter);
    console.log(request);

    // const inputName = "daniel";
    try {
      const users = await User.all();
      return response.status(200).json({
        state: true,
        users: users,
      });
    } catch (error) {
      response.status(400).json({
        state: false,
        message: "Error al obtener usuarios",
      });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param("id");
    const {
      firstName,
      secondName,
      surname,
      secondSurName,
      typeDocument,
      documentNumber,
      email,
      phone,
    } = request.all();

    const user = await this.checkUserById(id);
    if (user) {
      try {
        user.firstName = firstName;
        user.secondName = secondName;
        user.surname = surname;
        user.secondSurName = secondSurName;
        user.typeDocument = typeDocument;
        user.documentNumber = documentNumber;
        user.email = email;
        user.phone = phone;
        user.save();
        response
          .status(200)
          .json({ state: true, message: "Se ha actualizado correctamente" });
      } catch (error) {
        response
          .status(400)
          .json({ state: false, message: "error al actualizar" });
      }
    } else {
      response
        .status(400)
        .json({ state: false, message: "error al actualizar" });
    }
  }

  public async checkUser(documentNumber) {
    const user = await User.findBy("documentNumber", documentNumber);
    console.log(user, "from check");
    console.log(typeof documentNumber, "from check");
    return user;
  }

  public async checkUserById(id) {
    const user = await User.findBy("id", id);
    // console.log(user, "from check");
    // console.log(typeof id, "from check");
    return user;
  }

  public async verifyToken(authorizationHeader) {
    let token = authorizationHeader.split(" ")[1];
    token = jwt.verify(token, Env.get("JWT_SECRET_KEY"), (error) => {
      if (error) {
        throw new Error("the token has expired");
      }
    });

    return token;
  }

  public obtenerPayload(authorizationHeader: string) {
    let token = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {
      complete: true,
    }).payload;
    console.log(payload);
    return payload;
  }
}
