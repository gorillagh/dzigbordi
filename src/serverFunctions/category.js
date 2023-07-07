import { api } from "./index";

export const getCategories = async (authtoken) => {
  return await api.post(
    "/categories",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCategory = async (authtoken, id) => {
  return await api.post(
    `/categories/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCategory = async (authtoken, data) => {
  return await api.post(`/categories-create`, data, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (authtoken, id, data) => {
  return await api.post(`/categories-update/${id}`, data, {
    headers: {
      authtoken,
    },
  });
};

export const deleteCategory = async (authtoken, id) => {
  return await api.post(
    `/categories-delete/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
