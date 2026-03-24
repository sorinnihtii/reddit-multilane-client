import Feed from "./Feed";
import { useEffect, useState } from "react";
import useFetch from "./tools/useFetch.jsx";

const Home = () => {
  const [showNewLaneForm, setShowNewLaneForm] = useState(false);
  const [subreddit, setSubreddit] = useState("");
  const [lanes, setLanes] = useState(() => {
    const saved = localStorage.getItem("subreddits");
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState(null);
  const [now, setNow] = useState(null);

  const { data: currentTime } = useFetch(
    "https://api.api-ninjas.com/v1/timezone?timezone=UTC",
    { "X-Api-Key": "EXVH8N3GAl2ErZ5oV3eq271zML8LHQd6Ul1xPZ7n" },
  );

  useEffect(() => {
    if (!currentTime) return;
    const now_iso = currentTime.local_time.replace(" ", "T") + "Z";
    const now_unix = Math.floor(new Date(now_iso).getTime() / 1000);

    setNow(now_unix);
  }, [currentTime]);

  useEffect(() => {
    setError(null);
    setSubreddit("");
  }, [showNewLaneForm]);

  useEffect(() => {
    saveSubreddits(lanes);
  }, [lanes]);

  function handleShowNewLaneForm() {
    setShowNewLaneForm((prev) => !prev);
  }

  function saveSubreddits(value) {
    localStorage.setItem("subreddits", JSON.stringify(value));
  }

  function handleNewLane(e) {
    e.preventDefault();
    if (lanes.includes(subreddit)) {
      setError("Subreddit already added");
      return;
    }
    if (lanes.length === 3) {
      setError("You are limited to 3 subreddits at once");
      return;
    }
    setLanes((prev) => [...prev, subreddit]);
    setShowNewLaneForm(false);
  }

  const handleCloseLane = (toBeRemoved) => {
    setLanes((prev) => prev.filter((p) => p != toBeRemoved));
  };

  return (
    <>
      <button
        onClick={handleShowNewLaneForm}
        className="fixed right-4 bottom-4 px-3 py-0.5 cursor-pointer bg-[#FF4500] text-white text-sm rounded-xl z-100"
      >
        New Lane
      </button>
      {showNewLaneForm && (
        <form
          onSubmit={handleNewLane}
          className="fixed flex flex-col justify-center top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-300 w-[25vw] p-4 bg-white border-2 rounded-xl"
        >
          <label
            className="font-semibold text-md text-center"
            htmlFor="subreddit"
          >
            Please enter the name of the subreddit:
          </label>
          <input
            id="subreddit"
            type="text"
            pattern="[A-Za-z]+"
            value={subreddit}
            onInput={(e) => setSubreddit(e.target.value)}
            className="mt-1 h-6 border rounded-md"
          />
          <button
            type="submit"
            className="py-1.75 mt-3 w-fit px-4 mx-auto text-xs bg-black text-white font-semibold rounded-md cursor-pointer"
          >
            Add Subreddit
          </button>
          <button
            type="button"
            onClick={() => {
              setShowNewLaneForm(false);
            }}
            className="text-xs py-1 mt-1 mx-auto px-10 text-black font-semibold cursor-pointer"
          >
            Cancel
          </button>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </form>
      )}
      <main
        className={`grid w-screen h-screen gap-px ${lanes.length > 1 ? "bg-gray-500" : "bg-white"}`}
        style={{ gridTemplateColumns: `repeat(${lanes.length}, 1fr)` }}
      >
        {lanes &&
          now &&
          lanes.map((lane) => (
            <Feed
              key={lane}
              subreddit={lane}
              handleCloseLane={handleCloseLane}
              laneCount={lanes.length}
              now={now}
            />
          ))}
      </main>
    </>
  );
};

export default Home;
