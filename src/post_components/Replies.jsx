import { memo } from "react";
import Comment from "./Comment";

const Replies = ({ replies }) => {
  return (
    <>
      {replies.data.children.map((reply) => {
        if (reply.data.children) return;
        return <Comment key={reply.data.id} data={reply.data} />;
      })}
    </>
  );
};

export default Replies;
