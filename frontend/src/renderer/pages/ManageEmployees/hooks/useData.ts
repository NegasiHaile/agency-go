import { ReactNode, useEffect, useState } from 'react';
import useQuery from 'renderer/hooks/useQuery';
import fetchReq from 'utils/fetch';

interface IAgencyList {
  text: string;
  isActive: boolean;
}
interface ISelectedAgency {
  id: string;
}

interface IEmployeeList {
  name: string;
  imageSrc: string;
  assignedCreatorsText: ReactNode;
  role: string;
  activated: string;
  // activated: boolean;
  email: string;
  roleRaw: string;
  id: string;
  agencyId: string;
  groupId?: string;
  commission:number;
  payRate:number;
  payInterval:string;
  shiftSchedular:string;
  assignedCreatorsForDropdown: IAssignedCreatorsToEmployee[];
}

const ROLE = {
  admin: 'Admin',
  manager: 'Manager',
  employee: 'employee',
};

export interface IAssignedCreatorsToEmployee {
  id: string;
  name: string;
}

export interface ISelectedEmployee {
  name: string;
  email: string;
  role: string;
  id: string;
  agencyId: string;
  payRate:number;
  commission:number;
  payInterval:string;
  shiftSchedular:string;
  assignedCreatorsForDropdown: IAssignedCreatorsToEmployee[];
}

const useDataEmployees = () => {
  const [agencies, setAgencies] = useState<IAgencyList[]>([]);
  const [employees, setEmployees] = useState<IEmployeeList[]>([]);
  const [totalEmployeesCount, setTotalEmployeesCount]= useState<number>()
  const [selectedEmployee, setSelectedEmployee] =
    useState<ISelectedEmployee | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<ISelectedAgency | null>({
    id: localStorage.getItem('AgencyId') ?? '',
  });
  const { isLoading, data, refetch, setData,setCurrnetPage,currentPage ,paginationLimit } = useQuery({
    key: 'get-employee',
    params: selectedAgency,
  });
  
  console.log(selectedEmployee)

  useEffect(() => {
    // window.electron.ipcRenderer
    //   .invoke('get-store', 'agency')
    //   .then((res) => {
    //     const result = {
    //       text: res?.agencyName || '',
    //       isActive: true,
    //     };
    //     return setAgencies([result]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const handleSearch = (data: any) => {
    data.agencyId=selectedAgency?.id
    const queryString = Object.keys(data)
      .map((key) => `${key}=${(data[key])}`)
      .join('&');

    let endpoint = `employee/search/data?${queryString}&page=${currentPage}&limit=${paginationLimit}`;
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
        setData(res);
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  };

  useEffect(() => {
    if (data?.data) {
      const employeesRes = data?.data?.employees?.map((item: any) => {
        const tempAssignedCreators = Array.isArray(item.creatorDetail)
          ? Array.from(item.creatorDetail)
          : []; 
           
        return {
          name: item?.name || '',
          assignedCreatorsForDropdown: tempAssignedCreators.length
          ? tempAssignedCreators.map((ta:any) => ta._id):[],
          assignedCreatorsText: tempAssignedCreators.length
            ? tempAssignedCreators.map((ta:any) => ta?.creatorName).join(', ')
            : '+ Please click to set',
          role: item?.role
            ? ROLE[item?.role as 'admin' | 'manager' | 'employee'] || ''
            : '',
          activated: item?.status,
          payRate:item?.payRate,
          commission:item?.commission,
          email: item?.email || '',
          roleRaw: item?.role || '',
          shiftSchedular:item?.shiftSchedular||'',
          payInterval:item?.payInterval||'',
          // eslint-disable-next-line no-underscore-dangle
          id: item?._id || '',
          agencyId: item?.agencyId,
        };
      });
      setEmployees(employeesRes || []);
      setTotalEmployeesCount(data?.data?.totalDocument)
    }
  }, [data,data?.data]);
  
  
  
  
  return {
    isLoading,
    data,
    agencies,
    refetch,
    employees,
    selectedEmployee,
    setEmployees,
    selectedAgency,
    setSelectedAgency,
    setSelectedEmployee,
    handleSearch,
    setCurrnetPage,
    totalEmployeesCount
  };
};

export default useDataEmployees;
