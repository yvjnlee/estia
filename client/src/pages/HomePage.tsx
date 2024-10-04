import React, { useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { ProjectFeed } from "../components/project/ProjectFeed";
import { ProjectSearch } from "../components/search/projects/ProjectSearch";

const HomePage: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="main-container" ref={scrollRef}>
            <ProjectSearch />

            <ProjectFeed />
        </div>
    );
};

export default HomePage;
