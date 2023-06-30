import { api } from "./index";

export const getDepartments = async (authtoken) => {
  return await api.post(
    "/departments",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getDepartment = async (authtoken, id) => {
  return await api.post(
    `/departments/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createDepartment = async (authtoken, data) => {
  return await api.post(`/departments-create`, data, {
    headers: {
      authtoken,
    },
  });
};

export const updateDepartment = async (authtoken, id, data) => {
  return await api.post(`/departments-update/${id}`, data, {
    headers: {
      authtoken,
    },
  });
};

export const deleteDepartment = async (authtoken, id) => {
  return await api.post(
    `/departments-delete/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
