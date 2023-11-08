import "../css/SearchResult.css";

export const SearchResult = (props) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${props.result}!`)}
    >
      {props.result}
    </div>
  );
};
