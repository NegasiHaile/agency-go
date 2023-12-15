import { Stack } from '@mui/material';
import { useState } from 'react';
import SearchUsers from 'renderer/components/SearchUsers';
import SwitchTag from 'renderer/components/SwitchTag';
import ReceivedRequests from './Received';
import SentRequests from './Sent';

export default function Requests() {
  const [currentTag, setCurrentTag] = useState('Received');

  const onSwitchTag = (tag: string) => {
    setCurrentTag(tag);
  };

  const renderContent = () =>
    ({
      Received: <ReceivedRequests />,
      Sent: <SentRequests />,
    }[currentTag]);

  return (
    <>
      <SearchUsers />
      <Stack gap="22px" marginLeft="32px" marginRight="16px" marginTop="16px">
        <SwitchTag
          firstTitle="Received"
          secondTitle="Sent"
          onSwitchTag={onSwitchTag}
          currentTag={currentTag}
        />
        {renderContent()}
      </Stack>
    </>
  );
}
