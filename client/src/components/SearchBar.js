import { useState, useEffect, useContext } from "react";
import authContext from "../context/auth/authContext";
import { FaSearch } from "react-icons/fa";

import "../css/SearchBar.css";
import { SearchResultsList } from "./SearchResultsList";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const context = useContext(authContext);
  const { getUsers } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUsers(input);
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData(); // Call the async function to fetch data
  }, [input]);

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          className="sbar"
          placeholder="Search User..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {data ? <SearchResultsList data={data} /> : ""}
    </>
  );
};
