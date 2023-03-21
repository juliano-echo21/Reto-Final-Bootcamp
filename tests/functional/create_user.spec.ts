import { test } from "@japa/runner";

test("crear usuario", async ({ client, assert }) => {
  const response = await client.post("api/v1/user/create").json({
    firstName: "michael",
    secondName: "carl",
    surname: "cruz",
    secondSurName: "casallas",
    typeDocument: 1,
    documentNumber: "12345432",
    email: "juls@gmail.co",
    password: "32jdkdi",
    rol: 1,
    phone: "32123122314",
  });
  response.assertStatus(200);
  assert.isObject(response.body());
});
