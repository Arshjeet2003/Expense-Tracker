import "../css/NotificationResult.css";

const NotificationCompName = (props) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`Payment Due for ${props?.result.name}!`)}
    >
      Payment Due for {props?.result.name}
    </div>
  );
};
export default NotificationCompName;
