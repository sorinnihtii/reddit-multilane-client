import { faker } from "@faker-js/faker";
import { generateRedditPost } from "./generateRedditPost";

export function generateSubredditResponse(count = 25) {
  return {
    kind: "Listing",
    data: {
      after: faker.string.alphanumeric(8),
      before: null,

      children: Array.from({ length: count }, () => generateRedditPost()),
    },
  };
}
