import "../css/SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = (props) => {
  const ids = [];
  if (props && props.data && Array.isArray(props.data)) {
    for (const item of props.data) {
      if (item._id) {
        ids.push(item._id);
      }
    }
  }

  return (
    <div className="results-list">
      {ids.map((result, id) => {
        return <SearchResult result={result} key={id}/>;
      })}
    </div>
  );
};