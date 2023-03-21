import { test } from "@japa/runner";

test("update question", async ({ client, assert }) => {
  const response = await client.put("api/v1/questions/updateQuestion/10").json({
    question: "quien gana el mundial",
  });
  response.assertStatus(200);
  assert.isObject(response.body());
});
