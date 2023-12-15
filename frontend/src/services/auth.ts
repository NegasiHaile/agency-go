import fetch from '../utils/fetch';

const testAgencyConfig = {
  agencyName: 'test',
  numberOfCreators: 5,
  websiteUrl: 'www',
  socialMediaLink: 'facebodk',
};

const testSignUpConfig = {
  firstName: 'test1',
  lastName: 'joy',
  isEmployee: false,
};

const loginRequest = async (arg: any) => {
  try {
    const response = await fetch('login', {
      method: 'POST',
      body: JSON.stringify(arg),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const cookie = response.headers.get('set-cookie');
    const cookieToken =
      cookie?.split(';').find((item) => item.includes('Authorization')) || '';
    const token = cookieToken.split('=')[1];
    // const store = new Store();
    // store.set('token', token);
    const resp = await response.json();
    return resp;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const logoutRequest = async () => {
  // const store = new Store();
  // store.delete('token');
  // e.reply('logout-response');
};

const verifyRequest = async () => {
  try {
    // const store = new Store();
    const response = await fetch('verify', {
      method: 'GET',
      withAuth: true,
    });
    
    const responseJson = await response.json();
    const user = responseJson?.data?.user || {};
    const agency = responseJson?.data?.agency || {};
    // store.set('user', user);
    // store.set('agency', agency);
    // e.reply('verify-response', responseJson);
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const signupRequest = async (arg: any) => {
  try {
    const payload = { ...arg, ...testSignUpConfig }
    const response = await fetch('signup', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response, 'response')
    if (response.ok) {
      let body = await response.json();
      
      let id = body?.data?._id || '651d1d9042f4ee8eb15d611d';
      
      // const createAgencyResponse = await fetch(`agency/${id}`, {
      //   method: 'POST',
      //   body: JSON.stringify(testAgencyConfig),
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Authorization: `Bearer ${response.toke}`,
      //   },
      // });
      // if (createAgencyResponse.ok) {
        const loginResponse = await fetch('login', {
          method: 'POST',
          body: JSON.stringify({
            email: arg.email,
            password: arg.password,
          }),
          headers: {
            'Content-Type': 'application/json',
            
          },
        });
        if (loginResponse.ok) {
          const cookie = loginResponse.headers.get('set-cookie');
          const cookieToken =
            cookie?.split(';').find((item) => item.includes('Authorization')) ||
            '';
          const token = cookieToken.split('=')[1];
          // const store = new Store();
          // store.set('token', token);
          
          const resp =  await loginResponse.json();
          
          return resp;
        }
      // }
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const AuthServices = {
  loginRequest,
  logoutRequest,
  signupRequest,
  verifyRequest,
};

export default AuthServices;
