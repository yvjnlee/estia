import React, { useEffect } from "react";
import { supabase } from "../common/clients";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";

import topLeftShape from "../img/toprightshape.png";
import bottomLeftShape from "../img/bottomleftshape.png"

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                navigate('/');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    const customTheme = {
        default: {
            colors: {
                brand: 'hsl(153 60.0% 53.0%)',
                brandAccent: 'hsl(154 54.8% 45.1%)',
                brandButtonText: 'white',
                inputText: 'white',
                inputPlaceholder: 'darkgray',
                inputBackground: 'hsl(0 0% 20%)',
                inputBorder: 'hsl(0 0% 30%)',
            },
            space: {
                inputPadding: '12px 16px',
                labelBottomMargin: '10px',
            },
            fontSizes: {
                baseInputSize: '16px',
                labelFontSize: '16px',
            },
            borderWidths: {
                inputBorderWidth: '2px',
            },
            radii: {
                buttonBorderRadius: '9999px',
                inputBorderRadius: '8px',
            },
        },
    }

    return (
        <>
        <img src={topLeftShape} className="top-right-shape"/>
        <div className="login-page">
            <div className="login-container">
                <div className="registration-container">
                    <h1 className="login-title">Welcome to Estia</h1>
                    <Auth 
                        supabaseClient={supabase}
                        appearance={{ 
                            theme: customTheme,
                            className: {
                                container: "custom-container",
                                button: "custom-button",
                                input: "custom-input",
                                anchor: "custom-anchor",
                                label: "custom-label",
                                message: "custom_message",
                            },
                        }}
                        providers={["google", "github"]}
                        theme="dark"
                    />
                </div>
            </div>
        </div>
                 <img src={bottomLeftShape} className="bottom-left-shape"/>
          </>
    );
};
