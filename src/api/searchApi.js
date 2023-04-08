import axios from "axios";
const BASE_URL =
  "http://34.247.201.223:8083";

export const elasticSearchApi = async (
  token,
  location,
  includeTerm,
  excludeTerm,
  revenue,
  employee,
  includeIndustry,
  excludeIndustry,
  // searchQuery,
  page,
  rowsPerPage
) => {
  console.log("includeIndustry",includeIndustry.join(","));
  try {
    if (token) {
      const res = await axios.get(
        `${BASE_URL}/search/elastic/?Locations=${location.join(
          ","
        )}&Terms_include=${
          includeTerm.join(",")
        }&Terms_exclude=${excludeTerm.join(",")}&Revenue_start=${
          revenue[0]
        }&Revenue_end=${revenue[1]}&Employees_start=${
          employee[0]
        }&Employees_end=${employee[1]}&Industry_include=${includeIndustry.join(
          ","
        )}&Industry_exclude=${excludeIndustry.join(",")}&page_size=${rowsPerPage}&page_num=${page*rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getLocationApi = async (token) => {
  try {
    if (token) {
      const res = await axios.get(`${BASE_URL}/locations/`, {
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

export const getOperationModel = async (token) => {
  try {
    if (token) {
      const res = await axios.get(`${BASE_URL}/operating_model/`, {
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

export const operatingModelApi = async (token, industry) => {
  try {
    // const config = { headers: { "Content-Type": "application/json" } };
    if (token) {
      const res = await axios.post(
        `${BASE_URL}/operating_model`,
        {
          industry: industry,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
