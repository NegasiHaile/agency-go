import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Popover,
  Stack,
  TableCell,
  TableRow,
  useTheme,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';
import SearchInput from 'renderer/components/SearchInput';

import FilterTable from 'renderer/components/Filter/FilterTable';
import theme from 'renderer/styles/muiTheme';
import AddRoleModal from './AddRoleModal';
import AvatarSvg from 'renderer/assets/svg/AvatarSvg';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import classes from './styles.module.css';
import RoleManager from './Manager';
import fetchReq from 'utils/fetch';

interface $roleData {
  id?: string;
  rolename?: string;
  description?: string;
}

const statusMenu = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  {
    label: 'Active',
    value: 'active',
  },
];





const CustomButton = styled(Button)(() => ({

  
  borderRadius: '8px', // Adjust the border radius,
  padding: '8px 16px',
 
 
  textTransform: 'none', // Prevent text from being uppercase,
  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
 
}));

const CustomIconButton = styled(IconButton)(() => ({
  color: 'white',
}));

const employeesTableHeaders = ['Role', 'Users', 'Status', 'Operations'];

const employeesTableData: any[] = [
  // {
  //   name: 'Joan Adams',
  //   status: 'Active',
  //   role: 'Admin',
  //   activated: true,
  // },
  // {
  //   name: 'Chris Jean-Baptiste',
  //   status: 'Inactive',
  //   role: 'Manager',
  //   activated: true,
  // },
  // {
  //   name: 'Joan Adams',
  //   status: 'Active',
  //   role: 'Employee',
  //   activated: false,
  // },
];

interface TabProps {
  handleTabChange: (name: string) => void;
}

