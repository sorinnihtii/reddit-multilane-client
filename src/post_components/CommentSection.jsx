import { memo, useEffect, useState } from "react";
import useFetch from "../tools/useFetch";
import Comment from "./Comment";

const CommentList = ({ url }) => {
  const [comments, setComments] = useState(null);

  const { data, isLoading, error } = useFetch(url);

  useEffect(() => {
    if (!data) return;
    setComments(data[1].data.children);
  }, [data]);

  return (
    <section>
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
