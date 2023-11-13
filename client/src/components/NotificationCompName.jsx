import "../css/NotificationResult.css";

const NotificationCompName = (props) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${props?.result.name}!`)}
    >
      {props?.result.name}
    </div>
  );
};
export default NotificationCompName;
