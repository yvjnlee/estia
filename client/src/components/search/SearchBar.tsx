import React from "react";
import Form from "react-bootstrap/Form";
import { SearchBarProps } from "./type";

export const SearchBar: React.FC<SearchBarProps> = ({
    searchQuery,
    handleKeyPress,
    handleEnter,
    handleInputChange,
}) => {
    return (
        <div className="search-container" data-scroll-section>
            <Form>
                <Form.Control
                    size="lg"
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleEnter();
                        } else {
                            handleKeyPress(e);
                        }
                    }}
                    placeholder="Search for projects, languages, themes..."
                    className="search-bar"
                />
            </Form>
        </div>
    );
};
