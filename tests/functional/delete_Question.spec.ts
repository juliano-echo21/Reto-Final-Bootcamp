import { test } from "@japa/runner";

test("delete question", async ({ client, assert }) => {
  const response = await client.delete("api/v1/questions/deleteQuestion/8");
  response.assertStatus(200);
  assert.isObject(response.body());
});
