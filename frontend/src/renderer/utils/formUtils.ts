const loginFields = [
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Password', name: 'password', type: 'password', required: true },
];

const setPasswordFields = [
  {
    label: 'Please enter your password',
    name: 'password',
    type: 'password',
    required: true,
  },
];

const registerFields = [
  { label: 'Email', name: 'email', type: 'email', required: true },
  {
    label: 'Agency Name',
    name: 'agencyName',
    type: 'text',
    required: true,
  },
  {
    label: 'Number of Creators',
    name: 'numberOfCreators',
    type: 'number',
    required: true,
  },
  {
    label: 'Agency Website URL',
    name: 'agencyWebsite',
    type: 'text',
    required: true,
  },
  {
    label: 'Agency Social Media URL',
    name: 'agencyMediaSocial',
    type: 'text',
  },
  { label: 'Password', name: 'password', type: 'password', required: true },
];

const resetPasswordFields = [
  // {
  //   label: 'Please enter your password',
  //   name: 'password',
  //   type: 'password',
  //   required: true,
  // },
  {
    label: 'Please enter new password',
    name: 'newPassword',
    type: 'password',
    required: true,
  },
];

export default {
  loginFields,
  registerFields,
  setPasswordFields,
  resetPasswordFields,
};
