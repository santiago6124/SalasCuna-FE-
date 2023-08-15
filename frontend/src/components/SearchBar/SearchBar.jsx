import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const SearchBar = ({ keyword, placeholder, onChange }) => {

    return (
        <div className="search">
          <div className="searchInputs">
            <input key="search-bar" placeholder={placeholder} 
                value={keyword} onChange={(e) => onChange(e.target.value)}
            />
            <div className="searchIcon">
              {keyword.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn"/>
              )}
            </div>
          </div>
        </div>
    );
}

export default SearchBar;