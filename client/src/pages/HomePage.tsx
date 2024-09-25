import React, { useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { SearchContainer } from "../components/search/SearchContainer";
import { ProjectFeed } from "../components/project/ProjectFeed";

const HomePage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="main-container" ref={scrollRef}>
      <SearchContainer />

      <ProjectFeed />
    </div>
  );
};

export default HomePage;
