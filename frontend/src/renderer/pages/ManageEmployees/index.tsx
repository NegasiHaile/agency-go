import {
  Box,
  Button,
  ButtonBase,
  Stack,
  TableCell,
  TableRow,
  Typography,
  useTheme,
 Alert,
} from '@mui/material';
import Dashboard from 'renderer/components/Dashboard';
import PageTopbar from 'renderer/components/PageTopbar';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import AddEmployeeModal from './AddEmployeeModal';
import useDataEmployees from './hooks/useData';
import Filter from 'renderer/components/Filter';
import FilterTable from 'renderer/components/Filter/FilterTable';
import Activated from 'renderer/assets/svg/ActivatedSvg';
import DeactivatedSvg from 'renderer/assets/svg/DeactivatedSvg';
import MenuButton from 'renderer/components/MenuButton';
import ResetPasswordModal from './components/ResetPasswordModal';
import AssignCreatorModal from './components/AssignCreatorModal';
import fetchReq from 'utils/fetch';
import useMutation from 'renderer/hooks/useMutation';
import AddSubGroupModal from './components/AddSubGroupModal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useFormAgencyGroup } from './hooks/useForm';
import GroupTreeData from './components/GroupTreeData';
import EditSubGroupModal from './components/EditSubGroupModal';
import DeleteSubGroupModal from './components/DeleteSubGroupModal';
import AddGroupToAgencyModal from './components/AddGroupToAgencyModal';
import PaginationPage from 'renderer/components/Pagination';

const employeesTableHeaders = [
  'Employees',
  'Assigned Creators',
  'Role',
  'Status',
  'Operations',
];

interface alertMessage {
  message:string,
  type:string|undefined,
}



