// PreferenceLinks.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export const PreferenceLinks = () => {
    return (
        <div className='navigation-links'>
            <NavLink
                to="/preference/give-project"
                className={({ isActive }) => (isActive ? "active-nav-link" : "nav-link")}
            >
                A project within your collection
            </NavLink>
            <NavLink
                to="/preference/project-idea"
                className={({ isActive }) => (isActive ? "active-nav-link" : "nav-link")}
            >
                A fresh new project idea
            </NavLink>
            <NavLink
                to="/preference"
                className={({ isActive }) => (isActive ? "active-nav-link" : "nav-link")}
                end
            >
                Languages/frameworks to learn
            </NavLink>
        </div>
    );
};

