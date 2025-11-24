import { authRequest, handleApiCall } from "@/lib/apiRequests";
import { ENDPOINTS } from "@/lib/endpoints";

export const getDashboard = async (queryParams: string): Promise<any> => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.COHORTDATA}?${queryParams}`,
    })
  );
};
export const getStep2ntegration = async (queryParams: any): Promise<any> => {
  const qs = new URLSearchParams(queryParams).toString();

  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.STEP2INTEG}?${qs}`,
      method: "GET",
    })
  );
};
