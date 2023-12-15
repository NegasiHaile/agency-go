import {
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import CandleSvg from 'renderer/assets/svg/CandleSvg';
import PageAside from 'renderer/components/PageAside';
import theme from 'renderer/styles/muiTheme';
// import CloseCircleSvg from 'renderer/assets/svg/CloseCircleSvg';
import React, { ChangeEvent, useState } from 'react';
import SearchInput from 'renderer/components/SearchInput';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './styles.module.css';
// import FilterTag from './FilterTag';
// import fetchReq from 'utils/fetch';
import { useLocation } from 'react-router-dom';
import MultiSelect from '../Dropdown';
import useQuery from 'renderer/hooks/useQuery';

interface $ByManageEmployeeCreatorProps {
  label?: string;
  
}

function FilterByManageEmployeeCreator({
  label = 'By Creator',

}: $ByManageEmployeeCreatorProps) {
  const [collapse, setCollapse] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const { isLoading, data } = useQuery({ key: 'get-creator' });
const theme = useTheme();
const isDarkTheme = theme.palette.mode === 'dark';



  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: '12px',
         
        }}
        onClick={() => setCollapse(!collapse)}
      >
        <Typography variant="h6" fontSize="14px">
          {label}
        </Typography>
        {!collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse in={!collapse}>
        {/* <SearchInput
          onSearch={() => {}}
          onUpdateSearch={(v) => setCreatorSearch(v)}
          value={creatorSearch}
          placeholder={placeholder}
          className={styles.input}
        /> */}
        <MultiSelect
          multiple={false}
          creatorNames={data?.data}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </Collapse>
    </div>
  );
}

interface $ByCreatorProps {
  creatorSearch: string;
  setCreatorSearch: (v: string) => void;
  label?: string;
  placeholder?: string;
}

function FilterByCreator({
  creatorSearch,
  setCreatorSearch,
  label = 'By Creator',
  placeholder = 'Enter creator name',
}: $ByCreatorProps) {
  const [collapse, setCollapse] = useState(false);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
        onClick={() => setCollapse(!collapse)}
      >
        <Typography variant="h6" fontSize="14px">
          {label}
        </Typography>
        {!collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse in={!collapse}>
        <SearchInput
          onSearch={() => {}}
          onUpdateSearch={(v) => setCreatorSearch(v)}
          value={creatorSearch}
          placeholder={placeholder}
          className={styles.input}
        />
      </Collapse>
    </div>
  );
}

interface $ByEmployeeProps {
  employeeSearch: string;
  setEmployeeSearch: (v: string) => void;
  label?: string;
  placeholder?: string;
}

function FilterByEmployee({
  employeeSearch,
  setEmployeeSearch,
  label = 'By Employee',
  placeholder = 'Enter employee name',
}: $ByEmployeeProps) {
  const [collapse, setCollapse] = useState(false);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
        onClick={() => setCollapse(!collapse)}
      >
        <Typography variant="h6" fontSize="14px">
          {label}
        </Typography>
        {!collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse in={!collapse}>
        <SearchInput
          onSearch={() => {}}
          onUpdateSearch={(v) => setEmployeeSearch(v)}
          value={employeeSearch}
          placeholder={placeholder}
          className={styles.input}
        />
      </Collapse>
    </div>
  );
}

interface $ByStatusProps {
  status: string;
  setStatus: (v: string) => void;
  title: string;
  options: string[];
}

function FilterByStatus({ status, setStatus, title, options }: $ByStatusProps) {
  const [collapse, setCollapse] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
        onClick={() => setCollapse(!collapse)}
      >
        <Typography variant="h6" fontSize="14px">
          {title}
        </Typography>
        {!collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse in={!collapse}>
        <RadioGroup value={status} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel
              value={option}
              control={
                <Radio
                  sx={{
                    '&:checked': { color: theme.palette.primary.light },
                    color: theme.palette.primary.contrastText,
                  }}
                />
              }
              label={option}
            />
          ))}
        </RadioGroup>
      </Collapse>
    </div>
  );
}

