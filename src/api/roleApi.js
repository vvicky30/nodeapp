import axios from "axios";
import { BASE_URL } from "../constant/constant";

export const getRoles = async (token) => {
    try {
      if (token) {
        const res = await axios.get(`${BASE_URL}/role`, {
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


export const updateRoleApi = async (token,roleId, roleName) => {
    try {
      if (token) {
        const res = await axios.put(`${BASE_URL}/role/?role_id=${roleId}&role_name=${roleName}`, {
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