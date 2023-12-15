import { FieldValues, UseFormRegister } from 'react-hook-form';
import classes from './styles.module.css';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  useTheme,
} from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import LensIcon from '@mui/icons-material/Lens';
import { ReactNode, useState } from 'react';

interface LabelTextProps {
  label: string;
}

export function LabelText(props: LabelTextProps) {
  const { label } = props;
  return <div className={classes.labelText}>{label}</div>;
}

interface InputWithLabelProps {
  label: string;
  inputIdentifierName: string;
  placeholder: string;
  value?: string;
  errors?: any;
  required?: boolean;
  inputStyle?: any;
  type?: string;
  handleOnChange?: (name: string, value: string) => void;
  register?: UseFormRegister<FieldValues>;
}
export function InputWithLabel(props: InputWithLabelProps) {
  const {
    label,
    inputIdentifierName,
    placeholder,
    value,
    errors,
    inputStyle,
    type = 'text',
    required = false,
    handleOnChange = () => {},
    register = () => ({}),
  } = props;

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <div className={classes.inputLabelWrapper}>
      <LabelText label={label} />
      <input
        style={{
          backgroundColor: isDarkTheme ? '#292929' : '#fff',
          color: isDarkTheme ? '#fff' : '#000',
        }}
        className={classes.inputCss}
        name={inputIdentifierName}
        placeholder={placeholder}
        required={required}
        value={value}
        type={type}
        onChange={(e) => handleOnChange(inputIdentifierName, e.target.value)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(inputIdentifierName)}
        aria-invalid={errors && errors[inputIdentifierName] ? 'true' : 'false'}
      />
      {errors && (
        <div style={{ color: 'red', fontSize: '12px', margin: '5px 0px' }}>
          {errors[inputIdentifierName]?.message}
        </div>
      )}
    </div>
  );
}

interface Option {
  label?: string;
  value?: string;
}

interface DropdownWithLabelProps {
  label?: string | undefined;
  inputIdentifierName?: string;
  value?: string;
  selectStyle?: any;
  handleOnChange?: (name?: string, value?: string) => void;
  options?: Option[]; // Array of options
  placeholder?: string;
  register?: UseFormRegister<FieldValues>;
}

export function DropdownWithLabel(props: DropdownWithLabelProps) {
  const {
    label,
    inputIdentifierName,
    value,
    selectStyle,
    handleOnChange = () => {},
    options,
    placeholder,
    register = () => ({}),
  } = props;

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <div className={classes.inputLabelWrapper}>
      {label && <LabelText label={label} />}
      <select
        style={{
          backgroundColor: isDarkTheme ? '#292929' : '#fff',
          color: isDarkTheme ? '#fff' : '#000',
        }}
        className={classes.selectCss}
        name={inputIdentifierName}
        id={inputIdentifierName}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(inputIdentifierName, e.target.value)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(inputIdentifierName || '')}
      >
        <option value="" selected>
          {placeholder}
        </option>
        {options?.map((res, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={index} value={res?.value}>
            {res?.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface DropdownWithTreeLabelProps {
  label?: string | undefined;
  inputIdentifierName?: string;
  value?: string;
  selectStyle?: any;
  handleOnChange?: (name?: string, value?: string) => void;
  options?: ReactNode; // Array of options
  placeholder?: string;
  register?: UseFormRegister<FieldValues>;
}
export function DropdownWithTreeLabel(props: DropdownWithTreeLabelProps) {
  const {
    label,
    inputIdentifierName,
    value,
    selectStyle,
    handleOnChange = () => {},
    options,
    placeholder,
    register = () => ({}),
  } = props;
  const [showTreeSelectBox, setShowTreeSelectBox] = useState(false);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <div className={classes.inputLabelWrapper}>
      {/* {label && <LabelText label={label} />} */}
      <div onClick={() => setShowTreeSelectBox(true)}>
        <InputWithLabel
          label={label}
          value={value}
          // inputIdentifierName="agencyId"
          placeholder={"Enter parent group name"}
          // register={register as any}
        />
      </div>
      {showTreeSelectBox && (
        <div style={{ borderRadius: '5px', width: '100%', background: 'gray' }}>
          {options}
        </div>
      )}
    </div>
  );
}
interface ModalFooterProps {
  addHandler: () => void;
  cancelHandler: () => void;
  cancelText?: string;
  addText?: string;
  isLoading?: boolean;
  id?: string;
}

export function ModalFooter(props: ModalFooterProps) {
  const {
    addHandler,
    cancelHandler,
    cancelText = 'Cancel',
    addText = 'Add',
    isLoading,
    id = '',
  } = props;
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <div
      className={classes.modalFooter}
      style={{ backgroundColor: isDarkTheme ? '#292929' : '#EAF1FF' }}
    >
      <button
        className={classes.cancelButtonCss}
        onClick={cancelHandler}
        type="button"
        style={{
          color: isDarkTheme ? '#fff' : '#000',
          borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
        }}
      >
        {cancelText}
      </button>
      <button
        onClick={addHandler}
        className={classes.addButtonCss}
        type="submit"
        id={id}
        disabled={isLoading}
      >
        {addText}
      </button>
    </div>
  );
}
interface AutoRelinkSwitchProps {
  isAutoRelink: boolean;
  toggleAutoRelink: () => void;
  register: any;
  name: string;
}

export function AutoRelinkSwitch({
  isAutoRelink,
  toggleAutoRelink,
  register,
  name,
}: AutoRelinkSwitchProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch defaultChecked={isAutoRelink} />}
        label=""
        {...register(name)}
      />
    </FormGroup>
  );
}

interface RadioProps {
  title?: string;
}

export function RadioButton({ title }: RadioProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            icon={<LensIcon sx={{ color: '#fff' }} />}
            checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#B2E2FF' }} />}
          />
        }
        label={title}
        // label={`${title.title}`}
      />
    </FormGroup>
  );
}

export default function MultiSelectDropdown({
  options,
  setSelectedValues,
  selectedValues,
  inputIdentifierName,
  label,
  control,
  ...rest
}: // register = () => {},
any) {
  const handleOnChange = (event: any) => {
    setSelectedValues(event.target.value as typeof selectedValues);
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <>
      <LabelText label={label} />
      <FormControl
        sx={{
          m: 0,
          minWidth: '100%',
          backgroundColor: isDarkTheme ? '#292929' : '#fff',
          border: '1px solid #fff',
          borderRadius: '5px',
          outline: 'none',
          color: '#fff',
          '&:focus': {
            border: 'none',
            outline: 'none',
          },
          '&.css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
            background: 'gray !important',
          },
        }}
        size="small"
      >
        <Select
          sx={{
            '&.MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
              background: 'gray !important',
            },
            color: 'white',
          }}
          fullWidth
          labelId="demo-multi-select-label"
          id="demo-multi-select"
          multiple
          value={selectedValues}
          placeholder="add"
          label="Select Values"
         
          onChange={handleOnChange}
        >
          {options?.map((val: any) => {
            return <MenuItem value={val?.value}>{val?.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </>
  );
}
