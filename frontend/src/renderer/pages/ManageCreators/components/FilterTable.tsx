import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import Avatar from 'renderer/assets/svg/AvatarSvg';
import Activated from 'renderer/assets/svg/ActivatedSvg';
import DeactivatedSvg from 'renderer/assets/svg/DeactivatedSvg';
import OnlyFansSvg from 'renderer/assets/svg/OnlyFansSvg';

const rows = [
  {
    name: 'Joan Adams',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: true,
  },
  {
    name: 'Chris Jean-Baptiste',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: true,
  },
  {
    name: 'Joan Adams',
    imageSrc: '',
    gender: 'Female',
    internalNotes: '-',
    platform: {
      name: 'OnlyFans',
      icon: <OnlyFansSvg />,
      linked: true,
    },
    employees: 'Chrissie',
    proxy: {
      name: 'OnlyManager Proxy',
      ipAddress: '107.175.227.145',
    },
    activated: false,
  },
];

export default function FilterTable() {
  return (
    <Box>
      <TableContainer
        sx={{
          border: `1px solid ${theme.palette.primary.contrastText}`,
          borderRadius: '12px',
          marginTop: '16px',
        }}
      >
        <Table aria-label="manage creators table">
          <TableHead
            sx={{
              background: theme.palette.primary.contrastText,
              color: '#fff',
            }}
          >
            <TableRow>
              <TableCell >Creators</TableCell>
              <TableCell  align="right">
                Gender
              </TableCell>
              <TableCell  align="right">
                Internal Notes
              </TableCell>
              <TableCell >Platform</TableCell>
              <TableCell  align="right">
                Employees
              </TableCell>
              <TableCell >Proxy</TableCell>
              <TableCell >Status</TableCell>
              <TableCell >Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(
              ({
                name,
                gender,
                internalNotes,
                platform,
                employees,
                proxy,
                activated,
              }) => (
                <TableRow
                  key={name}
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
                    <Stack spacing={4} direction="row" alignItems="center">
                      <Avatar />
                      <Typography variant="h6" fontSize="18px" color="#fff">
                        {name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                      color: '#fff',
                    }}
                    align="right"
                  >
                    {gender}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                      color: '#fff',
                    }}
                  >
                    {internalNotes}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                  >
                    <Stack
                      alignItems="center"
                      flexDirection="row"
                      spacing={2}
                      color="#fff"
                    >
                      {platform.icon}
                      {platform.name}
                    </Stack>
                    <Typography component="small" color="#fff" fontSize="11px">
                      {platform.linked ? 'Linked' : 'Not Linked'}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                      color: '#fff',
                    }}
                  >
                    {employees}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                  >
                    <Typography color="#fff" fontSize="14px">
                      {proxy.name}
                    </Typography>
                    <Typography color="#fff" fontSize="11px">
                      {proxy.ipAddress}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                  >
                    {activated ? <Activated /> : <DeactivatedSvg />}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: theme.palette.primary.contrastText,
                    }}
                    align="right"
                  >
                    <Stack spacing={4} direction="row" alignItems="center">
                      <Typography variant="body1" color="#fff">
                        Edit
                      </Typography>
                      <Typography variant="body1" color="#fff">
                        More
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
