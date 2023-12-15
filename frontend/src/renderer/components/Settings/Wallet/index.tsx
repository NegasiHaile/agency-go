import React, { useState } from 'react';
import { TableCell, TableRow, Typography, Button, Stack, useTheme } from '@mui/material';

import FilterTable from 'renderer/components/Filter/FilterTable';
import theme from 'renderer/styles/muiTheme';
import EyeViewSvg from 'renderer/assets/svg/EyeViewSvg';
import DownloadSvg from 'renderer/assets/svg/DownloadIconSvg';
import classes from './styles.module.css';
import WithdrawalTable from './Common/WithdrawalTable';
import { getCode, transactionData, transactionTableHeaders } from './constant';
import WithdrawalRequest from './WithdrawalRequests';
import PaymentMethod from './PaymentMethod';

interface TabProps {
  handleTabChange: (name: string) => void;
}

function WalletTab(props: TabProps) {
  const { handleTabChange } = props;

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  
  return (
    <div className={classes.billing}>
      <div className={classes.billingHeader}>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isDarkTheme ? '#121212' : '#EAF1FF',
            }}
            onClick={() => handleTabChange('withdrawalRequest')}
          >
            <Typography
              fontWeight={500}
              fontSize="14px"
              sx={{ color: isDarkTheme ? '#fff' : '#000' }}
            >
              Withdraw Requests
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => handleTabChange('paymentMethod')}
          >
            <Typography fontWeight={500} fontSize="14px" sx={{ color: '#fff' }}>
              Payment Method
            </Typography>
          </Button>
        </div>
      </div>

      <div className={classes.balanceWrapper}>
        <div className={classes.balanceText}>$0.00</div>
      </div>
      <div className={classes.billingTableWrapper}>
        <div className={classes.headingText}>Transaction History</div>
        <FilterTable tableHeaders={transactionTableHeaders}>
          <>
            {transactionData.map(
              ({ category, amount, type, status, date }, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                    scope="row"
                  >
                    <Typography variant="h6" fontSize="18px">
                      {category}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                  >
                    {amount}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                  >
                    {type}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                      color: getCode(status),
                    }}
                  >
                    {status}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                  >
                    {date}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                  >
                    <Stack spacing={4} direction="row" alignItems="center">
                      <EyeViewSvg />

                      <DownloadSvg  />
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            )}
          </>
        </FilterTable>
      </div>
      <div className={classes.withdrawalTableWrapper}>
        <div className={classes.headingText}>Withdrawal Requests</div>
        <WithdrawalTable />
      </div>
    </div>
  );
}
function Wallet() {
  const [activeTab, setActiveTab] = useState('wallet');

  const renderTab = (
    tabName: string,
    handleTabChange: (name: string) => void
  ) => {
    switch (tabName) {
      case 'wallet':
        return <WalletTab handleTabChange={handleTabChange} />;
      case 'withdrawalRequest':
        return <WithdrawalRequest handleTabChange={handleTabChange} />;
      case 'paymentMethod':
        return <PaymentMethod handleTabChange={handleTabChange} />;
      default:
        return <h5>Not found</h5>;
    }
  };

  const handleTabChange = (name: string) => {
    setActiveTab(name);
  };

  return <>{renderTab(activeTab, handleTabChange)}</>;
}

export default Wallet;
