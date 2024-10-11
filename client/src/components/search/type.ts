/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SearchBarProps {
    searchQuery: string;
    handleInputChange: (...params: any[]) => void; // Accepts any number of parameters
    handleEnter: (...params: any[]) => void; // Accepts any number of parameters
    handleKeyPress: (...params: any[]) => void; // Accepts any number of parameters
}
