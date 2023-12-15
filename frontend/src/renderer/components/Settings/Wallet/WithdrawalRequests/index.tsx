import React from 'react';
import classes from './styles.module.css';

import WithdrawalTable from '../Common/WithdrawalTable';

interface TabProps {
  handleTabChange: (name: string) => void;
}

function WithdrawalRequest(props: TabProps) {
  const { handleTabChange } = props;
  return (
    <div className={classes.withdrawalWrapper}>
      <div className={classes.navWrapper}>
        <div
          className={classes.homeText}
          onClick={() => handleTabChange('wallet')}
        >
          Wallet
        </div>
        <div>Withdrawal Requests </div>
      </div>

      <div className={classes.withdrawalTableWrapper}>
        <div className={classes.headingText}>Withdrawal Requests</div>
        <WithdrawalTable />
      </div>
    </div>
  );
}

export default WithdrawalRequest;
