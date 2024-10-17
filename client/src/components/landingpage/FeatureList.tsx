import React from "react";
import { FeatureCard } from "./FeatureCard";
import { FeatureInfo } from "../../types/landingpage";

// Import SVG files as React components
import { ReactComponent as AiSearchImage } from "../../img/landingpage/AiSearch.svg";
import { ReactComponent as AiGenerate } from "../../img/landingpage/AiGenerate.svg";
import { ReactComponent as Conversation } from "../../img/landingpage/Conversation.svg";
import { ReactComponent as Technology } from "../../img/landingpage/Technology.svg";

export const FeatureList: React.FC = () => {
    const features: FeatureInfo[] = [
        {
            svg: AiSearchImage,
            feature: "Perform AI Semantic Searches",
            description: "Discover projects effortlessly with our semantically smart AI search.",
        },
        {
            svg: AiGenerate,
            feature: "Project Idea Generator",
            description: "Generate detailed creative project ideas based on your simple general input with EstiaAI's suggestions.",
        },
        {
            svg: Technology,
            feature: "Tech Stack Knowledge",
            description: "Explore detailed descriptions of hundreds of tech stacks to expand your knowledge.",
        },
        {
            svg: Conversation,
            feature: "The Community",
            description: "Engage with our large community by commenting and collaborating on projects.",
        },
    ];

    return (
        <div className="feature-list">
            {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
            ))}
        </div>
    );
};
