import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { TASK_STATUS } from "@/constants";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const httpProvider = {
  get: (url) => axiosInstance.get(url),
  /**
   * The actual implementation
   */
  // post: (url, data) => axiosInstance.post(url, data),
  /**
   * Fake implementation
   */
  post: async (url, data) => {
    await wait(1500);
    return {
      ...data,
      /**
       * Imitate DB generated ID;
       */
      id: uuidv4(),
      date_created: new Date().toISOString().split("T")[0],
      current_column: TASK_STATUS.TODO,
    };
  },
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};
