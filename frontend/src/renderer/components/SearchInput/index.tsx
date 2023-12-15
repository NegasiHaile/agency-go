import { ChangeEvent, ReactNode } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from '@mui/material';
import Refresh from 'renderer/assets/svg/refreshSvg';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles.module.css';
import theme from 'renderer/styles/muiTheme';
import AddIcon from '@mui/icons-material/Add';
interface $Props {
  value: string;
  onUpdateSearch: (v: string) => void;
  onSearch: () => void;
  children?: ReactNode | ReactNode[];
  placeholder?: string;
  className?: string;
}

function SearchInput({
  value,
  onUpdateSearch,
  onSearch,
  placeholder = 'Search',
  children,
  className = '',
}: $Props) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateSearch(event.target.value as string);
  };
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  return (
    <div className={`${styles.search} ${className}`}>
      <OutlinedInput
        value={value}
        onChange={handleSearch}
        size="small"
        type="text"
        id="search-input"
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="search data"
              onClick={onSearch}
              onMouseDown={onSearch}
              edge="end"
            >
              <SearchIcon sx={{ color: '#AAAAAA' }} />
            </IconButton>
          </InputAdornment>
        }
      />
      <Box
        sx={{
          filter: isDarkTheme
            ? 'brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(13%) hue-rotate(81deg) brightness(106%) contrast(106%);'
            : 'brightness(0) saturate(100%) invert(0%) sepia(4%) saturate(7500%) hue-rotate(244deg) brightness(94%) contrast(103%);',
        }}
      >
        {children}
      </Box>
    </div>
  );
}

interface $ReloadProps {
  onRefresh: () => void;
}

function ReloadButton({ onRefresh }: $ReloadProps) {
  return (
    <IconButton
      aria-label="refresh data"
      onClick={onRefresh}
      onMouseDown={onRefresh}
      edge="end"
    >
      <Refresh style={{ color: theme.palette.secondary.contrastText }} />
    </IconButton>
  );
}

SearchInput.ReloadButton = ReloadButton;

interface $NewConvProps {
  onClick: () => void;
}

function NewConvButton({ onClick }: $NewConvProps) {
  return (
    <IconButton
      aria-label="new conversation"
      onClick={onClick}
      onMouseDown={onClick}
      edge="end"
    >
      <AddIcon
        sx={{ color: theme.palette.secondary.contrastText, fontSize: '28px' }}
      />
    </IconButton>
  );
}

SearchInput.NewConvButton = NewConvButton;

export default SearchInput;
