import { authRequest, handleApiCall } from "@/lib/apiRequests";
import { ENDPOINTS } from "@/lib/endpoints";

export const getDashboard = async (queryParams: string): Promise<any> => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.COHORTDATA}?${queryParams}`,
    })
  );
};
