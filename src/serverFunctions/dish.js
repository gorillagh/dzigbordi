import { api } from "./index";

export const getDishes = async (authtoken) => {
  return await api.post(
    "/dishes",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getDish = async (id, authtoken) => {
  return await api.post(
    `/dishes/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createDish = async (authtoken, data) => {
  return await api.post("/dishes-create", data, {
    headers: {
      authtoken,
    },
  });
};

export const uploadDishImage = async (authtoken, uri) => {
  return await api.post(
    `/dishes-uploadImage`,
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

export const updateDish = async (id, data, authtoken) => {
  return await api.post(`/dishes-update/${id}`, data, {
    headers: {
      authtoken,
    },
  });
};

export const deleteDish = async (authtoken, id) => {
  return await api.post(
    `/dishes-delete/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