function RoleLanding(props: TabProps) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';


  function Options(props: any) {
    const { menu, handlePopoverClose, type } = props;
    return (
      <div className={classes.optionWrapper} onMouseLeave={handlePopoverClose}>
        {menu.map((menuItem: any, index: any) => (
          <NavLink
            onClick={() => {
              doSearch(menuItem, type);
            }}
            to={'#'}
            className={classes.optionItem}
            key={menuItem.label}
          >
            {menuItem.label}
          </NavLink>
        ))}
      </div>
    );
  }

  const { handleTabChange } = props;
  const [searchText, setSearchText] = useState('');
  const [anchorElRoleName, setAnchorElRoleName] =
    React.useState<HTMLButtonElement | null>(null);
  const [roleList, setRoleList] = useState<{ label: string; value: string }[]>(
    []
  );
  const [anchorElStatus, setAnchorElStatus] =
    React.useState<HTMLButtonElement | null>(null);
  const [role, setRoles] = useState([]);
  const [roleData, setRoleData] = useState<$roleData | null>(null);
  useEffect(() => {
    getRoles();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('add');

  const doSearch = (item: any, type: string) => {
    const endPoint = `roles/search/data?${type}=${item.value}`;
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
        setRoles(res.data);
        setAnchorElRoleName(null);
        setAnchorElStatus(null);
      })
      .catch((error) => console.log(error));
  };

  const handleStatusChange = (id: string, state: string) => {
    const endPoint = `roles/${id}`;
    let data = {
      status: '',
    };
    if (state === 'active') {
      data.status = 'inactive';
    } else {
      data.status = 'active';
    }
    let options = {
      method: 'PATCH' as 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify(data),
    };
    fetchReq(endPoint, options)
      .then((responce) => responce.json())
      .then((res) => {
        getRoles();
      })
      .catch((err) => console.log(err));
  };
  const getRoles = () => {
    const endPoint = 'roles';
    let options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endPoint, options)
      .then((responce) => responce.json())
      .then((res) => {
        setRoleList([{ label: 'All', value: '' }]);
        res.data.map((item: any) => {
          setRoleList((previousdata) => [
            ...previousdata,
            { label: item.rolename, value: item.rolename },
          ]);
        });
        setRoles(res.data);
      })
      .catch((err) => {
        console.log('error trying to fetch role: ', err);
      });
  };

  const handleRoleDelete = (id: string) => {
    const endPoint = `roles/${id}`;
    const options = {
      method: 'DELETE' as 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endPoint, options)
      .then((responce) => responce.json())
      .then((res) => {
        getRoles();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRoleNameClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElRoleName(event.currentTarget);
  };

  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElStatus(event.currentTarget);
  };

  const handleRoleNameClose = () => {
    setAnchorElRoleName(null);
  };

  const handleStatusClose = () => {
    setAnchorElStatus(null);
  };

  const rolePopoverOpen = Boolean(anchorElRoleName);
  const roleNameId = rolePopoverOpen ? 'role-name' : undefined;

  const statusPopoverOpen = Boolean(anchorElStatus);
  const statusId = statusPopoverOpen ? 'status-name' : undefined;

  const handleRowClick = (name: string) => {
    if (name === 'Manager') {
      handleTabChange('RoleManager');
    }
  };
  const handleOnSubmit = (data: any, type: string) => {
    if (type === 'add') {
      const endpont = 'roles';
      const options = {
        method: 'POST' as 'POST',
        headers: {
          'content-type': 'application/json',
        },
        withAuth: true,
        body: JSON.stringify(data),
      };
      fetchReq(endpont, options)
        .then((responce) => responce.json())
        .then((res) => {
          getRoles();
        })
        .catch((error) => console.log(error));
    } else {
      const endPoint = `roles/${data.id}`;
      const options = {
        method: 'PATCH' as 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        withAuth: true,
        body: JSON.stringify(data),
      };
      fetchReq(endPoint, options)
        .then((responce) => responce.json())
        .then((res) => {
          getRoles();
        })
        .catch((error) => console.log(error));
    }

    setRoleData(null);
  };
  return (
    <div className={classes.roleWrapper}>
      <div className={classes.titleWrapper}>
        <div className={classes.headingText}>Role Management</div>
        <Button
          variant="contained"
          sx={{ color: 'white' }}
          onClick={() => {
            setRoleData(null);
            setModalType('add');
            setIsOpen(true);
          }}
        >
          Add role
        </Button>
      </div>

      <div className={classes.cardWrapper}>
        <div className={classes.headerWrapper}>
          <div className={classes.buttonWrapper}>
            <CustomButton
              aria-describedby={roleNameId}
              variant="contained"
              onClick={handleRoleNameClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                backgroundColor: isDarkTheme ? '#0F0F0F' : '#fff', // Set the background color
                '&:hover': {
                  backgroundColor: '#292929',
                },
                color: isDarkTheme ? '#fff' : '#000',
                border: '1px solid ',
                borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
              }}
            >
              Role Name
            </CustomButton>
            <Popover
              id={roleNameId}
              open={rolePopoverOpen}
              anchorEl={anchorElRoleName}
              onClose={handleRoleNameClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Options
                menu={roleList}
                handleClose={handleRoleNameClose}
                type={'searchTerm'}
              />
            </Popover>
            <CustomButton
              aria-describedby={statusId}
              variant="contained"
              onClick={handleStatusClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                backgroundColor: isDarkTheme ? '#0F0F0F' : '#fff', // Set the background color
                '&:hover': {
                  backgroundColor: '#292929',
                },
                color: isDarkTheme ? '#fff' : '#000',
                border: '1px solid ',
                borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
              }}
            >
              Status
            </CustomButton>
            <Popover
              id={statusId}
              open={statusPopoverOpen}
              anchorEl={anchorElStatus}
              onClose={handleStatusClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Options
                menu={statusMenu}
                handleClose={handleStatusClose}
                type={'status'}
              />
            </Popover>
            <CustomButton
              //   aria-describedby={id}
              variant="contained"
              //   onClick={handleClick}
              startIcon={<FilterListIcon />}
              sx={{
                backgroundColor: isDarkTheme ? '#0F0F0F' : '#fff', // Set the background color
                '&:hover': {
                  backgroundColor: '#292929',
                },
                color: isDarkTheme ? '#fff' : '#000',
                border: '1px solid ',
                borderColor: isDarkTheme ? '#292929' : '#EAF1FF',
              }}
            >
              Filters
            </CustomButton>
          </div>
          <div className={classes.inputWrapper}>
            <SearchInput
              onSearch={() => {}}
              onUpdateSearch={(v) => setSearchText(v)}
              value={searchText}
              placeholder="Search employee name"
            />
          </div>
        </div>
      </div>

      <FilterTable tableHeaders={employeesTableHeaders}>
        <>
          {role.map(({ rolename, status, _id, description }, index) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              onClick={() => handleRowClick(rolename)}
            >
              <TableCell
                sx={{
                  borderColor: theme.palette.primary.contrastText,
                  color: '#fff',
                }}
                scope="row"
              >
                {rolename}
              </TableCell>
              <TableCell
                sx={{
                  borderColor: theme.palette.primary.contrastText,
                }}
              >
                <Stack spacing={4} direction="row" alignItems="center">
                  <AvatarSvg />
                  <div className={classes.showUserText}>Show users</div>
                </Stack>
              </TableCell>

              <TableCell
                sx={{
                  borderColor: theme.palette.primary.contrastText,
                }}
              >
                {status === 'active' ? (
                  <Chip label="Active" color="success" variant="outlined" />
                ) : (
                  <Chip
                    label="Inactive"
                    variant="outlined"
                    sx={{
                      border: '1px solid #750BB7',
                      color: '#750BB7',
                    }}
                  />
                )}
              </TableCell>
              <TableCell
                sx={{
                  borderColor: theme.palette.primary.contrastText,
                }}
                align="right"
              >
                <Stack spacing={1} direction="row" alignItems="center">
                  <div
                    className={
                      status === 'active'
                        ? classes.deactivateTextCss
                        : classes.activateTextCss
                    }
                    onClick={() => {
                      handleStatusChange(_id, status);
                    }}
                  >
                    {status === 'active' ? 'Deactivate' : 'Activate'}
                  </div>
                  <CustomIconButton
                    aria-label="delete"
                    sx={{ color: 'white' }}
                    onClick={() => {
                      handleRoleDelete(_id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon sx={{ color: 'white' }} />
                  </CustomIconButton>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => {
                      setRoleData({
                        id: _id,
                        rolename,
                        description,
                      });
                      setModalType('edit');
                      setIsOpen(true);
                    }}
                  >
                    <EditOutlinedIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </>
      </FilterTable>
      <AddRoleModal
        type={modalType}
        open={isOpen}
        setOpen={setIsOpen}
        handleOnSubmit={handleOnSubmit}
        value={roleData}
      />
    </div>
  );
}

function Role() {
  const [activeTab, setActiveTab] = useState('Role');

  const renderTab = (
    tabName: string,
    handleTabChange: (name: string) => void
  ) => {
    switch (tabName) {
      case 'Role':
        return <RoleLanding handleTabChange={handleTabChange} />;
      case 'RoleManager':
        return <RoleManager handleTabChange={handleTabChange} />;

      default:
        return <h5>Not found</h5>;
    }
  };

  const handleTabChange = (name: string) => {
    setActiveTab(name);
  };

  return <>{renderTab(activeTab, handleTabChange)}</>;
}

export default Role;
