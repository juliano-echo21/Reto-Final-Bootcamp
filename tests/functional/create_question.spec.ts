import { test } from "@japa/runner";

test("create question", async ({ client, assert }) => {
  const response = await client.post("api/v1/questions/create").json({
    question: "quien ganara?",
    options: [
      {
        answer: "esta1",
        isCorrect: true,
      },
      { answer: "esta2", isCorrect: false },
      { answer: "esta3", isCorrect: false },
      { answer: "esta4", isCorrect: false },
    ],
  });
  response.assertStatus(200);
  assert.isObject(response.body());
});
