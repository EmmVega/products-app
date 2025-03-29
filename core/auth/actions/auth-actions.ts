import { productsApi } from "../api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (data: AuthResponse): {
    user: User;
    token: string;
} => {
    const {token, ...user } = data;

    return {
        user,
        token
    }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();

    try {
        const { data } = await productsApi.post<AuthResponse>('/auth/losing', {
            email,
            password
        })
        return returnUserToken(data);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await productsApi.get<AuthResponse>('/auth/check-status')

        return returnUserToken(data);
    } catch (e) {
        console.log(e);
        return null
    }
}
