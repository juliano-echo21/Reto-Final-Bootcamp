/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.group(() => {
    Route.post("/create", "UsersController.create");
    Route.post("/login", "UsersController.login");
    Route.group(() => {
      Route.get("/getUsers", "UsersController.show");
      Route.put("/update/:id", "UsersController.update");
      Route.get("/getUser/:id", "UsersController.showUser");
    })
      .middleware("auth")
      .middleware("userPermissions");
  }).prefix("/user");
  Route.group(() => {
    Route.post("/create", "QuestionsController.create");
    Route.get("/getQuestions", "QuestionsController.show");
    Route.delete("/deleteQuestion/:id", "QuestionsController.delete");
    Route.put("/updateQuestion/:id", "QuestionsController.update");
    Route.put("/updateAnswer/:id", "QuestionsController.updateAnswer");
    Route.get("/getOptions/:id", "QuestionsController.getOptions");
  })
    .prefix("/questions")
    .middleware("auth")
    .middleware("userPermissions");
  Route.group(() => {
    Route.get("/getquestions", "FormsController.show");
    Route.post("/postquestions", "FormsController.create");
  })
    .prefix("/form")
    .middleware("auth")
    .middleware("userPermissions");
}).prefix("/api/v1");
