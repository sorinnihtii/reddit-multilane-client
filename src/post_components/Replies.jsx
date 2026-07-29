import { memo } from "react";
import Comment from "./Comment";

const Replies = ({ replies }) => {
  return (
    <div className="flex flex-col gap-4">
      {replies.data.children.map((reply) => {
        if (reply.data.children) return;
        return (
          <Comment
            key={reply.data.id}
            data={reply.data}
            now={Date.now() / 1000}
          />
        );
      })}
    </div>
  );
};

export default Replies;
