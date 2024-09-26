import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useProject } from "../../context/ProjectContext";

export const SearchBar: React.FC = () => {
  const { searchQuery, handleEnter, handleKeyPress, handleSearch } =
    useProject();

  return (
    <div className="search-container" data-scroll-section>
      <Form>
        <Form.Control
          size="lg"
          type="text"
          value={ searchQuery }
          onChange={ handleKeyPress }
          onKeyPress={ () => handleEnter }
          placeholder="Search Projects..."
          className="search-bar"
        />
      </Form>
      <Button onClick={ () => handleSearch} className="search-button">
        Search
      </Button>
    </div>
  );
};
