import fetchReq from 'utils/fetch';

// Create Attendance
async function createTimeline(payload: any) {
  try {
    const endPoint = 'timeline/create';
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

// Get Emp Attendance
async function getAllTimlineData(date) {
  try {
    let endPoint = ``;
    if (date !== null) {
      endPoint = `timeline/getTimelineData/${date}`;
    } else {
      endPoint = `timeline/getTimelineData`;
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
async function getAllTimlineDataAll() {
  try {
    const endPoint = `timeline/getTimelineDataAll`;
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

export { createTimeline, getAllTimlineData, getAllTimlineDataAll };
