/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import "./index.css";

import AppRoutes from "./routes";
import { ThemeProvider } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <AppRoutes />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
