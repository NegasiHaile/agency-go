import {
  Box,
  Button,
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

const rows = [
  {
    name: 'Joan Adams',
    imageSrc: '',
    userTag: '@u258408953',
    requestDate: 'September 7, 2023',
    status: {
      title: 'Accepted',
      color: theme.palette.success.main,
    },
    operation: 'View Profile',
  },
  {
    name: 'Chris Jean-Baptiste',
    imageSrc: '',
    userTag: '@u258408953',
    requestDate: 'September 7, 2023',
    status: {
      title: 'Sent',
      color: theme.palette.secondary.contrastText,
    },
    operation: 'Cancel',
  },
  {
    name: 'Joan Adams',
    imageSrc: '',
    userTag: '@u258408953',
    requestDate: 'September 7, 2023',
    status: {
      title: 'Declined',
      color: theme.palette.error.main,
    },
    operation: 'View Profile',
  },
];

export default function SentRequests() {
  return (
    <Box>
      <TableContainer
        sx={{
          borderRadius: '16px',
          border: `1px solid ${theme.palette.primary.contrastText}`,
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
              <TableCell sx={{ color: '#fff' }}>Creators</TableCell>
              <TableCell sx={{ color: '#fff' }}>Request Date</TableCell>
              <TableCell sx={{ color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff' }}>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ name, userTag, requestDate, status, operation }) => (
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
                    <Stack gap={0}>
                      <Typography fontSize="16px" color="#fff">
                        {name}
                      </Typography>
                      <Typography fontSize="12px" color="#fff">
                        {userTag}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: theme.palette.primary.contrastText,
                    color: '#fff',
                  }}
                  align="left"
                >
                  {requestDate}
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: theme.palette.primary.contrastText,
                    color: '#fff',
                  }}
                >
                  <Typography
                    fontSize="12px"
                    fontWeight={400}
                    padding="5px"
                    borderRadius="16px"
                    width="min-content"
                    color={status.color}
                    sx={{ border: `1px solid ${status.color}` }}
                  >
                    {status.title}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: theme.palette.primary.contrastText,
                  }}
                >
                  <Button
                    sx={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: theme.palette.info.main,
                      textTransform: 'unset !important',
                    }}
                  >
                    {operation}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
