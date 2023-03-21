import { test } from "@japa/runner";

test("form post questions", async ({ client, assert }) => {
  const response = await client.post("api/v1/form/postquestions").json({
    estudianteId: 2,
    answers: [1, 2, 2, 3, 5],
  });
  response.assertStatus(200);
  assert.isObject(response.body());
});
