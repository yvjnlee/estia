/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SearchBarProps {
  searchQuery: string;
  handleEnter: (...params: any[]) => void; // Accepts any number of parameters
  handleKeyPress: (...params: any[]) => void; // Accepts any number of parameters
  handleSearch: (...params: any[]) => void; // Accepts any number of parameters
}