export default function ManageEmployees() {

   const[alertMessage, setAlertMessage] = useState<alertMessage | null >(null)
   const[showAlert, setShowAlert] = useState<boolean>(false)

  const [OpenAddEmployee, setOpenAddEmployee] = useState(false);
  const [openAddSubGroupModal, setOpenAddSubGroupModal] = useState(false);
  const [openGroupToAgencyModal, setOpenGroupToAgencyModal] = useState(false);
  const [openEditSubGroupModal, setOpenEditSubGroupModal] = useState(false);
  const [openDeleteSubGroupModal, setOpenDeleteSubGroupModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [id, setId] = useState('');
  const [formType, setFormType] = useState<'add' | 'edit'>('add');
  const [openAssignCreatorModal, setOpenAssignCreatorModal] = useState(false);
  const [assigneeName, setAssigneeName] = useState<string>('');
  const [subGroups, setSubGroups] = useState([]);
  const [selectedValues, setSelectedValues] = useState<any>([]);

  const {
    agencies,
    refetch,
    employees,
    selectedEmployee,
    setSelectedEmployee,
    setEmployees,
    setSelectedAgency,
    selectedAgency,
    handleSearch,
    setCurrnetPage,
    totalEmployeesCount,
  } = useDataEmployees();
  const {
    selectedGroup,
    setSelectedGroup,
    groupName,
    setGroupName,
    setSelectedGroupId,
    selectedGroupId,
  } = useFormAgencyGroup();
  const [group, setGroup] = useState([]);
  const { mutate: mutateDelete } = useMutation({ key: 'delete-employee' });
  const { mutate: mutateActivate } = useMutation({ key: 'activate-employee' });
  const { mutate: mutateDeactivate } = useMutation({
    key: 'deactivate-employee',
  });

  const getSubGroupOptions = () => {
    const subGroupData = [
      { title: 'Add Sub Group', function: handleGroupToAgency },
      // { title: 'Edit', function: handleEditSubGroup },
      // { title: 'Delete', function: handleDeleteSubGroup },
    ];
    return subGroupData;
  };

  const handleGroupToAgency = () => {
    showSubGroups();
    setSelectedGroup('');
    setOpenGroupToAgencyModal(true);
  };
  const handleAddSubGroup = () => {
    showSubGroups();
    setOpenAddSubGroupModal(true);
  };
  const handleEditSubGroup = () => {
    showSubGroups();
    setOpenEditSubGroupModal(true);
  };
  const handleDeleteSubGroup = () => {
    showSubGroups();
    setOpenDeleteSubGroupModal(true);
  };
  const getOptions = (status: string) => {
    const tabData = [
      {
        title: status == 'active' ? 'Deactivate' : 'Activate',
        function: status == 'active' ? handleDeactivate : handleActivate,
      },
      { title: 'Delete', function: handleDelete },
      { title: 'Reset Password', function: resetPassword },
    ];

    const tabOnDeactive = [
      {
        title: 'Activate',
        function: handleActivate,
      },
      { title: 'Delete', function: handleDelete },
    ];
    return status === 'active' || status === 'inactive'
      ? tabData
      : tabOnDeactive;
  };

  const handleDeactivate = (id: any, status: any) => {
    mutateDeactivate(
      { id, status },
      {
        onSuccess: (resp) => {
          refetch();
        },
      }
    );
  };

  const handleActivate = (id: any, status: any) => {
    mutateActivate(
      { id, status },
      {
        onSuccess: (resp) => {
          refetch();
        },
      }
    );
  };
  const handleDelete = (id: any, activated: string) => {
    const endPoint = 'employee/' + id;
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
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const resetPassword = (id: string) => {
    setOpen(!open);
  };

  useEffect(() => {
    let endpoint = 'agency';
    let options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        setGroup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    refetch();
  }, [selectedAgency]);

  const handleClick = (id: string, email: string) => {
    setId(id);
    setEmail(email);
  };

  const handleResend = (id: string) => {
    console.log(id, 'id')
    let endpoint = `email/${id}`;
    let options = {
      method: 'POST' as 'POST',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        setAlertMessage({message:res?.data?.message, type:'success'})
        setShowAlert(true)
      })
      .catch((err) => {
        setAlertMessage({message:err, type:'error'})
        setShowAlert(true)
      });
  };

  const handleAlertClose = () =>{
    setShowAlert(false)
  }

  const showSubGroups = () => {
    let endpoint = 'agency/showgroup/' + selectedAgency?.id;
    let options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          console.log(res, 'agency sub groups')
          setSubGroups(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // const handleActivate = (id: string) => {
  //   const data = {
  //     to: email,
  //   };
  //   let endpoint = `email/${id}`;
  //   let options = {
  //     method: 'POST' as 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     withAuth: true,
  //     body: JSON.stringify(data),
  //   };
  //   fetchReq(endpoint, options)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log('Error occured: ', err);
  //     });
  // };

  const handleResetPassword = (id: string) => {
    setOpen(!open);
  };

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  const pageCount = useMemo(() => {
    if (totalEmployeesCount && totalEmployeesCount > 10) {
      return Math.ceil(totalEmployeesCount / 10);
    }
  }, [totalEmployeesCount]);

  const handleGetCurrentPage = (e: any, page: any) => {
    setCurrnetPage(page);
  };

  return (
    <Dashboard>
      <section className={styles.wrapper}>
        <PageTopbar>
          <Stack
            alignItems="center"
            direction="row"
            marginBottom="20px"
            width="100%"
            justifyContent="space-between"
          >
            <PageTopbar.HeaderText>Manage Employees</PageTopbar.HeaderText>
            <Box sx={{
                display: 'flex',
                marginLeft: 'auto',
                alignItems: 'center',
                gap: '15px',
              }}>
              {
                showAlert ?
                  <Alert severity={alertMessage?.type} onClose={handleAlertClose}>
                    {alertMessage?.message}
                  </Alert>
                  : ''
              }
               
            </Box>
            <Box
              sx={{
                display: 'flex',
                marginLeft: 'auto',
                alignItems: 'center',
                gap: '15px',
              }}
            >

              <Button
                variant="contained"
                onClick={() => {
                  setFormType('add');
                  setOpenAddEmployee(true);
                }}
                endIcon={
                  <AddIcon
                    sx={{ color: '#fff', marginTop: 0, fontSize: '14px' }}
                  />
                }
              >
                <Typography
                  style={{
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '14px',
                  }}
                >
                  Add Employee
                </Typography>
              </Button>
              {/* <PageTopbar.Button
                color="secondary"
                text="Batch Operations"
                endIcon={
                  <KeyboardArrowDown
                    sx={{ color: '#fff', marginTop: 0, fontSize: '14px' }}
                  />
                }
              /> */}
              {/* <PageTopbar.Button
                color="primary"
                text="Add Employee"
                onClick={() => setOpenAddEmployee(true)}
                endIcon={
                  <AddIcon
                    sx={{ color: '#fff', marginTop: 0, fontSize: '14px' }}
                  />
                }
              /> */}
            </Box>
          </Stack>
          <Stack
            flexDirection="row"
            gap="8px"
            sx={{
              position: 'absolute',
              bottom: 0,
              paddingBottom: '5px',
              paddingRight: '5px',
            }}
          >
            {group?.map((link: any, index: number) => (
              <>
                <PageTopbar.TabButtonWithIcon
                  key={index}
                  color="secondary"
                  text={link.agencyName}
                  tabData={getSubGroupOptions()}
                  startIconMenu={
                    <GroupTreeData
                      groupData={subGroups}
                      setSubGroups={setSubGroups}
                      selectedGroupId={selectedGroupId}
                      setSelectedGroupId={setSelectedGroupId}
                      showSubGroups={showSubGroups}
                      selectedGroup={selectedGroup}
                      setSelectedGroup={setSelectedGroup}
                      groupName={groupName}
                      setGroupName={setGroupName}
                      subGroups={subGroups}
                      selectedAgency={selectedAgency}
                      handleAddSubGroupFunction={handleAddSubGroup}
                      handleEditSubGroupFunction={handleEditSubGroup}
                      handleDeleteSubGroupFunction={handleDeleteSubGroup}
                    />
                  }
                  startIcon={
                    link.isSubGroup && (
                      <span>
                        <ArrowDropDownIcon sx={{ color: '#fff' }} />
                      </span>
                    )
                  }
                  endIcon={
                    <span>
                      <MoreVertIcon sx={{ fontSize: 15, color: '#fff' }} />
                    </span>
                  }
                  isActiveLink={link._id == selectedAgency?.id ? true : false}
                  onClick={() => {
                    setCurrnetPage(1);
                    setSelectedAgency({ id: link._id });
                  }}
                  isLink
                />
              </>
            ))}
          </Stack>
        </PageTopbar>

        <Stack direction="row" sx={{ height: '85%' }}>
          <Filter
            handleSearch={handleSearch}
            refetch={refetch}
            setCurrnetPage={setCurrnetPage}
          />
          <FilterTable
            isEmptyContent={!employees.length}
            tableHeaders={employeesTableHeaders}
            pagination={
              <PaginationPage
                count={pageCount}
                handleGetCurrentPage={handleGetCurrentPage}
              />
            }
          >
            <>
              {employees &&
                employees.map(
                  ({
                    name,
                    assignedCreatorsText,
                    role,
                    activated,
                    email,
                    roleRaw,
                    payRate,
                    commission,
                    id,
                    agencyId,
                    groupId,
                    payInterval,
                    shiftSchedular,
                    assignedCreatorsForDropdown,
                  }) => {
                    return (
                      <TableRow key={id}>
                        <TableCell
                          sx={{
                            borderColor: theme.palette.primary.contrastText,
                          }}
                          scope="row"
                        >
                          <Stack
                            spacing={1}
                            direction="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="h6"
                              fontSize="18px"
                              color={
                                activated === 'deactivate'
                                  ? 'gray'
                                  : isDarkTheme
                                  ? '#fff'
                                  : '#000'
                              }
                            >
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderColor: theme.palette.primary.contrastText,
                            color: '#fff',
                            width: '300px',
                          }}
                          onClick={() => {
                            setAssigneeName(name);
                            setId(id);
                            if (activated === 'deactivate') {
                              setOpenAssignCreatorModal(false);
                            } else {
                              setOpenAssignCreatorModal(
                                !openAssignCreatorModal
                              );
                              setSelectedValues(assignedCreatorsForDropdown);
                            }
                          }}
                        >
                          <Typography
                            color={
                              activated === 'deactivate'
                                ? 'gray'
                                : isDarkTheme
                                ? '#fff'
                                : '#000'
                            }
                          >
                            {assignedCreatorsText}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderColor: theme.palette.primary.contrastText,
                            color: '#fff',
                          }}
                        >
                          <Typography
                            color={
                              activated === 'deactivate'
                                ? 'gray'
                                : isDarkTheme
                                ? '#fff'
                                : '#000'
                            }
                          >
                            {role}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderColor: theme.palette.primary.contrastText,
                          }}
                        >
                          {activated === 'deactivate' && <DeactivatedSvg />}
                          {activated === 'active' && <Activated />}
                          {activated === 'inactive' && (
                            <Box
                              display={'flex'}
                              gap={'10px'}
                              alignItems={'center'}
                            >
                              <Typography color="yellow">Inactive</Typography>
                              <Typography
                                color={'#04A1FF'}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleResend(id)}
                              >
                                Resend
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderColor: theme.palette.primary.contrastText,
                          }}
                        >
                          <Stack
                            spacing={1}
                            direction="row"
                            alignItems="center"
                          >
                            {activated === 'active' ? (
                              <>
                                <ButtonBase
                                  onClick={() => {
                                    setSelectedEmployee({
                                      name,
                                      role: roleRaw,
                                      email,
                                      id,
                                      agencyId,
                                      payRate,
                                      commission,
                                      payInterval,
                                      shiftSchedular,
                                      assignedCreatorsForDropdown,
                                    });
                                    setFormType('edit');
                                    setOpenAddEmployee(true);
                                  }}
                                >
                                  <Typography variant="body1">Edit</Typography>
                                </ButtonBase>
                                <ButtonBase>
                                  <Typography variant="body1">
                                    <Box onClick={() => handleClick(id, email)}>
                                      <MenuButton
                                        title="More"
                                        tabData={getOptions(activated)}
                                        id={id}
                                        status={activated}
                                      />
                                    </Box>
                                  </Typography>
                                </ButtonBase>
                              </>
                            ) : (
                              <>
                                {/* <ButtonBase
                                  onClick={() => handleDelete(id, activated)}
                                >
                                  <Typography
                                    variant="body1"
                                    color={
                                      activated === 'deactivate'
                                        ? 'gray'
                                        : isDarkTheme
                                        ? 'red'
                                        : '#000'
                                    }
                                  >
                                    Delete
                                  </Typography>
                                </ButtonBase> */}
                                <ButtonBase>
                                  <MenuButton
                                    title="More"
                                    tabData={getOptions(activated)}
                                    id={id}
                                    status={activated}
                                  />
                                </ButtonBase>
                              </>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
            </>
          </FilterTable>
          {open && (
            <ResetPasswordModal
              open={open}
              setOpen={setOpen}
              email={email}
              id={id}
            />
          )}
          {openAssignCreatorModal && (
            <AssignCreatorModal
              name={assigneeName}
              open={openAssignCreatorModal}
              setOpen={setOpenAssignCreatorModal}
              refetch={refetch}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              id={id}
            />
          )}
        </Stack>
      </section>
      <AddEmployeeModal
        open={OpenAddEmployee}
        setOpen={setOpenAddEmployee}
        refetch={refetch}
        type={formType}
        selectedEmployee={selectedEmployee}
        selectedAgency = {selectedAgency}
      />
      <AddGroupToAgencyModal
        setSubGroups={setSubGroups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        subGroups={subGroups}
        open={openGroupToAgencyModal}
        setOpen={setOpenGroupToAgencyModal}
        selectedAgency={selectedAgency}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
        showSubGroups={showSubGroups}
      />
      <AddSubGroupModal
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        subGroups={subGroups}
        open={openAddSubGroupModal}
        setOpen={setOpenAddSubGroupModal}
        selectedAgency={selectedAgency}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
        showSubGroups={showSubGroups}
        setSubGroups={setSubGroups}
      />
      <EditSubGroupModal
        open={openEditSubGroupModal}
        setOpen={setOpenEditSubGroupModal}
        selectedGroupId={selectedGroupId}
        showSubGroups={showSubGroups}
        selectedGroup={selectedGroup}
      />
      <DeleteSubGroupModal
        open={openDeleteSubGroupModal}
        setOpen={setOpenDeleteSubGroupModal}
        selectedGroupId={selectedGroupId}
        showSubGroups={showSubGroups}
      />
    </Dashboard>
  );
}
