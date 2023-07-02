import { api } from "./index";

export const getUsers = async (authtoken) => {
  return await api.post(
    `/users`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const getUser = async (authtoken, id) => {
  return await api.post(
    `/users/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createUser = async (authtoken, data) => {
  return await api.post("/users-create", data, {
    headers: {
      authtoken,
    },
  });
};

export const updateUser = async (authtoken, id, data) => {
  return await api.post(`/users-update/${id}`, data, {
    headers: {
      authtoken,
    },
  });
};

export const deleteUser = async (authtoken, id, data) => {
  return await api.post(
    `/users-delete/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const uploadImage = async (authtoken, uri) => {
  return await api.post(
    `/users/upload-image`,
    {
      uri,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};
