import React from 'react';

// Dynamically load all images from the folder
const imagesContext = (require as any).context('../../img/programminglogos', false, /\.svg$/);

// Create an object that maps tech names to the corresponding image paths
const imagesMap: { [key: string]: string } = {};

// Iterate through the imported files and populate the imagesMap
imagesContext.keys().forEach((file: string) => {
    const techName = file.replace('./', '').replace('.svg', '').toLowerCase(); // Get the tech name from the file
    imagesMap[techName] = imagesContext(file).default; // Map the tech name to the image
});

// Function to get the correct image based on tech name
const getTechImage = (tech: string) => {
    const techKey = tech.toLowerCase(); // Convert tech name to lowercase for comparison
    return imagesMap[techKey]; // Return the image from the map, or undefined if not found
};

// The TechStack component
const TechStack: React.FC<any> = ({ tech1, tech2 }) => {
    return (
        <div className="sidebar-container">
            <h1>Tech Stack</h1>
            <div className='tech-images-div'>
                <img src={getTechImage(tech1)} alt={tech1} className='tech-image' />
                <p className='tech-stack-details'>{tech1}</p>
                <img src={getTechImage(tech2)} alt={tech2} className='tech-image' />
                <p className='tech-stack-details'>{tech2}</p>
            </div>
        </div>
    );
};

export default TechStack;
