import React from "react";

const AlphabetFilter = ({
  letters,
  activeLetter,
  isLoading,
  onLetterClick,
}) => {
  return (
    <div className="alphabet__filter" id="alphabet__filter">
      {letters.map((letter) => (
        <button
          key={letter}
          data-letter={letter}
          type="button"
          className={`${letter === activeLetter ? "active" : ""} ${
            isLoading ? "disabled" : ""
          }`}
          onClick={() => !isLoading && onLetterClick(letter)}
          disabled={isLoading}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetFilter;
