import { useRef, useEffect, useState } from "react";
import { userNames } from "@/utils/userNames";
import cx from "classnames";

export const AutoCompleteInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const suggestionRefs = useRef([]);

  useEffect(() => {
    if (!inputValue || !showSuggestions) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, "");
      const filteredData = userNames.filter((userName) =>
        userName.toLowerCase().includes(sanitizedValue.toLowerCase())
      );
      setSuggestions(filteredData);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, showSuggestions]);

  useEffect(() => {
    if (highlightedIndex > -1 && highlightedIndex < suggestions.length) {
      suggestionRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex, suggestions.length]);

  const handleSuggestonClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter" && highlightedIndex > -1) {
      setInputValue(suggestions[highlightedIndex]);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="mt-2 text-left">
        <input
          name="query"
          type="text"
          placeholder="Search for a username"
          className="input border border-gray-300 text-base text-gray-900 focus:outline-none focus:border-blue h-38 w-full"
          value={inputValue}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {!!suggestions?.length && showSuggestions && (
        <div className="absolute bg-white top-10 left-0 right-0 border border-gray-400 rounded-md py-4 px-4 text-left mx-2 z-10">
          {suggestions.map((suggestion, index) => (
            <div
              role="button"
              tabIndex={0}
              key={index}
              ref={(el) => (suggestionRefs.current[index] = el)}
              onClick={() => handleSuggestonClick(suggestion)}
            >
              <p
                className={cx("cursor-pointer text-gray-400 my-3 text-base", {
                  "bg-blue-200": index === highlightedIndex,
                })}
              >
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
