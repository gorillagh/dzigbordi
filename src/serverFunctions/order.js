import { api } from "./index";

export const getSummary = async (authtoken) => {
  return await api.post(
    "/summary",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getOrders = async (authtoken) => {
  return await api.post(
    "/orders",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getOrder = async (id, authtoken) => {
  return await api.post(
    `/orders/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createOrUpdateOrder = async (data, authtoken) => {
  return await api.post("/orders-create-or-update", data, {
    headers: {
      authtoken,
    },
  });
};

export const updateOrder = async (authtoken, id, data) => {
  return await api.post(`/orders-update/${id}`, data, {
    headers: {
      authtoken,
    },
  });
};

export const deleteOrder = async (authtoken, id) => {
  return await api.post(
    `/orders-delete/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserOrders = async (authtoken, userId) => {
  return await api.post(
    `/orders-user/${userId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserOrder = async (authtoken, userId, id) => {
  return await api.post(
    `/orders-user/${userId}/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
