import { test } from "@japa/runner";

test("update user", async ({ client, assert }) => {
  const response = await client.put("api/v1/user/update/1").json({
    firstName: "julio",
    secondName: "david",
    surname: "clari",
    secondSurName: "nete",
    typeDocument: 1,
    documentNumber: "12121212",
    email: "juliooo21@gmail.com",
    phone: "121212121",
  });
  response.assertStatus(200);
  assert.isObject(response.body());
});
