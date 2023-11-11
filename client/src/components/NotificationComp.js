import "../css/NotificationComponent.css";
import NotificationCompName from './NotificationCompName';
import React from 'react'
import "../css/notificationComp.css";

const NotificationComp = (props) => {
  return (
    <div className="results-list-noti">
      {props?.transaction?.map((result, id) => {
        return <NotificationCompName result={result} key={id} />;
      })}
    </div>
  )
}

export default NotificationComp
