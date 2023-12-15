import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import Overlay from "renderer/components/Settings/Wallet/Common/Modal";
import { InputWithLabel, ModalFooter } from "renderer/components/Settings/Wallet/Common/ModalComponents";

interface $Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onChange: (proxy: string) => void;
}

export default function SetProxyModal({
  open,
  setOpen,
  value,
  onChange,
}: $Props) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  
  const [proxy, setProxy] = useState<string>(value);
  return (
    <Overlay heading='Set Proxy' open={open} handleClose={() => setOpen(false)}>
      <Box sx={{
          backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
          padding: '20px 20px',
        }}>
        <InputWithLabel
          label="Proxy URL"
          inputIdentifierName="proxyUrl"
          placeholder="Enter proxy url"
          handleOnChange={(name, proxy) => onChange(proxy)}
        />
        <small>Correct format: HOST:PORT@USER:PASS or HOST:PORT</small>
      </Box>
      <ModalFooter
        addHandler={() => onChange(proxy)}
        cancelHandler={() => setOpen(false)}
        addText={`Set Proxy`}
        id="setProxy"
      />
    </Overlay>
  );
}