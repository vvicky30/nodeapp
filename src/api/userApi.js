import axios from "axios";
import { BASE_URL } from "../constant/constant";

export const getUserList = async (token,page,rowsPerPage) => {
    try {
      if (token) {
        const res = await axios.get(`${BASE_URL}/user/all/?page_size=${rowsPerPage}&page_num=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  export const getUserDetail = async (token, email) => {
    try {
      if (token) {
        const res = await axios.get(`${BASE_URL}/user/details/?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  export const updateUserDetail = async (token,email,roleId, userdata) => {
    try {
      if (token) {
        const res = await axios.put(`${BASE_URL}/user/details/?email=${email}&role_id=${roleId}`,userdata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  export const deleteUser = async (token, userId) => {
    try {
      if (token) {
        const res = await axios.delete(`${BASE_URL}/user/delete/?email=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  export const getUserProfileDetail = async (token, userId) => {
    try {
      if (token) {
        const res = await axios.get(`${BASE_URL}/user/profile/?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
  export const getUserDetailApi = async (token) => {
    try {
      if (token) {
        const res = await axios.get(`${BASE_URL}/user/details/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
  export const updateUserDetailApi = async (token,userdata) => {
    try {
      if (token) {
        const res = await axios.put(`${BASE_URL}/user/details/`,userdata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  export const updatePassword = async (token,userdata) => {
    try {
      if (token) {
        const res = await axios.post(`${BASE_URL}/user/password_reset/`,userdata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };