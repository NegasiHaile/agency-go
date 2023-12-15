import FilterTable from 'renderer/components/Filter/FilterTable';
import { Button, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import ChevronSettingNav from 'renderer/assets/svg/ChevronSettingNav';
import classes from './styles.module.css';

interface TabProps {
  handleTabChange: (name: string) => void;
}

function SubscriptionBilling(props: TabProps) {
  const { handleTabChange } = props;
  const billingTableHeaders = ['Gross Monthly Earnings', 'Subscription Fee'];

  const billingData = [
    {
      GrossMonthlyEarnings: 'Under $1000',
      SubscriptionFee: '$40',
    },
    {
      GrossMonthlyEarnings: '$1000 - $2000',
      SubscriptionFee: '$40',
    },
  ];

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <div className={classes.wrapper}>
      <div className={classes.prefernceWrapper}>
        <div className={classes.inputListWrapper}>
          <div className={classes.billingheader}>
            <Button onClick={() => handleTabChange('Billing')}>
              <Typography fontWeight={500} fontSize="14px">
                Billing
              </Typography>
            </Button>
            <div className={classes.iconalign}>
              <ChevronSettingNav />
            </div>
            <p>Subscription</p>
          </div>
          <div className={classes.monthlysubscription}>
            <h2>Monthly subscription Price per creator</h2>
            <Typography sx={{ marginTop: '-5px' }}>
              Each creator&apos Subscription will vary based on thier total
              gross earnings at the end of calender month
            </Typography>
          </div>
          <div>
            <h3 className={classes.labellist}>Estimated Monthly Earnings </h3>
            <div className={classes.select_box}>
              <select
                className={classes.optionlist}
                style={{
                  backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
                  color: isDarkTheme ? '#fff' : '#121212',
                }}
              >
                <option>$2000 - $5000</option>
                <option>Test This Select</option>
              </select>
            </div>
            <div
              className={classes.card}
              style={{
                backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
                color: isDarkTheme ? '#fff' : '#121212',
              }}
            >
              <div className={classes.monthlysubscriptioncard}>
                <h1 className={classes.paidplancard}>$60</h1>
                <p className={classes.permonth}>Per Month</p>
              </div>

              <div className={classes.service}>
                <h2>Service Offerings</h2>
                <div className={classes.servicecard}>
                  <div className={classes.servicetype}>
                    <Typography>- Multi Creator profile</Typography>
                    <Typography>- Analytics & Reports</Typography>
                    <Typography>- Anti-Follow</Typography>
                  </div>

                  <div>
                    <Typography>- Scheduling System</Typography>
                    <Typography>- Permission Control</Typography>
                    <Typography>- Smart Tags</Typography>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>Creator SubsCription Fee</h2>
              <p className={classes.vipcharge}>
                *Free and VIP profiles are charged separately
              </p>
            </div>
            <div className={classes.billingTableWrapper}>
              <FilterTable tableHeaders={billingTableHeaders}>
                <>
                  {billingData.map(
                    ({ GrossMonthlyEarnings, SubscriptionFee }, index) => (
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
                            {GrossMonthlyEarnings}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderColor: theme.palette.primary.contrastText,
                          }}
                        >
                          {SubscriptionFee}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </>
              </FilterTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionBilling;
