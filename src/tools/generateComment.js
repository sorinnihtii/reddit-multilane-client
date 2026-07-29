import { faker } from "@faker-js/faker";

export default function generateComment(depth = 0) {
  const hasReplies = depth < 2 && faker.datatype.boolean();

  return {
    kind: "t1",

    data: {
      id: faker.string.alphanumeric(7),

      author: faker.internet.username(),

      body: faker.lorem.paragraph(),

      score: faker.number.int({
        min: 0,
        max: 5000,
      }),

      created_utc: Math.floor(faker.date.recent({ days: 30 }).getTime() / 1000),

      replies: hasReplies
        ? {
            kind: "Listing",
            data: {
              children: Array.from(
                {
                  length: faker.number.int({
                    min: 1,
                    max: 3,
                  }),
                },
                () => generateComment(depth + 1),
              ),
            },
          }
        : "",
    },
  };
}
