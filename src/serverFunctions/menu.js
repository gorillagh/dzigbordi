import { api } from "./index";

export const getMenues = async (data, authtoken) => {
  return await api.post("/menus", data, {
    headers: {
      authtoken,
    },
  });
};

export const getMenu = async (id, authtoken) => {
  return await api.post(
    `/menus/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createMenu = async (id, data, authtoken) => {
  return await api.post("/menus-create", data, {
    headers: {
      authtoken,
    },
  });
};

export const updateMenu = async (id, data, authtoken) => {
  return await api.post(`/menus-update/${id}`, data, {
    headers: {
      authtoken,
    },
  });
};

export const deleteMenu = async (id, authtoken) => {
  return await api.post(
    `/menus-delete/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
