import { api } from "./index";

export const getBranches = async (authtoken) => {
  return await api.post(
    "/branches",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getBranch = async (authtoken, id) => {
  return await api.post(
    `/branches/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createBranch = async (authtoken, data) => {
  return await api.post(`/branches-create`, data, {
    headers: {
      authtoken,
    },
  });
};

export const updateBranch = async (authtoken, id, data) => {
  return await api.post(`/branches-update/${id}`, data, {
    headers: {
      authtoken,
    },
  });
};

export const deleteBranch = async (authtoken, id) => {
  return await api.post(
    `/branches-delete/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
