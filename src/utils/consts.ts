export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

export const processURL = (
  basePath: string,
  params: { [key: string]: string }
): string => {
  return `${basePath}?${new URLSearchParams(params).toString()}`;
};

export const URL = {
  LOGIN: '/login',
  HOME: '/',
  QUOTE: '/quote',
  DASHBOARD: '/dashboard',
  ESTIMATE: '/appointment/estimate/:appId',
  ESTIMATE_RESPONSE: '/appointment/estimate_response/:appId',
};

export const MIXPANEL_TRACK = {
  ZIP: 'Zip',
  NOT_SURE_WHATS_WRONG: "Not sure what's wrong",
  NOT_SURE_WHATS_WRONG_CATEGORY: "Not sure what's wrong category",
  NOT_SURE_WHATS_WRONG_TEXTBOX: "Not sure what's wrong textbox",
  NOT_SURE_WHATS_WRONG_NEXT: "Passed not sure what's wrong",
  REPAIR_SERVICE: 'Repair service',
  CAR: 'Car',
  CONFIRM_CAR: 'Confirm car',
  CONTACT_INFO: 'Contact info',
  DIAGNOSIS_ESTIMATE: 'Diagnosis estimate',
  REPAIR_ESTIMATE: 'Repair estimate',
  SCHEDULE_APPOINTMENT: 'Schedule appointment',
  CARD_INFO: 'Card info',
};

export const MODE_LOGIN = {
  PHONE: 'phone',
  EMAIL: 'email',
};
