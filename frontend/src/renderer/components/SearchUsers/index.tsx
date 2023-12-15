import { useContext, useEffect, useState } from 'react';
import SearchInput from 'renderer/components/SearchInput';
import UserCardWImage from 'renderer/components/UserCardWImage';
import styles from './styles.module.css';
import { useTheme } from '@mui/material';

import ProfilePic from 'renderer/assets/png/profile.jpg';
import { MyInvoiceContext } from 'renderer/pages/Accounting/Invoicing/context/context';
import { agencyCreatorSplit, randomNumber } from 'renderer/pages/Accounting/Invoicing';

interface Props {
  allUsers: [];
  getUsers: ()=>{}
}

export default function SearchUsers({allUsers, getUsers}: Props) {
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any>(allUsers);
  const {data, setData } = useContext< any | [] >([]);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  useEffect(()=>{
    setFilteredUsers(allUsers??[])
    const length = allUsers?.length;
    if (length > 0) {
      // Automatically set the first user in the list as the default selected user
      setData((prevData: any) => ({
        ...prevData
      }))
    }
  }, [allUsers])

  const onSearch = (value: string) => {
    setSearch(value);
    if (value === '') {
      // If the search value is empty, show all users
      setFilteredUsers(allUsers??[]);
    } else {
      // Filter the users based on the search input
      const usersFromSearch = allUsers.filter((item: any) => {
        return item.firstName.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredUsers(usersFromSearch);
    }
  };


  return (
    <aside
      className={styles.aside}
      style={{
        backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
        borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
        height:"75vh"
      }}
    >
      <div className={styles.search}>
        <SearchInput
          value={search}
          onUpdateSearch={onSearch}
          onSearch={() => {}}
        >
          <SearchInput.ReloadButton onRefresh={getUsers} />
        </SearchInput>
      </div>
      {filteredUsers.map((item: any, index: any) => (
      <div style={{ background: item?._id === data?._id ? '#04A1FF' : '' }} key={item?._id} >
        <UserCardWImage
          data={item}
          id={item._id}
          name={`${item?.firstName} ${item?.lastName}`}
          notificationCount={item?.notificationCount}
          messageCount={item?.messageCount}
          key={item?._id} // Use a unique key, such as _id
          profileImage={''}
          selected={false}
          autoRelink={false}
          onClick={()=> 
            {setData({
              ...item, 
              currentModalBalance: item?.currentModalBalance?? randomNumber(25000, 1000),
              agencyPer: item?.agencyPer?? agencyCreatorSplit()
            });
            console.log("Selected creator:", item)}}
          />
        </div>
      ))}
    </aside>
  );
}