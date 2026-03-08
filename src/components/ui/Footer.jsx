// src/components/ui/Footer.jsx
import React from "react";
import SortButton from "./SortButton.jsx";
import AlphabetFilter from "./AlphabetFilter.jsx";

const Footer = ({
  personalLogo,
  letters,
  activeLetter,
  isLoading,
  onSort,
  onLetterClick,
}) => {
  return (
    <footer className="site__footer">
      <div className="footer__content">
        <img className="personal__logo" src={personalLogo} alt="" />

        <div className="footer__main">
          <SortButton onClick={onSort} isLoading={isLoading} />

          <AlphabetFilter
            letters={letters}
            activeLetter={activeLetter}
            isLoading={isLoading}
            onLetterClick={onLetterClick}
          />

          <p>Recipe Finder © 2026</p>
          <p>Built with HTML, CSS &amp; JavaScript By Rob Wardell</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
