import { Avatar, Stack, Typography } from '@mui/material';
import styles from './styles.module.css';
import PageAside from 'renderer/components/PageAside';
import SearchInput from 'renderer/components/SearchInput';
import { useState } from 'react';
import CreateConversationModal from './components/CreateConversationModal';

function AllUserDataMessage(props: any) {
  const [isOpenNewConvModal, setIsOpenNewConvModal] = useState(false);
  return (
    <>
      <PageAside className={styles.pageAsideDiv}>
        <div className={styles.search}>
          <SearchInput
            value={props.searchTxt}
            onUpdateSearch={() => props.setSearchTxt()}
            onSearch={() => {}}
          />
          <SearchInput.ReloadButton
            onRefresh={() => props.getAllConversationList()}
          />
          <SearchInput.NewConvButton
            onClick={() => setIsOpenNewConvModal((prevOpen) => !prevOpen)}
          />
        </div>
        <div style={{ cursor: 'pointer' }}>
          {props?.conversationList?.map((data: any, index: any) => {
            return (
              <Stack
                key={index}
                direction="row"
                flexShrink={0}
                flexWrap="wrap"
                className={styles.card}
                onClick={() => props.handleConversation(data)}
              >
                <Avatar />

                <Typography
                  variant="h3"
                  color="#fff"
                  fontSize={'14px'}
                  fontWeight={500}
                >
                  {data.friendlyName}
                </Typography>
              </Stack>
            );
          })}
        </div>
      </PageAside>
      {isOpenNewConvModal && (
        <CreateConversationModal
          open={isOpenNewConvModal}
          setOpen={setIsOpenNewConvModal}
          getAllConversationList={props.getAllConversationList}
        />
      )}
    </>
  );
}

export default AllUserDataMessage;
