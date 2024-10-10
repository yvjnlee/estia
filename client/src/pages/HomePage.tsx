import React, { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { ProjectFeed } from "../components/project/ProjectFeed";
import { ProjectSearch } from "../components/search/projects/ProjectSearch";

import RadialPattern from "../img/RadialPattern.svg";

const HomePage: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="main-container" ref={scrollRef}>
            <ProjectSearch />
            <img className="homepage-radial-pattern" src={RadialPattern} />
            <ProjectFeed />
        </div>
    );
};

export default HomePage;
