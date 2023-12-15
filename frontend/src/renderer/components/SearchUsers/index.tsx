import { useEffect, useState } from 'react';
import SearchInput from 'renderer/components/SearchInput';
import managers from 'renderer/utils/managerSuiteConstant';
import UserCardWImage from 'renderer/components/UserCardWImage';
import styles from './styles.module.css';
import { useTheme } from '@mui/material';
import useQuery from 'renderer/hooks/useQuery';

import ProfilePic from 'renderer/assets/png/profile.jpg';

export default function SearchUsers() {
  const [search, setSearch] = useState('');
  const { isLoading, data } = useQuery({ key: 'get-creator' });
  const [selectedCreator, setSelectedCreator] = useState('');
  const [allUsers, setAllUsers] = useState<any>([]);

  const onSearch = (value: string) => {
    setSearch(value);

    if (value === '') {
      // If the search value is empty, show all users
      setAllUsers(allUsers);
    } else {
      // Filter the users based on the search input
      const filteredUsers = allUsers.filter((item: any) => {
        return item.firstName.toLowerCase().includes(value.toLowerCase());
      });
      setAllUsers(filteredUsers);
    }
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const handleCreatorSelection = (creator: any) => {
    setSelectedCreator(creator);
  };

  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data?.data);
        console.log(data, 'get user Data');
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    // Fetch all users when the component mounts
    getUsers();
  }, []);


   const [selectName,setSelectName]=useState<any>('')


  return (
    <aside
      className={styles.aside}
      style={{
        backgroundColor: isDarkTheme ? '#0C0C0C' : '#fff',
        borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
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
      {allUsers.map((item: any, index: any) => (
      <div style={{ background: item?.firstName === selectName ? '#04A1FF' : '' }} key={item?._id} >
        <UserCardWImage
          data={item}
          id={item._id}
          name={`${item?.firstName} ${item?.lastName}`}
          notificationCount={item?.notificationCount}
          messageCount={item?.messageCount}
          key={item?._id} // Use a unique key, such as _id
          profileImage={''}
          selected={false}
          onClick={() => {}}
          autoRelink={false}
          selectName={setSelectName}
          />
          </div>
      ))}
    </aside>
  );
}
