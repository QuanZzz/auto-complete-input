import { useEffect, useState } from "react";
import { userNames } from "@/utils/userNames";

export const AutoCompleteInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      const filteredData = userNames.filter((userName) =>
        userName.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredData);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  return (
    <div className="relative">
      <div className="mt-2 text-left">
        <input
          name="query"
          type="text"
          placeholder="Search for a username"
          className="input border border-gray-300 text-base text-gray-900 focus:outline-none focus:border-blue h-38 w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      {!!suggestions?.length && (
        <div className="absolute bg-white top-10 left-0 right-0 border border-gray-400 rounded-md py-4 px-4 text-left mx-2 z-10">
          {suggestions.map((suggestion, index) => (
            <div role="button" tabIndex={0} key={index}>
              <p className="cursor-pointer text-gray-400 my-3 text-base">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
