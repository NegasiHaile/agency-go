import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import DownloadSvg from 'renderer/assets/svg/DownloadIconSvg';
import EyeViewSvg from 'renderer/assets/svg/EyeViewSvg';
import theme from 'renderer/styles/muiTheme';
import FilterTable from 'renderer/components/Filter/FilterTable';
import { getCode, withdrawalData, withdrawalTableHeaders } from '../constant';

function WithdrawalTable() {
  return (
    <FilterTable tableHeaders={withdrawalTableHeaders}>
      <>
        {withdrawalData.map(({ initiator, medium, status, date }) => (
          <TableRow
            key={date}
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
              <Typography variant="h6" fontSize="18px" >
                {initiator}
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                borderColor: theme.palette.primary.contrastText,
               
              }}
            >
              {medium}
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
              <Stack spacing={4} direction="row" alignItems="center">
                <EyeViewSvg />
                <DownloadSvg />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </>
    </FilterTable>
  );
}

export default WithdrawalTable;
