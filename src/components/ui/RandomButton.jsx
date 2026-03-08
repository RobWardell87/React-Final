import React from "react";

const RandomButton = ({ onClick, isLoading }) => {
  return (
    <div className="random__button--container">
      <button
        id="random__button"
        className="random__button"
        type="button"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Get Random Recipe"}
      </button>
    </div>
  );
};

export default RandomButton;
