import { memo, useEffect, useState } from "react";
import useFetch from "../tools/useFetch";
import Comment from "./Comment";

const CommentList = ({ url, laneCount }) => {
  const [comments, setComments] = useState(null);

  const { data, isLoading, error } = useFetch(url);

  useEffect(() => {
    if (!data) return;
    setComments(data[1].data.children);
  }, [data]);

  return (
    <section
      className={`flex flex-col gap-4 max-h-50 px-3 overflow-y-scroll border-x rounded-xl border-gray-300 ${
        laneCount === 1 ? "w-[50%]" : "w-[90%]"
      }`}
    >
      {comments &&
        comments.map((comment) => {
          return <Comment key={comment.data.id} data={comment.data} />;
        })}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </section>
  );
};

export default CommentList;
