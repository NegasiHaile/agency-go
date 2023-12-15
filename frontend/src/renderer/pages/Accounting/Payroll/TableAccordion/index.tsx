import {  useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FolderOffIcon from '@mui/icons-material/FolderOff';

import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import PayrollTable from '../PayrollTable';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid  `,

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

export default function TableAccordion({allUsers, allPayrolls, setAllPayrolls, groupedPayrolls, payrollGroupTitle }: any) {

  const [expanded, setExpanded] = useState<string | false>('1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <Box sx={{borderRadius: '3px', overflow: 'auto',}}>
      {!!groupedPayrolls.length ? groupedPayrolls.map((payrollGroup:any, index:number) => {
        return <Accordion key={index+1}
          expanded={expanded === `${index+1}`}
          onChange={handleChange(`${index+1}`)}
          sx={{ borderColor: isDarkTheme ? '#292929' : '#fff' }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{
              background: isDarkTheme ? '#131213' : '#EAF1FF',
            }}
          >
            <AccordionHeaderData
            payrollGroup={payrollGroup}
            payrollGroupTitle={payrollGroupTitle}
            index={`${index+1}`} />
          </AccordionSummary>
          <AccordionDetails
            sx={{ background: isDarkTheme ? '#0C0C0C' : '#fff' }}
          >
             <PayrollTable
             key={`${index+1}`}
             allUsers={allUsers}
             payrollGroup={payrollGroup?.data??[]}
             allPayrolls={allPayrolls}
             setAllPayrolls={setAllPayrolls} />
          </AccordionDetails>
        </Accordion>
      }) : 
      <Box width={'100%'} display={'flex'} gap={'5px'} justifyContent={'center'} alignItems={'center'} height={'150px'}>
        <FolderOffIcon sx={{fontSize: '36px'}} />
      <Typography fontSize={'20px'}>No matching data!</Typography>  
      </Box>}
    </Box>
  );
}

const AccordionHeaderData = ({ payrollGroup, payrollGroupTitle, index }: any) => {
  const {startDate, endDate, totalCommissionEarned, totalHours, totalSalary, totalPayment} = payrollGroup;
   const theme = useTheme();
   const isDarkTheme = theme.palette.mode === 'dark';

   return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead
            sx={{
              bgcolor: isDarkTheme ? '#131213' :  '#EAF1FF',
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
              
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                {payrollGroupTitle} {index}
              </TableCell>
              <TableCell
                sx={{
                  
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '10px' }}>
                  Start Date
                </Typography>
                <Typography>{startDate}</Typography>
              </TableCell>
              <TableCell
                sx={{
                
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '10px' }}>
                  End Date
                </Typography>
                <Typography>{endDate}</Typography>
              </TableCell>
              <TableCell
                sx={{
               
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '10px', }}>
                  Total Hours
                </Typography>
                <Typography>{parseFloat(totalHours).toFixed(2)} hrs</Typography>
              </TableCell>
              <TableCell
                sx={{
                 
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '10px'}}>
                  Total Salary
                </Typography>
                <Typography>${parseFloat(totalSalary).toFixed(2)}</Typography>
              </TableCell>
              <TableCell
                sx={{
                 
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                <Typography sx={{ fontSize: '10px'}}>
                  Total Commission
                </Typography>
                <Typography>${parseFloat(totalCommissionEarned).toFixed(2)}</Typography>
              </TableCell>
              <TableCell
                sx={{
                 
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              ></TableCell>
              <TableCell
                sx={{
                
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              ></TableCell>
              <TableCell
                sx={{
                  
                  fontSize: '17px',
                  border: 'none',
                  padding: 0,
                }}
              >
                ${parseFloat(totalPayment).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};
