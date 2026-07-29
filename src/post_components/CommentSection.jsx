import { memo, useEffect, useMemo, useState } from "react";
import useFetch from "../tools/useFetch";
import Comment from "./Comment";
import generateCommentsResponse from "../tools/generateCommentsResponse";

const CommentList = ({ url, laneCount, now }) => {
  const [comments, setComments] = useState(null);

  // const { data, isLoading, error } = useFetch(url);

  const data = useMemo(() => generateCommentsResponse(), []);
  const isLoading = false;
  const error = null;

  console.log(comments);

  useEffect(() => {
    if (!data) return;
    setComments(data[1].data.children);
  }, [data]);

  return (
    <section
      className={`flex flex-col gap-4 max-h-50 px-3 overflow-y-scroll overflow-x-hidden border-x rounded-xl border-gray-300 ${
        laneCount === 1 ? "w-[50%]" : "w-[90%]"
      }`}
    >
      {comments &&
        comments.map((comment) => {
          return (
            <Comment key={comment.data.id} data={comment.data} now={now} />
          );
        })}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </section>
  );
};

export default CommentList;
