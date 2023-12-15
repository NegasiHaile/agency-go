import { ipcMain } from 'electron';
import Store from 'electron-store';
import fetchReq from '../utils/fetch';

// const EmpoloyeeServices = () => {
// ipcMain.on('get-employee-request', async (e) => {
//   try {
//     const store = new Store();
//     const agency: any = store.get('agency');
//     if (!agency) {
//       e.reply('get-employee-error', { error: true, message: 'No agency' });
//     }
//     // eslint-disable-next-line no-underscore-dangle
//     const agencyId = agency?._id;
//     const response = await fetch(`employees/${agencyId}`, {
//       method: 'GET',
//       withAuth: true,
//     });
//     const responseJson = await response.json();
//     e.reply('get-employee-response', responseJson);
//   } catch (error: any) {
//     e.reply('get-employee-error', { error: true, message: error?.message });
//   }
// });

// ipcMain.on('create-employee-request', async (e, arg) => {
//   try {
//     const { name, email, role, agencyId } = arg;
//     const payload = {
//       name,
//       email,
//       role,
//     };
//     const response = await fetch(`employee/${agencyId}`, {
//       method: 'POST',
//       body: JSON.stringify(payload),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       withAuth: true,
//     });
//     const responseJson = await response.json();
//     e.reply('create-employee-response', responseJson);
//   } catch (error: any) {
//     e.reply('create-employee-error', {
//       error: true,
//       message: error?.message,
//     });
//   }
// });

// ipcMain.on('update-employee-request', async (e, arg) => {
//   try {
//     const { id, name, role, agencyId, email } = arg;
//     const payload = {
//       name,
//       role,
//       email,
//       agencyId,
//     };
//     const response = await fetch(`employee/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(payload),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       withAuth: true,
//     });
//     const responseJson = await response.json();
//     e.reply('update-employee-response', responseJson);
//   } catch (error: any) {
//     e.reply('update-employee-error', {
//       error: true,
//       message: error?.message,
//     });
//   }
// });

// ipcMain.on('delete-employee-request', async (e, arg) => {
//   try {
//     const { id } = arg;
//     const response = await fetch(`employee/${id}`, {
//       method: 'DELETE',
//       withAuth: true,
//     });
//     const responseJson = await response.json();
//     e.reply('delete-employee-response', responseJson);
//   } catch (error: any) {
//     e.reply('delete-employee-error', {
//       error: true,
//       message: error?.message,
//     });
//   }
// });
// async function createEmployee(data: any) {
//   const endPoint = 'employee/' + data.agencyId;
//   const options = {
//     method: 'POST' as 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     withAuth: true,
//     body: JSON.stringify(data),
//   };
//   let responce = await fetchReq(endPoint, options);
//   let resp = responce.json();
//   return resp;
// }

async function updateEmployee(data: any) {
  const endPoint = 'employee/' + data.id;
  const options = {
    method: 'PUT' as 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    withAuth: true,
    body: JSON.stringify(data),
  };
  let responce = await fetchReq(endPoint, options);
  let resp = await responce.json();
  return resp;
}
async function activateEmployee(data: any) {
  const endPoint = 'employee/' + data.id;
  const bodyData = {
    status: 'active',
  };
  const options = {
    method: 'PATCH' as 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    withAuth: true,
    body: JSON.stringify(bodyData),
  };
  let responce = await fetchReq(endPoint, options);
  let resp = await responce.json();
  return resp;
}
async function dectivateEmployee(data: any) {
  const endPoint = 'employee/' + data.id;

  const bodyData = {
    status: 'deactivate',
  };
  const options = {
    method: 'PATCH' as 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    withAuth: true,
    body: JSON.stringify(bodyData),
  };
  let responce = await fetchReq(endPoint, options);
  let resp = await responce.json();
  return resp;
}
const EmpoloyeeServices = {
  // createEmployee,
  updateEmployee,
  activateEmployee,
  dectivateEmployee,
};

export default EmpoloyeeServices;
