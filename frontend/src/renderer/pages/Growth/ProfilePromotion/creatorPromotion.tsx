import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination
} from '@mui/material';

import { Add } from '@mui/icons-material';
import styles from './styles.module.css';
import CreatePromotionCampaignModal from './CreateCampaignModal';
//import fetchReq from 'utils/fetch';
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from 'renderer/contexts/AuthContext';
export interface promotionCampaign {
  userType: 'New' | 'Expired' | 'Both',
  activityType: 'Free trial' | 'First-month discount',
  offerLimit: 'No Limit' | number,
  offerExpiry: 'No Expiry' | number,
  message?: string | number | readonly string[] | undefined,
  isExpired?: boolean
}
function CreatorPromotion() {

  const [OpenCreateCampaign, setOpenCreateCampaign] = useState(false);
  const [promotions, setPromotions] = useState<promotionCampaign[] | []>([])
  const [open, setOpen] = useState(false);




  const [creatorPromos, setCreatorPromos] = useState([])
  const [filteredCreatorPromos, setFilteredCreatorPromos] = useState([])
  const [checked, setChecked] = useState<boolean>(false)
  const [expired, setExpired] = useState<boolean>(false)
  const [offerExpiry, setOfferExpiry] = useState<'No Expiry' | number>('No Expiry')

 

  const handleSelectionChange = (event: any) => {
    setOfferExpiry(event.target.value)
    if (checked) {
      reactivateExpiredPromotions()
    }
  }

  const handleChange = () => {
    setChecked(checked => !checked)
    checked && reactivateExpiredPromotions()
  }
  const handleExpired = () => {
    setExpired(expired => !expired)
  }

  const reactivateExpiredPromotions = () => {}

  const user = useContext(AuthContext)
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <>
      <Box marginLeft="32px" marginRight="16px" marginTop="16px" width={'100%'}>
        <Stack gap="12px" width='95%'>
          <Button
            variant="contained"
            sx={{
              background: theme.palette.primary.main,
              marginLeft: 'auto',
              height: '32px',
              textTransform: 'unset',
            }}
            startIcon={<Add sx={{ color: '#fff' }} />}
            onClick={() => {
              setOpenCreateCampaign(true);
            }}
          >
            <Typography
              fontWeight={600}
              fontSize="14px"
              color="#fff"
              textTransform="unset"
            >
              Create Promotion
            </Typography>
          </Button>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${theme.palette.primary.contrastText}`}
            paddingBottom="32px"
          >
            <Stack gap="8px" width='100%'>
              <Typography fontSize="22px" fontWeight={700} fontFamily={'Arimo'}>
                Auto-activate campaign
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography fontSize="14px" fontWeight={600} fontFamily={'Arimo'} display='flex' alignItems='center'>
                  Enable to automatically reactivate your promotions when they
                  expire
                </Typography>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />

              </Box>
              {
                checked ? <Box marginTop="10px">
                  <Typography fontWeight={400} fontSize="14px" marginBottom="5px">
                    Offer Expiration
                  </Typography>
                  <Select
                    id="offer-expiration"
                    value={offerExpiry}
                    onChange={handleSelectionChange}
                    sx={{
                      backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
                      width: '300px',
                      height: '42px',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.secondary.contrastText,
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.secondary.contrastText,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.secondary.contrastText,
                      },

                      input: {
                        backgroundColor: theme.palette.secondary.contrastText,
                      },
                    }}
                  >
                    <MenuItem style={{ minWidth: '100%' }} value={'No Expiry'} sx={{ width: '100%' }}>No Expiry</MenuItem>
                    {
                      Array.from({ length: 29 }, (_, x) => (
                        <MenuItem value={`${x + 1} ${x === 0 ? 'Day' : 'Days'}`}>{x + 1} {x === 0 ? 'Day' : 'Days'}</MenuItem>
                      ))
                    }
                  </Select>
                </Box> : <></>
              }

            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${theme.palette.primary.contrastText}`}
            paddingBottom="32px"
          >
            <Stack gap="10px" >
              <Box marginTop="10px">
                <Typography fontWeight={400} fontSize="14px" marginBottom="5px">
                  Add Fans To List
                </Typography>
                <Select
                  id="offer-expiration"
                  value={7}
                  onChange={() => { }}
                  sx={{
                    backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF',
                    width: '300px',
                    height: '42px',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.contrastText,
                    },
                  }}
                >
                  <MenuItem
                    value={7}
                    sx={{ fontWeight: 400, fontSize: '12px' }}
                  >
                    IFA Profile Promotion
                  </MenuItem>
                </Select>
              </Box>
            </Stack>
          </Stack>
          <Stack>
            <button>
              save
            </button>
          </Stack>
          <Stack >
            <Stack direction='row' justifyContent='space-between'>
              <Typography fontWeight={600} fontSize="14px">
                Campaign Insights
              </Typography>
              <Switch checked={expired}
                onChange={handleExpired}
                inputProps={{ 'aria-label': 'controlled' }} />
            </Stack>
            <Stack
              gap="16px"
              direction="row"
              justifyContent="space-between"
              sx={{ backgroundColor: theme.palette.primary.contrastText }}
              className={styles.campaign}
              paddingTop="30px"
              paddingBottom="12px"
              paddingX="16px"
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, border: 'none' }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ border: 'none' }}><Typography fontWeight={600} fontSize="16px">
                        Promo
                      </Typography></TableCell>
                      <TableCell align="center" style={{ border: 'none' }}><Typography fontWeight={600} fontSize="16px">
                        Claims
                      </Typography></TableCell>
                      <TableCell align="center" style={{ border: 'none' }}><Typography fontWeight={600} fontSize="16px">
                        Revenue
                      </Typography></TableCell>
                      <TableCell align="center" style={{ border: 'none' }}><Typography fontWeight={600} fontSize="16px">
                        Operations
                      </Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {creatorPromos.map((promo: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 'none' }, alignItems: 'center' }}
                      >
                        <TableCell align="center" style={{ border: 'none' }}>{promo.userType}</TableCell>
                        <TableCell align="center" style={{ border: 'none' }}>{promo.activityType}</TableCell>
                        <TableCell align="center" style={{ border: 'none' }}>{promo.offerExpiry}</TableCell>
                        <TableCell align="center" style={{ border: 'none' }}>{promo.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
            <Stack spacing={2}>
              <Pagination count={10} color="primary" />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <CreatePromotionCampaignModal
        open={OpenCreateCampaign}
        setOpen={setOpenCreateCampaign}
        addPromotion={setPromotions}
        promotions={promotions}
      />
    </>
  );
}

export default CreatorPromotion;
