import { test } from "@japa/runner";

test("get options", async ({ client, assert }) => {
  const response = await client.get("api/v1/questions/getOptions/10");
  response.assertStatus(200);
  assert.isObject(response.body());
});
