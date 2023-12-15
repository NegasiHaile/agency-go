import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material';

export default function MultiSelect({
  creatorNames,
  setSelectedValues,
  selectedValues,
  multiple,
}: any) {
  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    setSelectedValues(event.target.value as typeof selectedValues);
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <FormControl
      sx={{
        minWidth: '100%',
        borderRadius: '5px',
        outline: 'none',
        color: '#fff',
        background: isDarkTheme ? '#0f0f0f' : '#fff',
      }}
    >
      <Select
        sx={{
          '&.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
            background: '#0f0f0f !important',
          },
        }}
        fullWidth
        labelId="demo-multi-select-label"
        id="demo-multi-select"
        multiple={multiple}
        defaultValue={selectedValues}
        value={selectedValues}
        label="Select Values"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {creatorNames?.map((val: any) => {
          return <MenuItem value={val?._id}>{val?.creatorName}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}
