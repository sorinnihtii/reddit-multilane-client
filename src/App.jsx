import { useNavigate } from "react-router-dom";

import Feed from "./Feed";
import { useEffect, useState } from "react";

function App() {
  const [showNewLaneForm, setShowNewLaneForm] = useState(false);
  const [subreddit, setSubreddit] = useState("");
  const [lanes, setLanes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log(lanes);

  useEffect(() => {
    setError(null);
    setSubreddit("");
  }, [showNewLaneForm]);

  function handleShowNewLaneForm() {
    setShowNewLaneForm((prev) => !prev);
  }

  function handleNewLane(e) {
    e.preventDefault();
    if (lanes.includes(subreddit)) {
      setError("Subreddit already added");
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
      <nav className="fixed flex items-center left-0 top-0 h-14 px-10 w-screen bg-white border-b-2 border-gray-700 z-100">
        <header className="flex flex-col">
          <h1 className="cursor-default">Reddit Multi Lane</h1>
        </header>
        <button
          onClick={handleShowNewLaneForm}
          className="ml-auto px-2 py-px cursor-pointer bg-gray-200 text-sm rounded-xl"
        >
          New Lane
        </button>
      </nav>
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
        className={`relative grid w-screen h-screen gap-px ${lanes.length > 1 ? "bg-gray-500" : "bg-white"}`}
        style={{ gridTemplateColumns: `repeat(${lanes.length}, 1fr)` }}
      >
        {lanes &&
          lanes.map((lane) => (
            <Feed
              key={lane}
              subreddit={lane}
              handleCloseLane={handleCloseLane}
            />
          ))}
      </main>
    </>
  );
}
export default App;
