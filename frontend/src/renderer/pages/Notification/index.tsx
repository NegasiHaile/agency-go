import Dashboard from 'renderer/components/Dashboard';
import PageTopbar from 'renderer/components/PageTopbar';

import NotificationCard from 'renderer/components/NotificationCard';
import styles from './styles.module.css';
import localisation from '../../components/localisation.json';

export default function Notification() {
  return (
    <Dashboard>
      <section className={styles.wrapper}>
        <PageTopbar>
          <PageTopbar.HeaderText>
            {localisation.notification}
          </PageTopbar.HeaderText>
        </PageTopbar>
        <div>
          {new Array(3).fill(undefined).map((index) => {
            return <NotificationCard key={index} />;
          })}
        </div>
      </section>
    </Dashboard>
  );
}
