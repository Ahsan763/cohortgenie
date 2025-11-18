// import { ApiResponseType, AuthRequestParams, ErrorData, SessionData } from "@/utils/models/auth.model";
import axios, { AxiosResponse, AxiosError } from "axios";
import { ApiResponseType, AuthRequestParams, ErrorData, SessionData } from "./utils/models/auth.model";
const baseURL = process.env.NEXT_PUBLIC_APP_URL;
const axiosClient = axios.create({
  baseURL: `${baseURL}`,
});

export const authRequestFormData = async <T, D = unknown>({
  url,
  method = "GET",
  data,
  headers,
}: AuthRequestParams<D>): Promise<ApiResponseType<T>> => {
  const session: SessionData | null =
    typeof window !== "undefined"
      ? (JSON.parse(localStorage.getItem("user") || "{}") as SessionData | null)
      : null;
  return new Promise((resolve, reject) => {
    axiosClient({
      method,
      headers: {
        Authorization: `Bearer ${session?.token}`,
        "Content-Type": "multipart/form-data",
      },
      url,
      data,
    })
      .then((res: AxiosResponse<T>) => {
        resolve(res as any)
      })
      .catch((err: AxiosError<ErrorData>) => {
        // console.log(err)
        // if (err?.response?.status === 401) {
        //   if (typeof window !== "undefined") {
        //     localStorage.removeItem("user");
        //   }
        // }
        reject({
          status: err.response?.status,
          data: err.response?.data,
          statusText: err.response?.statusText,
          headers: err.response?.headers as Record<string, string>,
          config: err.response?.config || {},
        });
      });
  });
};


export const authRequest = async <T, D = unknown>({
  url,
  method = "GET",
  data,
  headers,
}: AuthRequestParams<D>): Promise<ApiResponseType<T>> => {
  const session: SessionData | null =
    typeof window !== "undefined"
      ? (JSON.parse(localStorage.getItem("user") || "{}") as SessionData | null)
      : null;
  return new Promise((resolve, reject) => {
    axiosClient({
      method,
      headers: {
        Authorization: `Bearer ${session?.token}`,
        ...headers,
      },
      url,
      data,
    })
      .then((res: AxiosResponse<T>) => {
        // console.log(res)
        resolve(res as any)
      })
      .catch((err: AxiosError<ErrorData>) => {
        // console.log(err)
        // if (err?.response?.status === 401) {
        //   if (typeof window !== "undefined") {
        //     localStorage.removeItem("user");
        //   }
        // }
        reject({
          status: err.response?.status,
          data: err.response?.data,
          statusText: err.response?.statusText,
          headers: err.response?.headers as Record<string, string>,
          config: err.response?.config || {},
        });
      });
  });
};
export const publicRequest = async <T, D = unknown>({
  url,
  method = "GET",
  data,
  headers,
}: AuthRequestParams<D>): Promise<ApiResponseType<T>> => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method,
      headers: {
        ...headers,
      },
      url,
      data,
    })
      .then((res: any) => {
        console.log(res)
        resolve(res as any);
      })
      .catch((err: AxiosError<ErrorData>) => {
        reject({
          ...err?.response,
        });
      });
  });
};
export const handleApiCall = async <T>(
  requestFn: () => Promise<any>
): Promise<{ status: number; data: any } | undefined> => {
  try {
    const { status, data } = await requestFn();
    return { status, data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        data: error.response.data as T,
      };
    }
    throw error;
  }
};