/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  Radio,
  RadioGroup,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import Overlay from 'renderer/components/Settings/Wallet/Common/Modal';
import styles from 'renderer/components/Settings/Wallet/Common/Modal/styles.module.css';
import MultiSelectDropdown, {
  AutoRelinkSwitch,
  DropdownWithLabel,
  InputWithLabel,
  ModalFooter,
  RadioButton,
} from 'renderer/components/Settings/Wallet/Common/ModalComponents';
import { Stack } from '@mui/system';
import { genderList } from '../constant';
import useFormCreator from '../hooks/useForm';
import ImageUpload from './ImageUploader';
import IconCheckboxes from 'renderer/components/RadioButton';

interface $Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  type: 'add' | 'edit';
  selectedCreator?: any;
}

const dummyTypes = [
  { title: 'Brunette' },
  { title: 'Blonde' },
  { title: 'Red Head' },
  { title: 'Brown' },
  { title: 'Colored hair' },
  { title: 'Big Boobs' },
  { title: 'Small Boobs' },
  { title: 'Petit' },
  { title: 'BBW' },
  { title: 'Slim Thick' },
  { title: 'Curvy' },
  { title: 'Muscular' },
  { title: 'Big Booty' },
  { title: 'Bubble Butt' },
  { title: 'Milf' },
  { title: 'Teen' },
  { title: 'College Student' },
  { title: 'Goth' },
  { title: 'Alt' },
  { title: 'Cute feet' },
  { title: 'Latina' },
  { title: 'White' },
  { title: 'Arab' },
  { title: 'Asian' },
  { title: 'Indian' },
  { title: 'Ebony' },
  { title: 'Russian' },
  { title: 'German' },
  { title: 'Straight' },
  { title: 'Gay' },
  { title: 'Lesbian' },
  { title: 'Trans' },
  { title: 'Bisexual' },
  { title: 'Big Dick' },
  { title: 'Small Dick' },
  { title: 'BBC' },
  { title: 'BWC' },
  { title: 'Freak' },
  { title: 'Hairy' },
  { title: 'Dominant' },
  { title: 'Submissive' },
  { title: 'Tattoo' },
  { title: 'Pierced' },
];
export default function AddCreaterModal({
  open,
  setOpen,
  refetch,
  type,
  selectedCreator,
}: $Props) {
  const {
    employeeOptions,
    handleSubmit,
    register,
    control,
    isLoading,
    isAutoRelink,
    toggleAutoRelink,
    setEmployeeOptions,
    setValue,
    setSelectedValues,
    selectedValues,
  } = useFormCreator(
    () => {
      setOpen(false);
      refetch();
    },
    type,
    selectedCreator
  );

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (optionValue: string) => {
    if (selectedOptions.includes(optionValue)) {
      setSelectedOptions(
        selectedOptions.filter((value) => value !== optionValue)
      );
    } else {
      // Limit selection to a maximum of 5 options
      if (selectedOptions.length < 5) {
        setSelectedOptions([...selectedOptions, optionValue]);
      } else {
        // Notify the user or handle the maximum selection limit
        console.log('Maximum selection limit reached');
      }
    }
  };

  const addHandler = () => {
    handleSubmit();
  };

  const cancelHandler = () => {
    setSelectedValues([]);
    setOpen(false);
  };

  const handleModalClose = () => {
    setSelectedValues([]);
    setOpen(false);
  };

  const handleChangeFile = (file: File | undefined) => {
    console.log('file ******', file);
    if (file) {
      console.log('file ******', URL.createObjectURL(file));
    }
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Overlay
      heading={`${type == 'add' ? 'Add' : 'Edit'} Creators`}
      open={open}
      handleClose={handleModalClose}
      style={{
        width: '700px',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
          padding: '0px 20px',
        }}
      >
        <form
          id="addCreator"
          className={styles.modalBody}
          onSubmit={addHandler}
          autoComplete="off"
        >
          <Stack
            gap="10px"
            sx={{
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
            className={styles.inputListWrapper}
          >
            <Box>
              <Typography>{`${
                type == 'add' ? 'Add' : 'Edit'
              } Headshot`}</Typography>
              <Box>
                <ImageUpload handleChangeFile={handleChangeFile} />
              </Box>
            </Box>
            <InputWithLabel
              inputStyle={{
                border: '1px solid #292929',
                backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
              }}
              label="Creator's name"
              inputIdentifierName="creatorName"
              placeholder="Enter name"
              register={register as any}
            />
            <InputWithLabel
              inputStyle={{
                border: '1px solid #292929',
                backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
              }}
              label="Email"
              inputIdentifierName="email"
              placeholder="Enter Email"
              register={register as any}
            />
            <InputWithLabel
              inputStyle={{
                border: '1px solid #292929',
                backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
              }}
              label="Password"
              inputIdentifierName="password"
              placeholder="Enter Password"
              register={register as any}
            />
            <DropdownWithLabel
              selectStyle={{
                border: '1px solid #292929',
                backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
              }}
              label="Gender"
              inputIdentifierName="gender"
              options={genderList}
              placeholder="Select gender"
              register={register as any}
            />
            <DropdownWithLabel
              selectStyle={{
                border: '1px solid #292929',
                backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
              }}
              label="Assign Employee"
              inputIdentifierName="assignEmployee"
              options={genderList}
              placeholder="Select Employee"
              register={register as any}
            />
            {/* <MultiSelectDropdown
              options={employeeOptions}
              selectedValues={selectedValues}
              setSelectedValues={(selected: any) => {
                console.log(selected, 'selectedselected');
                setValue('assignEmployee', selected);
                setSelectedValues(selected);
              }}
              label="Assign employee"
              inputIdentifierName="assignEmployee"

              
            /> */}
            <InputWithLabel
              inputStyle={{
                border: '1px solid #292929',
                backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
              }}
              label="Internal notes"
              inputIdentifierName="internalNotes"
              placeholder="Enter name"
              register={register as any}
            />
            <Box>
              <Typography fontSize={'14px'}>Creator/Agency Split*</Typography>
              <Box
                display={'flex'}
                gap={'10px'}
                justifyContent={'space-between'}
              >
                <InputWithLabel
                  inputStyle={{
                    border: '1px solid #292929',
                    backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
                  }}
                  label=""
                  inputIdentifierName="agency"
                  placeholder="Agency %"
                  // register={register as any}
                />
                <InputWithLabel
                  inputStyle={{
                    border: '1px solid #292929',
                    backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
                  }}
                  label=" "
                  inputIdentifierName="creator"
                  placeholder="Creator %"

                  // register={register as any}
                />
              </Box>
            </Box>
            <Box
              sx={{
                padding: '10px 0px',
              }}
            >
              <Typography fontSize={'14px'}>Auto relink</Typography>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography fontSize={'12px'}>
                  When enabled, we'll automatically relink the OnlyFans account
                  when they are disconnected from OnlyManager
                </Typography>
                <AutoRelinkSwitch
                  toggleAutoRelink={toggleAutoRelink}
                  register={register as any}
                  name={'autoRelink'}
                  isAutoRelink={isAutoRelink}
                />
              </Box>
            </Box>
            {/* <Box sx={{ padding: '10px 0px' }}>
              <Typography fontSize={'14px'}>Auto relink</Typography>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography fontSize={'12px'} width={'350px'}>
                  When enabled, we'll automatically relink the OnlyFans account
                  when they are disconnected from OnlyManager
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch />}
                    // checked={isAutoRelink}
                    label=""
                    // onClick={toggleAutoRelink}
                    required={register as any}
                  />
                </FormGroup>
              </Box>
            </Box> */}
            <Typography fontSize={'14px'}>Network proxy</Typography>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box display={'flex'} alignItems={'center'}>
                <RadioButton title="Use AgencyGO Proxy" />
                {/* <IconCheckboxes
                  title="Use AgencyGO Proxy"
                  name={'isAgencyProxy'}
                  register={register as any}
                  // register={register as any}
                /> */}
              </Box>
              <Link>Use Custom Proxy</Link>
            </Box>
            {/* <Typography fontSize={'14px'}>
              Model Data (select at least 3 and a maximum of 5 options)
            </Typography>
            <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'}>
              {dummyTypes.map((data) => (
                <Box width={'25%'}>
                  <IconCheckboxes title={`${data.title}`} />
                </Box>
              ))}
            </Box> */}
          </Stack>
          <Typography>
            {' '}
            Model Data (select at least 3 and a maximum of 5 options)
          </Typography>
          <FormGroup
            aria-label="proxy-options"
            // value={selectedOption}
            // onChange={handleRadioChange}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto auto auto auto',
              marginTop: '10px',
            }}
            row
          >
            {dummyTypes.map((option, index) => (
              <FormControlLabel
                key={index} // Ensure each component has a unique key
                value={option.title}
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option.title)}
                    onChange={() => handleOptionChange(option.title)}
                    name={option.title}
                  />
                }
                label={option.title}
              />
            ))}
            {/* Add more FormControlLabel components for additional options */}
          </FormGroup>
        </form>
      </Box>
      <ModalFooter
        addHandler={addHandler}
        cancelHandler={cancelHandler}
        addText={`${type == 'add' ? 'Add Creator' : 'Confirm'}`}
        id="addCreator"
      />
    </Overlay>
  );
}
