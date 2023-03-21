import { test } from "@japa/runner";

test("update answer", async ({ client, assert }) => {
  const response = await client.put("api/v1/questions/updateQuestion/9").json({
    opcion: "brazil",
    iscorrect: "false",
  });
  response.assertStatus(200);
  assert.isObject(response.body());
});
