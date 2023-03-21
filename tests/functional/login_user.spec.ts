import { test } from "@japa/runner";

test("login user", async ({ client, assert }) => {
  const response = await client.post("api/v1/user/login").json({
    email: "juls@gmail.co",
    password: "32jdkdi",
  });
  response.assertStatus(200);
  assert.isObject(response.body());
});