interface $ByEmploeeCreatorProps {
  //   status: string;
  //   setStatus: (v: string) => void;
  title: string;
  setEmployeeId: any;
  employeeId: any;
  //   options: string[];
}

function FilterByEmployeeInCreator({
  title,
  employeeId,
  setEmployeeId,
}: $ByEmploeeCreatorProps) {
  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };
  const [collapse, setCollapse] = useState(false);
  const [agencyId] = useState(localStorage.getItem('AgencyId') || '')
  const { isLoading, data } = useQuery({
    key: 'get-employee',
    params: { id: agencyId },
  });

  const handleChange = (event: SelectChangeEvent<typeof employeeId>) => {
    setEmployeeId(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
        onClick={() => setCollapse(!collapse)}
      >
        <Typography variant="h6" fontSize="14px">
          {title}
        </Typography>
        {!collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse in={!collapse} sx={{ marginBottom: '12px' }}>
        <FormControl sx={{ width: 230, marginBottom: '30px' }}>
          
          <Select
            sx={{
              color: '#fff',
              '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select':
                {
                  border: ' 1px solid #ddd',
                  height: ' 20px',
                },
              '&:hover': {
                border: ' 1px solid #4a4a4a',
              },
            }}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={employeeId.name}
            onChange={(e) => handleChange(e)}
            // renderValue={(selected) => (selected.name ? selected.name : 'reeeteter')}
            renderValue={(selected: any) =>
              selected.name !== '' ? undefined : 'placeholder text'
            }
            MenuProps={MenuProps}
          >
            {data?.data.map((name: any) => (
              <MenuItem key={name} value={name} sx={{ display: 'flex' }}>
                <Checkbox checked={employeeId._id === name._id} />
                <ListItemText primary={name.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Collapse>
    </div>
  );
}

const initFiltersState = [
  {
    label: 'Status',
  },
  {
    label: 'Employee',
  },
  {
    label: 'Status link',
  },
];

interface $FilterProps {
  handleSearch?: any;
  refetch?: any;
}
function Filter({ handleSearch, refetch }: $FilterProps) {
  const [filters, setFilters] = useState(initFiltersState);
  const [creatorSearch, setCreatorSearch] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');

  const [status, setStatus] = useState('');
  const [linkStatus, setLinkStatus] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);

  const { isLoading, data } = useQuery({ key: 'get-creator' });
  const [employeeId, setEmployeeId] = React.useState<any>({});
  
  const location = useLocation();
  const onRemoveFilter = () => {
    setCreatorSearch('');
    setLinkStatus('');
    setEmployeeId({});
    setStatus('');
    setSelectedValues([]);
    setEmployeeSearch('');
    refetch('');

    // setFilters(filters.filter((filter) => filter.label !== id));
  };

  const handleFilterData = () => {
    const data = {};
    if (location.pathname === '/creators') {
      if (creatorSearch != '') {
        Object.assign(data, { creator: creatorSearch });
      }
      if (status != '') {
        Object.assign(data, { status: status == 'Activated' ? true : false });
      }
      if (linkStatus != '') {
        Object.assign(data, {
          plateformlink: linkStatus == 'Linked' ? true : false,
        });
      }
      if (employeeId && Object.values(employeeId).length) {
        Object.assign(data, {
          employeeId: employeeId._id,
        });
      }
    } else {
      if (selectedValues.length) {
        Object.assign(data, { creator: selectedValues.toString() });
      }
      if (status != '') {
        Object.assign(data, {
          status: status == 'inactive' ? 'inactive' : 'active',
        });
      }
      if (employeeSearch != '') {
        Object.assign(data, { name: employeeSearch });
      }
    }
    handleSearch(data);
  };

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
    const [chipData, setChipData] = React.useState<readonly ChipData[]>([
      { key: 0, label: 'Status' },
      { key: 1, label: 'Employee' },
      { key: 2, label: 'Creator' },
    ]);
  return (
    <PageAside>
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
        
        }}
      >
        <CandleSvg />
        <Typography font-size="22px">Filters</Typography>
      </Box>

      <Box>
        <Typography marginLeft={'20px'}> Applied Filters</Typography>
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.primary.contrastText}`,

            gap: '10px',
            display: 'flex',
            padding: '20px 0px 20px 20px ',
          }}
        >
          {chipData.map((data) => {
            return <Chip label={data.label} onDelete={handleDelete(data)} />;
          })}
        </Box>
        {/* <Button variant="outlined" onClick={onRemoveFilter}>
          Reset
        </Button>
        <Button
          variant="contained"
          sx={{ color: 'white' }}
          onClick={handleFilterData}
        >
          Search
        </Button> */}
        {/* <Stack
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
        >
          <Typography variant="h6">Applied Filters</Typography>
          <Button
            sx={{
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              textTransform: 'unset',
            }}
            onClick={() => setFilters([])}
          >
            <Typography variant="body2" color="#fff">
              Clear all
            </Typography>
            <CloseCircleSvg />
          </Button>
        </Stack>
        <Stack flexDirection="row" gap={2} alignItems="center" marginTop="8px">
          {filters.map((filter) => (
            <FilterTag
              key={filter.label}
              onRemoveFilter={onRemoveFilter}
              label={filter.label}
            />
          ))}
        </Stack> */}
      </Box>
      <Box padding="12px 16px 12px 16px">
        {location.pathname != '/creators' && (
          <>
            <FilterByEmployee
              employeeSearch={employeeSearch}
              setEmployeeSearch={setEmployeeSearch}
            />
            <Divider
              sx={{
                background: theme.palette.primary.contrastText,
                marginTop: '11px',
              }}
            />
          </>
        )}
      </Box>

      <Box padding="0px 16px 0px 16px">
        {location.pathname === '/creators' ? (
          <FilterByCreator
            creatorSearch={creatorSearch}
            setCreatorSearch={setCreatorSearch}
          />
        ) : (
          <>
            {/* <Typography variant="h6" fontSize="14px" marginBottom={'10px'}>
              By Creator
            </Typography>
            <MultiSelect
              multiple={false}
              creatorNames={data?.data}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            /> */}
            <FilterByManageEmployeeCreator />
          </>
        )}
        <Divider
          sx={{
            background: theme.palette.primary.contrastText,
            marginTop: '11px',
          }}
        />
      </Box>
      <Box padding="12px 16px 12px 16px">
        <FilterByStatus
          title="By Status"
          status={status}
          setStatus={setStatus}
          options={
            location.pathname === '/creators'
              ? ['Activated', 'Deactivated']
              : ['active', 'inactive']
          }
        />
        <Divider
          sx={{
            background: theme.palette.primary.contrastText,
            marginTop: '11px',
          }}
        />
      </Box>
      {location.pathname === '/creators' && (
        <Box padding="12px 16px 12px 16px">
          <FilterByStatus
            title="By Link Status"
            status={linkStatus}
            options={['Linked', 'Unlinked']}
            setStatus={setLinkStatus}
          />
          <Divider
            sx={{
              background: theme.palette.primary.contrastText,
              marginTop: '11px',
            }}
          />
        </Box>
      )}
      {location.pathname === '/creators' && (
        <Box padding="12px 16px 12px 16px">
          <FilterByStatus
            title="By Employee"
            status={linkStatus}
            options={['Isaac', 'Gregory']}
            setStatus={setLinkStatus}
          />
          <Divider
            sx={{
              background: theme.palette.primary.contrastText,
              marginTop: '11px',
            }}
          />
        </Box>
      )}

      {/* {location.pathname == '/creators' && (
        <Box padding="12px 16px 12px 16px">
          <FilterByEmployeeInCreator
            title="By Employee name"
            setEmployeeId={setEmployeeId}
            employeeId={employeeId}
          />
          <Divider
            sx={{
              background: theme.palette.primary.contrastText,
              marginTop: '11px',
            }}
          />
        </Box>
      )} */}
    </PageAside>
  );
}

Filter.FilterByCreator = FilterByCreator;
Filter.FilterByStatus = FilterByStatus;

export default Filter;
