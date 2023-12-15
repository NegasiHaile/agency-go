import React, { useState } from 'react';
import { Button, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import theme from 'renderer/styles/muiTheme';
import { MyContext } from '../context/context';
import { useContext } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
export default function FilterGrid() {
  const initialValues = {
    tag1: '',
    tag2: '',
    tag3:'',
    tag4:'',
    tag5:'',
    tag6:''
  };
  const [formData, setFormData] = useState<any | null>(initialValues);
  const [placeholderData, setPlaceholderData] = useState<any | null>(initialValues);


  const getTags = () => {
    try {
      const tagsData:any = localStorage.getItem("tagsData");


      const parsedData = JSON.parse(tagsData);

      setFormData(parsedData)


      if (tagsData !== null) {
        console.log("Tags Data:", tagsData);
      } else {
        console.log("Tags Data not found in localStorage.");
      }
    } catch (error) {
      console.error("An error occurred while retrieving tagsData:", error);
    }
  };




  const handleChange = (e:any, fieldName:any) => {
    const { name, value } = e.target;
    // Update the state with the new field value
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = () => {
    console.log(formData); // This will contain all the field values
    setPlaceholderData(formData)
    localStorage.setItem("tagsData",JSON.stringify(formData))
    setFormData(initialValues)
  };
  const calculateFansPercentage = () => {
    const tag1Value = parseInt(formData.tag1) || 0;
    const tag2Value = parseInt(formData.tag2) || 0;

    // Perform the calculation
    const total = tag1Value + tag2Value;
    const fansPercentage = total > 0 ? ((tag1Value / total) * 100).toFixed(2) : 0;

    return `Fans: ${total} (${fansPercentage}%)`;
  };


  const calculateFansPercentage2 = () => {
    const tag1Value = parseInt(formData.tag3) || 0;
    const tag2Value = parseInt(formData.tag4) || 0;

    // Perform the calculation
    const total = tag1Value + tag2Value;
    const fansPercentage = total > 0 ? ((tag1Value / total) * 100).toFixed(2) : 0;

    return `Fans: ${total} (${fansPercentage}%)`;
  };

  const calculateFansPercentage3 = () => {
    const tag1Value = parseInt(formData.tag5) || 0;
    const tag2Value = parseInt(formData.tag6) || 0;

    // Perform the calculation
    const total = tag1Value + tag2Value;
    const fansPercentage = total > 0 ? ((tag1Value / total) * 100).toFixed(2) : 0;

    return `Fans: ${total} (${fansPercentage}%)`;
  };

 const theme = useTheme();
 const isDarkTheme = theme.palette.mode === 'dark';




  return (
    <>
      <Stack
        direction="row"
        gap="20px"
        alignItems="center"
        justifyContent="start"
      >
        <Button
          variant="text"
          startIcon={
            <DeleteOutlineIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.error.main,
              }}
            />
          }
        >
          <Typography
            fontWeight={500}
            fontSize="12px"
            sx={{ color: theme.palette.error.main }}
          >
            Delete
          </Typography>
        </Button>
        <Button
          variant="text"
          startIcon={
            <EditNoteIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: isDarkTheme ? '#fff' : '#000',
              }}
            />
          }
        >
          <Typography
            variant="h5"
            onClick={getTags}
            color={isDarkTheme ? '#fff' : '#000'}
          >
            Edit
          </Typography>
        </Button>
      </Stack>
      <Grid container spacing={2} marginTop="48px">
        <Grid item xs={3} alignItems="center">
          <Stack flexDirection="row" gap="10px" alignItems="center">
            <Typography fontWeight={500} fontSize="14px">
              Tag 1
            </Typography>
            <TextField
              placeholder={`${placeholderData.tag1}`}
              size="small"
              sx={{
                maxWidth: '161px',
                height: '41px',
                
                input: { color: theme.palette.secondary.contrastText },
              }}
              name="tag1"
              value={formData.tag1}
              onChange={(e) => handleChange(e, 'tag1')}
            />
          </Stack>
        </Grid>
        <Grid item xs={3} alignItems="center">
          <Stack
            flexDirection="row"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Typography fontWeight={500} fontSize="14px">
              total spents
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={3} alignItems="center">
          <Stack flexDirection="row" gap="10px" alignItems="center">
            <Typography fontWeight={500} fontSize="14px">
              Tag 2
            </Typography>
            <TextField
              placeholder={`${placeholderData.tag2}`}
              size="small"
              sx={{
                maxWidth: '161px',
                height: '41px',
                
                input: { color: theme.palette.secondary.contrastText },
              }}
              name="tag2"
              value={formData.tag2}
              onChange={(e) => handleChange(e, 'tag2')}
            />
          </Stack>
        </Grid>
        <Grid item xs={3} alignItems="center">
          <Stack
            flexDirection="row"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Typography fontWeight={500} fontSize="14px">
              {calculateFansPercentage()}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop="48px">
        <Grid item xs={3} alignItems="center">
          <Stack flexDirection="row" gap="10px" alignItems="center">
            <Typography fontWeight={500} fontSize="14px">
              Tag 3
            </Typography>
            <TextField
              placeholder={`${placeholderData.tag3}`}
              size="small"
              sx={{
                maxWidth: '161px',
                height: '41px',
                input: { color: theme.palette.secondary.contrastText },
              }}
              name="tag3"
              value={formData.tag3}
              onChange={(e) => handleChange(e, 'tag3')}
            />
          </Stack>
        </Grid>
        <Grid item xs={3} alignItems="center">
          <Stack
            flexDirection="row"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Typography fontWeight={500} fontSize="14px">
              total spents
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={3} alignItems="center">
          <Stack flexDirection="row" gap="10px" alignItems="center">
            <Typography fontWeight={500} fontSize="14px">
              Tag 4
            </Typography>
            <TextField
              placeholder={`${placeholderData.tag4}`}
              size="small"
              sx={{
                maxWidth: '161px',
                height: '41px',
                
                input: { color: theme.palette.secondary.contrastText },
              }}
              name="tag4"
              value={formData.tag4}
              onChange={(e) => handleChange(e, 'tag4')}
            />
          </Stack>
        </Grid>

        <Grid item xs={3} alignItems="center">
          <Stack
            flexDirection="row"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Typography fontWeight={500} fontSize="14px">
              {calculateFansPercentage2()}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop="48px">
        <Grid item xs={3} alignItems="center">
          <Stack flexDirection="row" gap="10px" alignItems="center">
            <Typography fontWeight={500} fontSize="14px">
              Tag 5
            </Typography>
            <TextField
              placeholder={`${placeholderData.tag5}`}
              size="small"
              sx={{
                maxWidth: '161px',
                height: '41px',
                
                input: { color: theme.palette.secondary.contrastText },
              }}
              name="tag5"
              value={formData.tag5}
              onChange={(e) => handleChange(e, 'tag5')}
            />
          </Stack>
        </Grid>
        <Grid item xs={3} alignItems="center">
          <Stack
            flexDirection="row"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Typography fontWeight={500} fontSize="14px">
              total spents
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={3} alignItems="center">
          <Stack flexDirection="row" gap="10px" alignItems="center">
            <Typography fontWeight={500} fontSize="14px">
              Tag 6
            </Typography>
            <TextField
              placeholder={`${placeholderData.tag6}`}
              size="small"
              sx={{
                maxWidth: '161px',
                height: '41px',
                
                input: { color: theme.palette.secondary.contrastText },
              }}
              name="tag6"
              value={formData.tag6}
              onChange={(e) => handleChange(e, 'tag6')}
            />
          </Stack>
        </Grid>

        <Grid item xs={3} alignItems="center">
          <Stack
            flexDirection="row"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Typography fontWeight={500} fontSize="14px">
              {calculateFansPercentage3()}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack
        marginTop="32px"
        flexDirection="row"
        gap="16px"
        alignItems="center"
        justifyContent="end"
      >
        <Button
          sx={{ color: '#fff', background: theme.palette.secondary.light }}
        >
          Cancel
        </Button>
        <Button
          sx={{ color: '#fff', background: theme.palette.primary.main }}
          onClick={submit}
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
