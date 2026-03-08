import React from "react";

const SortButton = ({ onClick, isLoading }) => {
  return (
    <div className="footer__sort">
      <button
        id="sort__button"
        className="sort__button"
        type="button"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? "Sorting..." : "Sort Results A–Z"}
      </button>
    </div>
  );
};

export default SortButton;
