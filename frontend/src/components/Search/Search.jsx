import { useRef, useEffect } from "react";
import "./search.css";

const Search = ({ open, setOpen }) => {
  const search = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (search.current && !search.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);
  return (
    <div
      className={open ? "search" : "search hide"}
      ref={search}
    >
      <div className="searchContainer">
        <div className="recentSearchHeading">
          <span>Recent search</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
