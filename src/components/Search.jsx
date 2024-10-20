
import React, { useState } from "react";

export default function Search({ onSearch }) {
  const [cityName, setCityName] = useState("");

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cityName) {
      onSearch(cityName);
      setCityName("");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4 w-full">
        {" "}
        <div className="flex justify-start">
          {" "}
          <input
            type="text"
            value={cityName}
            onChange={handleChange}
            placeholder="Type City Name"
            className="border border-gray-300 rounded-md p-2 w-1/2"
          />
          <button type="submit" className="hidden">
            submit
          </button>
        </div>
      </form>
    </>
  );
}
