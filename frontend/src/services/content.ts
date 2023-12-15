import fetchReq from 'utils/fetch';

// Create Attendance
async function uploadContent(payload: any) {
  console.log('Payload', payload);
  try {
    const endPoint = 'content/upload';
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

async function getContentData(creatorId: string, folderName: string) {
  try {
    const endPoint = `content/get-image-list-by-creator-and-folder/${creatorId}/${folderName}`;
    const options = {
      method: 'GET' as 'GET',
      withAuth: true,
    };
    let response = await fetchReq(endPoint, options);
    return response.json();
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

async function deleteContentData(keyList: string[]) {
  try {
    const endPoint = `content/delete`;
    const options = {
      method: 'DELETE' as 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      withAuth: true,
      body: JSON.stringify(keyList),
    };
    let response = await fetchReq(endPoint, options);
    return response.json();
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

// Update presigned url
async function updatePresignedUrl(payload: {
  presignUrl: string;
  imageKey: string;
}) {
  const endPoint = `content/update/presignedurl`;
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

export { uploadContent, getContentData, deleteContentData, updatePresignedUrl };
