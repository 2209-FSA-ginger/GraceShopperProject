import axios from "axios";

const authProvider = {
  login: async ({ username, password }) => {
    try {
      const auth = await axios.post(`/auth/login`, { username, password });
      const admin = await axios.get("/auth/me", {
        headers: {
          authorization: auth.data.token,
        },
      });
      if (admin.data.isAdmin) {
        window.localStorage.setItem("adminToken", auth.data.token);
        return await Promise.resolve();
      } else {
        throw new Error("User does not have admin access");
      }
    } catch (error) {
      throw new Error("Invalid login");
    }
  },
  logout: () => {
    localStorage.removeItem("adminToken");
    return Promise.resolve();
  },
  checkAuth: () =>
    window.localStorage.getItem("adminToken")
      ? Promise.resolve()
      : Promise.reject(),
  checkError: (error) => {
    const status = error.status;
    // if (status === 401 || status === 403) {
    //   localStorage.removeItem("adminToken");
    //   return Promise.reject();
    // }
    return Promise.resolve();
  },
  getIdentity: async () => {
    const token = window.localStorage.getItem("adminToken");
    const admin = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return await Promise.resolve({
      id: admin.data.id,
      fullName: `${admin.data.firstName} ${admin.data.lastName}`,
    });
  },
  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
