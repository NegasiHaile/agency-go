import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #292929`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '0px',
  margin: '0px',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function TableAccordion({ children }: any) {
  const [expanded, setExpanded] = React.useState<string | false>("1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      {
        ["1","2","3","4","5"].map((d)=>(
      <Accordion
        expanded={expanded === d}
        onChange={handleChange(d)}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={{ background: '#121212', color: '#fff' }}
        >
          <AccordionHeaderData d={d} />
        </AccordionSummary>
        <AccordionDetails sx={{ background: '#292929', color: '#fff' }}>
          {children}
        </AccordionDetails>
      </Accordion>
        ))
      }
    </div>
  );
}

const AccordionHeaderData = ({d}:any) => {
  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead
            sx={{
              bgcolor: '#121212',
              '&..css-4didej-MuiButtonBase-root-MuiAccordionSummary-root': {
                padding: '0px',
                border: 'none',
              },
              '&.css-4didej-MuiButtonBase-root-MuiAccordionSummary-root .MuiAccordionSummary-content':
                {
                  margin: '0px',
                },
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                Payroll {d}
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '12px', color: '#aaa' }}>
                  Start Date
                </Typography>
                <Typography>5/10/23</Typography>
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '12px', color: '#aaa' }}>
                  End Date
                </Typography>
                <Typography>5/12/23</Typography>
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '12px', color: '#aaa' }}>
                  Total Hours
                </Typography>
                <Typography>700 hrs</Typography>
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '12px', color: '#aaa' }}>
                  Total Salary
                </Typography>
                <Typography>$34,042.42</Typography>
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '12px', color: '#aaa' }}>
                  Total Salary
                </Typography>
                <Typography>$3,042.42</Typography>
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              ></TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              ></TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                $11,934
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};
