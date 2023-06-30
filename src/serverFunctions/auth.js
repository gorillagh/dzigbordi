import { api } from "./index";

export const checkPhoneNumber = async (phoneNumber) => {
  return await api.post(`/check-phonenumber`, { phoneNumber });
};

export const createOrUpdateUser = async (authtoken, data) => {
  return await api.post(`/create-or-update-user`, data, {
    headers: {
      authtoken,
    },
  });
};

export const loginUser = async (authtoken) => {
  return await api.post(
    `/login-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await api.post(
    `/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await api.post(
    `/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentStaff = async (authtoken) => {
  return await api.post(
    `/current-staff`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateUser = async (authtoken, update, slug) => {
  return await api.post(`/update-user/${slug}`, update, {
    headers: {
      authtoken,
    },
  });
};
