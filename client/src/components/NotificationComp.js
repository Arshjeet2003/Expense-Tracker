import "../css/NotificationComponent.css";
import NotificationCompName from './NotificationCompName';
import React from 'react'

const NotificationComp = (props) => {
  return (
    <div className="results-list">
      {props?.transaction?.map((result, id) => {
        return <NotificationCompName result={result} key={id} />;
      })}
    </div>
  )
}

export default NotificationComp
