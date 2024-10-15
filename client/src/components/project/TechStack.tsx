import React, { useState } from "react";
import TechStackModal from "./TechStackModal";

import cSharp from "../../img/programminglogos/c#.svg";
import css from "../../img/programminglogos/css.svg";
import cPlusPlus from "../../img/programminglogos/c++.svg";
import c from "../../img/programminglogos/c.svg";
import html from "../../img/programminglogos/html.svg";
import htmlcss from "../../img/programminglogos/htmlcss.svg";
import dart from "../../img/programminglogos/dart.svg";
import go from "../../img/programminglogos/go.svg";
import haskell from "../../img/programminglogos/haskell.svg";
import java from "../../img/programminglogos/java.svg";
import javascript from "../../img/programminglogos/javascript.svg";
import kotlin from "../../img/programminglogos/kotlin.svg";
import php from "../../img/programminglogos/php.png"; // Note: Different format (png)
import python from "../../img/programminglogos/python.svg";
import ruby from "../../img/programminglogos/ruby.svg";
import typescript from "../../img/programminglogos/typescript.svg";

import android from "../../img/frameworkslogos/android.svg";
import angular from "../../img/frameworkslogos/angular.svg";
import bootstrap from "../../img/frameworkslogos/boostrap.svg"; // Note: Correct spelling
import codeIgniter from "../../img/frameworkslogos/codeigniter.svg";
import deno from "../../img/frameworkslogos/deno.svg";
import django from "../../img/frameworkslogos/django.svg";
import expressjs from "../../img/frameworkslogos/expressjs.svg";
import flask from "../../img/frameworkslogos/flask.svg";
import graphql from "../../img/frameworkslogos/graphql.svg";
import jquery from "../../img/frameworkslogos/jquery.svg";
import laravel from "../../img/frameworkslogos/laravel.svg";
import materialize from "../../img/frameworkslogos/materialize.svg";
import mern from "../../img/frameworkslogos/mern.png";
import nextjs from "../../img/frameworkslogos/nextjs.svg";
import nodejs from "../../img/frameworkslogos/nodejs.svg"; // Note: Correct spelling
import pandas from "../../img/frameworkslogos/pandas.svg";
import rails from "../../img/frameworkslogos/rails.svg";
import react from "../../img/frameworkslogos/react.svg";
import reactnative from "../../img/frameworkslogos/reactnative.svg";
import redux from "../../img/frameworkslogos/redux.svg";
import spring from "../../img/frameworkslogos/spring.svg";
import scss from "../../img/frameworkslogos/scss.png"
import tailwindcss from "../../img/frameworkslogos/tailwindcss.svg";
import tensorflow from "../../img/frameworkslogos/tensorflow.svg";

import vuejs from "../../img/frameworkslogos/vuejs.svg";

import cassandra from "../../img/databaselogos/cassandra.svg";
import mongodb from "../../img/databaselogos/mongodb.svg";
import mysql from "../../img/databaselogos/mysql.svg";
import oracle from "../../img/databaselogos/oracle.svg";
import postgresql from "../../img/databaselogos/postgresql.svg";
import redis from "../../img/databaselogos/redis.svg";

// Mapping tech names to their corresponding images
const techImages: { [key: string]: string } = {
    // Programming languages
    css,
    cSharp,
    cPlusPlus,
    c,
    dart,
    go,
    haskell,
    html,
    htmlcss,
    java,
    javascript,
    kotlin,
    php,
    python,
    ruby,
    typescript,
    // Frameworks
    android,
    angular,
    bootstrap,
    codeIgniter,
    deno,
    django,
    expressjs,
    flask,
    graphql,
    jquery,
    laravel,
    materialize,
    mern,
    nextjs,
    nodejs,
    pandas,
    rails,
    react,
    reactnative,
    redux,
    scss,
    spring,
    tailwindcss,
    tensorflow,
    vuejs,
    // Databases
    cassandra,
    mongodb,
    mysql,
    oracle,
    postgresql,
    redis,
};

const TechStack: React.FC<{ tech1: string; tech2: string }> = ({ tech1, tech2 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTech, setSelectedTech] = useState<string>("");

    const handleTechClick = (tech: string) => {
        setSelectedTech(tech);
        setIsModalOpen(true);
    };

    const translateTechName = (tech: string): string => {
        const translations: { [key: string]: string } = {
            "C++": "cPlusPlus",
            "C#": "Csharp",
            "HTML/CSS": "htmlcss",
            "React Native": "reactnative",
        };
        return translations[tech] || tech.toLowerCase();
    };

    const getTechImage = (tech: string): string | undefined => {
        const translatedTech = translateTechName(tech);
        return techImages[translatedTech] || undefined; // Return the corresponding image or undefined if not found
    };

    return (
        <div className="sidebar-container">
            <h1>Tech Stack</h1>
            <p className="tech-stack-subtitle">Select one for additional generated info</p>
            <div className="tech-images-div-container">
                <div className="tech-images-div" onClick={() => handleTechClick(tech1)}>
                    <img src={getTechImage(tech1)} alt={tech1} className="tech-image" />
                    <p className="tech-stack-details">{tech1}</p>
                </div>
                <div className="tech-images-div" onClick={() => handleTechClick(tech2)}>
                    <img src={getTechImage(tech2)} alt={tech2} className="tech-image" />
                    <p className="tech-stack-details">{tech2}</p>
                </div>
            </div>
            {isModalOpen && (
                <TechStackModal tech={selectedTech} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default TechStack;
