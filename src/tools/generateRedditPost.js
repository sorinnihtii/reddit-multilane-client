import { faker } from "@faker-js/faker";

const subreddits = [
  "javascript",
  "reactjs",
  "webdev",
  "programming",
  "typescript",
];

const domains = [
  "github.com",
  "developer.mozilla.org",
  "stackoverflow.com",
  "vite.dev",
  "react.dev",
];

function generateCommonFields() {
  return {
    id: faker.string.alphanumeric(6),
    name: `t3_${faker.string.alphanumeric(6)}`,

    title: faker.lorem.sentence(),

    author: faker.internet.username(),

    subreddit: faker.helpers.arrayElement(subreddits),

    score: faker.number.int({ min: 1, max: 50000 }),

    ups: faker.number.int({ min: 1, max: 50000 }),

    downs: 0,

    num_comments: faker.number.int({ min: 0, max: 3000 }),

    permalink: `/r/javascript/comments/${faker.string.alphanumeric(6)}`,

    created_utc: Math.floor(faker.date.recent({ days: 30 }).getTime() / 1000),

    over_18: false,

    stickied: false,

    locked: faker.datatype.boolean(),

    is_video: false,
  };
}

function generateImagePost() {
  const image = faker.image.urlPicsumPhotos({
    width: 1200,
    height: 800,
  });

  return {
    kind: "t3",
    data: {
      ...generateCommonFields(),

      is_self: false,

      is_gallery: false,

      is_reddit_media_domain: true,

      url: image,

      thumbnail: image,

      preview: {
        images: [
          {
            source: {
              url: image,
              width: 1200,
              height: 800,
            },
          },
        ],
      },
    },
  };
}

function generateGalleryPost() {
  const imageCount = faker.number.int({
    min: 2,
    max: 6,
  });

  const images = Array.from({ length: imageCount }, () =>
    faker.image.urlPicsumPhotos({
      width: 1200,
      height: 800,
    }),
  );

  return {
    kind: "t3",
    data: {
      ...generateCommonFields(),

      is_self: false,

      is_gallery: true,

      gallery_data: {
        items: images.map((_, i) => ({
          media_id: `media_${i}`,
        })),
      },

      media_metadata: Object.fromEntries(
        images.map((img, i) => [
          `media_${i}`,
          {
            s: {
              u: img,
            },
          },
        ]),
      ),
    },
  };
}

function generateSelfPost() {
  return {
    kind: "t3",
    data: {
      ...generateCommonFields(),

      is_self: true,

      selftext: faker.lorem.paragraphs({
        min: 2,
        max: 5,
      }),
    },
  };
}

function generateLinkPost() {
  const preview = faker.image.urlPicsumPhotos({
    width: 1200,
    height: 800,
  });

  const domain = faker.helpers.arrayElement(domains);

  return {
    kind: "t3",
    data: {
      ...generateCommonFields(),

      is_self: false,

      domain,

      url: `https://${domain}`,

      preview: {
        images: [
          {
            source: {
              url: preview,
              width: 1200,
              height: 800,
            },
          },
        ],
      },
    },
  };
}

export function generateRedditPost() {
  const generator = faker.helpers.arrayElement([
    generateImagePost,
    generateGalleryPost,
    generateSelfPost,
    generateLinkPost,
  ]);

  return generator();
}
