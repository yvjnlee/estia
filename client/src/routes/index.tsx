// src/routes/AppRoutes.tsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProjectsRoutes from "./ProjectRoutes";

import ScrollToTop from "../actions/ScrollToTop";

import AddProjectPage from "../pages/AddProjectPage";
import ProfileRoutes from "./ProfileRoutes";

import PreferencePage from "../pages/PreferencePage";
import GiveProject from "../components/search/ai/GiveProjectPage";
import ProjectGenerator from "../components/search/ai/ProjectGenerator"
import { Layout } from "../components/layout/Layout";
import { LoginPage } from "../pages/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import { setUserLoaded } from "../store/slices/userSlice";
import { supabase } from "../common/clients";
import { getSession } from "../api/authAPI";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Session } from "@supabase/supabase-js";

const AppRoutes = () => {
    const [session, setSession] = useState<Session | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Set the initial session
        getSession().then((session) => {
            if (session) {
                setSession(session);
            }
        });

        // Set up the auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Cleanup the subscription when the component unmounts
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const accountSync = async () => {
        dispatch(setUserLoaded(false));

        if (session) {
            const { data, error } = await supabase.auth.getUser();
            const user = data.user;

            if (error) {
                console.error(error);
            } else {
                if (user) {
                    console.log("Account sync triggered");
                    await supabase.from('profiles')
                        .update({ email: user.email, username: user.email })
                        .eq('id', user.id);
                    console.log("Account sync completed");
                }
            }
        }

        dispatch(setUserLoaded(true));
    };

    useEffect(() => {
        accountSync();
    }, [session]);

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/add-project/*" element={<AddProjectPage />} />
                    <Route path="/preference/" element={<PreferencePage />} />
                    <Route path="/preference/give-project" element={<GiveProject />} />
                    <Route path="/preference/project-idea" element={<ProjectGenerator />} />

                    <Route path="/project/*" element={<ProjectsRoutes />} />
                    <Route path="/profile/*" element={<ProfileRoutes />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
