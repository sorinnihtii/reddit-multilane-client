import { useEffect, useState } from "react";
import useFetch from "./tools/useFetch.jsx";
import Post from "./post_components/Post.jsx";

const homepage = "/reddit";

const Feed = ({ subreddit, handleCloseLane, laneCount, now }) => {
  const [query, setQuery] = useState(
    homepage + `/r/${subreddit}.json?raw_json=1`,
  );

  const [posts, setPosts] = useState([]);

  const { data, isLoading, error } = useFetch(query, {
    "User-Agent":
      "multilane-reddit-client:1.0 (github.com/sorinnihtii/roadmapsh/tree/main/Frontend/Intermediate/reddit-client)",
  });

  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    if (!data) return;

    setPosts((prev) => {
      const ids = new Set(prev.map((p) => p.data.id));
      const unique = data.data.children.filter((p) => !ids.has(p.data.id));
      console.log(unique);

      return [...prev, ...unique];
    });
  }, [data, attemptCount]);

  const loadMorePosts = () => {
    setQuery(`/reddit/r/${subreddit}.json?after=${data.data.after}&raw_json=1`);
  };

  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Failed to copy text:", err);
      alert(err);
    } finally {
      alert("Link saved succesfully");
    }
  };

  return (
    <section className="relative h-screen bg-white">
      <header className="flex items-center w-full h-8 gap-4 pl-4 border-b border-gray-400">
        <button
          onClick={() => {
            handleCloseLane(subreddit);
          }}
          className="cursor-pointer"
        >
          X
        </button>
        <p>r/{subreddit}</p>
      </header>

      <div className="relative h-screen pb-22 overflow-y-scroll overflow-x-hidden no-scrollbar">
        {posts &&
          posts.map((post) => {
            return (
              <Post
                key={post.data.id}
                data={post.data}
                copyToClipboard={copyToClipboard}
                laneCount={laneCount}
                now={now}
              />
            );
          })}
        {!isLoading && !error && data && (
          <button
            onClick={loadMorePosts}
            className="px-4 py-px bg-orange-400 rounded-xl cursor-pointer"
          >
            View more posts
          </button>
        )}

        {isLoading && <p>Loading...</p>}
        {error && (
          <div className="flex flex-col items-center justify-center gap-1 h-full bg-red-50 cursor-pointer">
            <p className="text-red-500 mx-auto">{error.message}</p>
            <button
              className="rounded-md bg-gray-300 py-px px-3"
              onClick={() => setAttemptCount((prev) => prev + 1)}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
