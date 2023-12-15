import React from 'react';
import classes from './styles.module.css';

function NotificationCard() {
  return (
    <div className={classes.notificationWrapper}>
      <div className={classes.subHeadingWrapper}>
        <div>OnlyManage Providers</div>
        <div className={classes.subHeadingDateText}>Today, 05:00 am</div>
      </div>
      <div className={classes.headingWrapper}>
        <div className={classes.headingText}>
          New version available with brand new updates. v5.0.2
        </div>
      </div>
    </div>
  );
}
export default NotificationCard;
