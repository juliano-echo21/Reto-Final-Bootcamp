import { test } from "@japa/runner";

test("get user", async ({ client, assert }) => {
  const response = await client.get("api/v1/user/getUser/1");
  response.assertStatus(200);
  assert.isObject(response.body());
});
