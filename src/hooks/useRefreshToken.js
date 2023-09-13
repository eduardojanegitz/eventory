import {api2} from "../state/api"
import useAuth from "./useAuth";
const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api2.get('api/auth/refresh', {
            withCredentials: true
        });

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { 
                ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken 
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;