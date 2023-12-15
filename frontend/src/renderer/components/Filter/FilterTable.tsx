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
  useTheme,
} from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import { ReactNode } from 'react';
import styles from './styles.module.css';
import DataNotFound from '../DataNotFound';

interface $Props {
  tableHeaders: string[];
  children: ReactNode | ReactNode[];
  isEmptyContent?: boolean;
}

export default function FilterTable({
  isEmptyContent,
  tableHeaders,
  children,
}: $Props) {

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Box sx={{  width:'80%',padding:'10px', overflow: 'auto' }}>
      {!isEmptyContent ? (
        <TableContainer
          sx={{
            border: `1px solid ${theme.palette.primary.contrastText}`,
            borderRadius: '12px',
            width:'100%'
          }}
        >
          <Table aria-label="manage creators table">
            <TableHead
              sx={{
                background: isDarkTheme ? '#292929' : '#EAF1FF',
                color: '#fff',
              }}
            >
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            borderRadius: '12px',
            border: `1px solid ${theme.palette.primary.contrastText}`,
            marginTop: '16px',
          }}
        >
          <Stack
            gap="16px"
            direction="row"
            justifyContent="space-between"
            sx={{
              backgroundColor: isDarkTheme? '#292929':theme.palette.primary.contrastText,
            }}
            className={styles.campaign}
            paddingTop="30px"
            paddingBottom="12px"
            paddingX="16px"
          >
            {tableHeaders.map((tag) => (
              <Typography fontWeight={600} fontSize="16px">
                {tag}
              </Typography>
            ))}
          </Stack>
          <DataNotFound />
        </Box>
      )}
    </Box>
  );
}
