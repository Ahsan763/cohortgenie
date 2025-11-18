const BASE_URL: string = "http://127.0.0.1:8001/be/";

interface Endpoints {
  [key: string]: string;
}

const ENDPOINTS: Endpoints = {
  LOGIN: "users/login",
  SIGNUP: "users/register",
  FORGOTPASSWORD: "users/forgot-password",
  RESETPASSWORD: "users/reset-password",
  TWOFA: "users/verify-otp",
  // COHORTDATA
  COHORTDATA: "revenue/financial-report",
};

export { BASE_URL, ENDPOINTS };
