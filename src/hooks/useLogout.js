import { api2 } from "state/api";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      await api2.post("api/auth/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
