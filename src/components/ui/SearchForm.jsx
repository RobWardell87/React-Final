import React from "react";

const SearchForm = ({ searchTerm, onSearchTermChange, onSubmit, isLoading }) => {
  return (
    <form
      id="search__form"
      className="search__box"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <input
        type="text"
        id="search__input"
        className="search__input"
        placeholder="Search by ingredient"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        autoComplete="off"
        disabled={isLoading}
      />
      <button type="submit" id="search__button" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchForm;
