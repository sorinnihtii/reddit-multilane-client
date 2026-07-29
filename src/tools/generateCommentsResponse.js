import generateComment from "./generateComment";

export default function generateCommentsResponse(count = 15) {
  return [
    {
      kind: "Listing",
      data: {
        children: [],
      },
    },

    {
      kind: "Listing",
      data: {
        children: Array.from({ length: count }, () => generateComment()),
      },
    },
  ];
}
