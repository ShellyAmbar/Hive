import {useState} from "react";

const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return {
    searchTerm,
    setSearchTerm,
  };
};

export default useSearchBar;
