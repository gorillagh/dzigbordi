import { api } from "./index";

export const getDishes = async (data, authtoken) => {
  return await api.post("/dishes", data, {
    headers: {
      authtoken,
    },
  });
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

export const createDish = async (id, data, authtoken) => {
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

export const deleteDish = async (id, authtoken) => {
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
