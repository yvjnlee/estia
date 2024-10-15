import React from "react";
import { FeatureInfo } from "../../types/landingpage";

interface FeatureCardProps {
    feature: FeatureInfo;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    const { svg: SvgIcon, feature: featureHeading, description: featureDescription } = feature; // Use SvgIcon as a React component

    const containerStyle: React.CSSProperties = {
        backgroundColor: "",
        border: "1px solid #383838",
        height: "25rem",
        width: "25rem",
        borderRadius: "4px",
        padding: "6rem 2rem",
        display: "flex",
        marginTop: "2rem",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        transition: "transform 0.3s ease, filter 0.3s ease",
    };

    return (
        <div className="feature-container" style={containerStyle}>

            <div className="svg-container">
                <SvgIcon height="200px" width="200px" /> {/* Render the SVG as a component */}
            </div>
            <h2 className="feature-text">{featureHeading}</h2>
            <p className="feature-description">{featureDescription}</p>
        </div>
    );
};
