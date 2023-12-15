export type IPCChannels = string;

// after create services post, put, & delete need to add here without prefix request or response
export type TMutationService =
  | 'login'
  | 'signup'
  | 'create-employee'
  | 'update-employee'
  | 'delete-employee'
  | 'activate-employee'
  | 'deactivate-employee'
  | 'create-creator'
  | 'update-creator'
  | 'delete-creator';
// after create services get need to add here without prefix request or response
export type TQueryService = 'user' | 'verify' | 'get-employee' | 'get-creator'|'get-agencyById';
