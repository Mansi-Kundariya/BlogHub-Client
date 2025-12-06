import api from "./api";

interface ApiRequest {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: any;
  params?: any;
}

const apiService = async <T = any>({
  method,
  url,
  data,
  params,
}: ApiRequest): Promise<T> => {
  try {
    return await api({
      method,
      url,
      data,
      params,
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default apiService;
