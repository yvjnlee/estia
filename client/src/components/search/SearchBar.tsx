import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SearchBarProps } from "./type";

export const SearchBar: React.FC<SearchBarProps> = ({
    searchQuery,
    handleEnter,
    handleKeyPress,
    handleSearch,
}) => {
    return (
        <div className="search-container" data-scroll-section>
            <Form>
                <Form.Control
                    size="lg"
                    type="text"
                    value={searchQuery}
                    onChange={handleKeyPress}
                    onKeyPress={() => handleEnter}
                    placeholder="Search..."
                    className="search-bar"
                />
            </Form>
            <Button onClick={() => handleSearch} className="search-button">
                Search
            </Button>
        </div>
    );
};
