import Dashboard from 'renderer/components/Dashboard';
import SearchInput from 'renderer/components/SearchInput';
import { useState, useEffect } from 'react';
import managers from 'renderer/utils/managerSuiteConstant';
import UserCardWImage from 'renderer/components/UserCardWImage';
import SectionHeader from 'renderer/components/Dashboard/components/SectionHeader';
import EmployeeShiftsBox from 'renderer/components/Dashboard/components/EmployeeShifts';
import styles from './styles.module.css';
import localisation from '../../components/localisation.json';
import AddShifts from './addShifts';
import fetchReq from 'utils/fetch';
import { Router } from 'react-router-dom';

export default function EmployeeShifts() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    getCreatorData();
  }, []);
  const onSearch = (value: string) => {
    setSearch(value);
  };
  const getCreatorData = () => {
    const endPoint = 'shifts';
    const options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endPoint, options)
      .then((responce) => responce.json())
      .then((res) => {
        setCreators(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dashboard>
      <section className={styles.wrapper}>
        <SectionHeader
          title={localisation.employeeShifts}
          openModal={setOpen}
        />
        <div className={styles.innerWrapper}>
          {/* <aside className={styles.aside}>
            <div className={styles.search}>
              <SearchInput
                value={search}
                onUpdateSearch={onSearch}
                onSearch={() => {}}
              >
                <SearchInput.ReloadButton onRefresh={() => {}} />
              </SearchInput>
            </div>
            {employee.map(
              ({ name, profileImage, notificationCount, messageCount }) => (
                <UserCardWImage
                  name={name}
                  profileImage={''}
                  notificationCount={1}
                  messageCount={1}
                  key={name}
                />
              )
            )}
          </aside> */}
          <EmployeeShiftsBox employees={creators} />
        </div>
      </section>
      <AddShifts
        open={open}
        type={type}
        setOpen={setOpen}
        refetch={getCreatorData}
      />
    </Dashboard>
  );
}
