import { useEffect, useState } from "react";
import useFetch from "./tools/useFetch.jsx";
import Post from "./post_components/Post.jsx";

const homepage = "https://www.reddit.com";

const Feed = ({ subreddit, handleCloseLane, laneCount }) => {
  const [query, setQuery] = useState(
    homepage + `/r/${subreddit}.json?raw_json=1`,
  );
  const [posts, setPosts] = useState([]);
  const { data, isLoading, error } = useFetch(query);

  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    if (!data) return;

    setPosts((prev) => {
      const ids = new Set(prev.map((p) => p.data.id));
      const unique = data.data.children.filter((p) => !ids.has(p.data.id));
      console.log("unique:", unique);
      return [...prev, ...unique];
    });
  }, [data, attemptCount]);

  const loadMorePosts = () => {
    setQuery(
      `https://www.reddit.com/r/${subreddit}.json?after=${data.data.after}&raw_json=1"`,
    );
  };

  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <section className="relative h-screen pt-14 bg-white">
      <header className="flex items-center w-full h-8 gap-4 pl-4 z-10">
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
          <>
            <p>{error.message}</p>
            <button onClick={() => setAttemptCount((prev) => prev + 1)}>
              Try again
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Feed;
