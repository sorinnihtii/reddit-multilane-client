import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "./Home.jsx";
import About from "./About.jsx";

function App() {
  return (
    <>
      <div className="flex relative items-center left-0 top-0 h-14 px-10 w-screen bg-white border-b-2 border-gray-700">
        <img src="../res/reddit-logo.png" className="h-12"></img>
        <h1 className="cursor-default text-lg text-[#FF4500]">
          Reddit MultiLane
        </h1>
        <Link to="/" className="ml-8 text-sm cursor-pointer">
          Home
        </Link>
        <Link to="/about" className="ml-8 text-sm cursor-pointer">
          About
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
export default App;
