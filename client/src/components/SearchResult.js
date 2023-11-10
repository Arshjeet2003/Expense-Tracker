import "../css/SearchResult.css";

export const SearchResult = (props) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${props.result}!`)}
    >
      {props.result}
      <button className="add-user-button">
        <i class="material-symbols-outlined add-user">person_add</i>
      </button>
    </div>
  );
};
