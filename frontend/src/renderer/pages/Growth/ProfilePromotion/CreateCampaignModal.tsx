import React, { useContext } from 'react';
import { Box, Select, InputLabel, useTheme, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from '@mui/base';
import Overlay from 'renderer/components/Settings/Wallet/Common/Modal';
import styles from 'renderer/components/Settings/Wallet/Common/Modal/styles.module.css';
import {
    ModalFooter,
} from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { Stack } from '@mui/system';
import fetchReq from 'utils/fetch';
import { AuthContext } from 'renderer/contexts/AuthContext';
import { useState } from 'react'
import { use } from 'i18next';
import { User } from 'twilio-chat';
interface $Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addPromotion: any,
    promotions: promotionCampaign[]
}

interface promotionCampaign {
    userType: 'New' | 'Expired' | 'Both',
    activityType: 'Free trial' | 'First-month discount',
    offerLimit: 'No Limit' | number,
    offerExpiry: 'No Expiry' | number,
    message?: string | number | readonly string[] | undefined,
    createdAt?: Date,
    updatedAt?: Date,
    offerExpiryAfterUpdate?: 'No Expiry' | number
}

export default function CreatePromotionCampaignModal({
    open,
    setOpen,
    addPromotion,
    promotions
}: $Props) {

    const [promotionState, setPromotionState] = useState<promotionCampaign>({
        userType: 'New',
        activityType: 'Free trial',
        offerLimit: 'No Limit',
        offerExpiry: 'No Expiry',
        message: ''
    })

    const handlePromotionStateChange = (e: any) => {
        setPromotionState({ ...promotionState, [e.target.name]: e.target.value });
    };

    const { userData } = useContext(AuthContext);
    const theme = useTheme();
    const isDarkTheme = theme.palette.mode === 'dark';

    const addHandler = () => {
        handleSubmit(promotionState)
        setOpen(false)
    };

    const handleSubmit = (promotion: promotionCampaign) => {
        const agencyId = userData.agency._id
        const payload = {
            ...promotion,
            agencyId,
            creatorId: agencyId
        }
        console.log(payload)

        const endPoint = 'promotion'
        const options = {
            method: 'POST' as 'POST',
            headers: {
                'content-type': 'application/json',
            },
            withAuth: true,
            body: JSON.stringify(payload),
        };

        fetchReq(endPoint, options)
            .then(async (response) => {
                const result = await response.json()
                addPromotion([...promotions, result.data])
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const cancelHandler = () => {
        setOpen(false)
    }
    const handleModalClose = () => {
        setOpen(false)
    }

    return (
        <Overlay
            heading={'Create Promotion'}
            open={open}
            handleClose={handleModalClose}
            style={{
                width: '700px',
                height: '600px',
                top: '0',
                overflowY: 'scroll'
            }}
        >

            <Box sx={{ backgroundColor: isDarkTheme ? '#4B4B4B' : '#fff' }}>
                <Box padding={'10px 30px 0px 30px'} height={'8'}>
                    <form className={styles.modalBody} id="createPromotion" onSubmit={() => { handleSubmit('kk') }} >
                        <Stack gap="10px" sx={{ marginInline: '30px', paddingTop: '10px', paddingBottom: '50px', }} className={styles.inputListWrapper}>
                            <Box>
                                <InputLabel variant="standard" htmlFor="{...userData}Type">
                                    User Type
                                </InputLabel>
                                <Select
                                    id="userType"
                                    value={promotionState.userType}
                                    onChange={handlePromotionStateChange}
                                    autoWidth
                                    name="userType"
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <MenuItem style={{ minWidth: '100%' }} value={'New'} sx={{ width: '100%' }}>New</MenuItem>
                                    <MenuItem style={{ minWidth: '100%' }} value={'Expired'} sx={{ width: '100%' }}>Expired</MenuItem>
                                    <MenuItem style={{ minWidth: '100%' }} value={'Both'} sx={{ width: '100%' }}>Both</MenuItem>
                                </Select>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Promotion Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="Free trial" control={<Radio />} label="Free trial" />
                                        <FormControlLabel value="First-month discount" control={<Radio />} label="First-month discount" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <Box>
                                <InputLabel variant="standard" htmlFor="offerExpiry">
                                    Offer Expiry
                                </InputLabel>
                                <Select
                                    id="offerExpiry"
                                    value={promotionState.offerExpiry}
                                    onChange={handlePromotionStateChange}
                                    autoWidth
                                    name="offerExpiry"
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <MenuItem style={{ minWidth: '100%' }} value={'No Expiry'} sx={{ width: '100%' }}>No Expiry</MenuItem>
                                    {
                                        Array.from({ length: 30 }, (_, x) => (
                                            <MenuItem value={`${x + 1}${x === 0 ? ' Day' : ' Days'}`}>{x + 1}{x === 0 ? ' Day' : ' Days'}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Box>

                            <Box>
                                <InputLabel variant="standard" htmlFor="offerExpiry">
                                    Offer Limit
                                </InputLabel>
                                <Select
                                    id="offerLimit"
                                    value={promotionState.offerLimit}
                                    onChange={handlePromotionStateChange}
                                    autoWidth
                                    name="offerLimit"
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <MenuItem style={{ minWidth: '100%' }} value={'No Limit'} sx={{ width: '100%' }}>No LImit</MenuItem>
                                    {
                                        Array.from({ length: 100 }, (_, x) => (
                                            <MenuItem value={`${x + 1}${x === 0 ? ' subscriber' : ' subscribers'}`}>{x + 1}{x === 0 ? ' subscriber' : ' subscribers'}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Box>

                            <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                                <Box>
                                    <label htmlFor="">Message (Optional)</label>
                                </Box>
                                <Box>
                                    <TextareaAutosize name="message" onChange={handlePromotionStateChange} value={promotionState.message} maxRows={4} placeholder="Message" style={{ width: '100%', color: isDarkTheme ? 'white' : 'black', backgroundColor: isDarkTheme ? '#4B4B4B' : '#fafafa', minHeight: '60px', paddingTop: "20px", paddingLeft: '10px' }} />
                                </Box>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Box>
            <ModalFooter
                addHandler={addHandler}
                cancelHandler={cancelHandler}
                addText={'Confirm To Save'}
                isLoading={false}
                id="addEmployee"
            />
        </Overlay>
    )
}

