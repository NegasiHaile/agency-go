import { URLSearchParams } from 'url';
import fetchReq from 'utils/fetch';

// Create Attendance
async function createAttendance(payload: any) {
  try {
    const endPoint = 'attendence/create';
    const options = {
      method: 'POST' as 'POST',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify(payload),
    };
    let response = await fetchReq(endPoint, options);
    return response.json();
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

// Update Attendance
async function updateAttendance(payload: any, attId: String) {
  const endPoint = `attendence/update/empAttendance/${attId}`;
  const options = {
    method: 'PUT' as 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    withAuth: true,
    body: JSON.stringify(payload),
  };
  let responce = await fetchReq(endPoint, options);
  let resp = await responce.json();
  return resp;
}

// Update Notes
async function updateNotes(payload: { notes: string }, attId: String) {
  const endPoint = `attendence/update/notes/${attId}`;
  const options = {
    method: 'PATCH' as 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    withAuth: true,
    body: JSON.stringify(payload),
  };
  let responce = await fetchReq(endPoint, options);
  let resp = await responce.json();
  return resp;
}

// Get Emp Attendance
async function getEmpAttendance(startDate, endDate) {
  try {
    let endPoint = ``;
    if (startDate !== null && endDate !== null) {
      endPoint = `attendence/getAttendanceByEmpId/${startDate}/${endDate}`;
    } else {
      endPoint = `attendence/getAttendanceByEmpId`;
    }
    const options = {
      method: 'GET' as 'GET',
      withAuth: true,
    };
    let responce = await fetchReq(endPoint, options);
    let resp = await responce.json();
    return resp;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

// Get Emp Attendance
async function getEmpAttendanceAll() {
  try {
    const endPoint = `attendence/getAttendanceAll`;
    const options = {
      method: 'GET' as 'GET',
      withAuth: true,
    };
    let responce = await fetchReq(endPoint, options);
    let resp = await responce.json();
    return resp;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

// Get All Attendance
async function getAllTimeSheets() {
  try {
    let endPoint = `attendence/getTodaysTimsheets`;
    const options = {
      method: 'GET' as 'GET',
      withAuth: true,
    };
    let responce = await fetchReq(endPoint, options);
    let resp = await responce.json();
    return resp;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

// filter data
async function getAttendanceByFilter(startDate, endDate, isEmp) {
  try {
    const filter = {
      startDate,
      endDate,
      isEmp,
    };

    let endPoint = `attendence/getAttendanceByFilter?${Object.keys(filter)
      .map((key) => {
        return `${key}=${encodeURIComponent(filter[key])}`;
      })
      .join('&')}`;

    // if ((startDate !== null && endDate !== null) || isEmp) {
    //   endPoint = `attendence/getAttendanceByFilter?${startDate}/${endDate}`;
    // } else {
    //   endPoint = `attendence/getAttendanceByFilter?`;
    // }
    const options = {
      method: 'GET' as 'GET',
      withAuth: true,
    };
    let responce = await fetchReq(endPoint, options);
    let resp = await responce.json();
    return resp;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

// Update timeSheet
async function updateTimesheet(payload: any, attId: String) {
  const endPoint = `attendence/update/timesheet/${attId}`;
  const options = {
    method: 'PATCH' as 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    withAuth: true,
    body: JSON.stringify(payload),
  };
  let responce = await fetchReq(endPoint, options);
  let resp = await responce.json();
  return resp;
}

// Get Emp Attendance
async function deleteById(attendanceId) {
  try {
    const endPoint = `attendence/delete/timesheet/${attendanceId}`;

    const options = {
      method: 'DELETE' as 'DELETE',
      withAuth: true,
    };
    let responce = await fetchReq(endPoint, options);
    let resp = await responce.json();
    return resp;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

// Get Emp Attendance
async function getAttendanceById(attendanceId) {
  try {
    const endPoint = `attendence/getAttendance/${attendanceId}`;
    const options = {
      method: 'GET' as 'GET',
      withAuth: true,
    };
    let responce = await fetchReq(endPoint, options);
    let resp = await responce.json();
    return resp;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export {
  createAttendance,
  updateAttendance,
  getEmpAttendance,
  getAllTimeSheets,
  updateNotes,
  getEmpAttendanceAll,
  getAttendanceByFilter,
  updateTimesheet,
  deleteById,
  getAttendanceById,
};
