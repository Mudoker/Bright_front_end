import { axiosPost } from '@/config/service/axios.js';

export const signup = async (account, password, fname, email, dateOfBirth) => {
    try {
        const response = await axiosPost('api/auth/bright/signup', {
            account,
            password,
            fname,
            email,
            dateOfBirth,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (account, password) => {
    try {
        const response = await axiosPost('api/auth/bright/login', {
            account,
            password,
        });

        const userId = response.payload.userData._id;
        const deviceToken = await getDeviceToken();

        await axiosPost('api/auth/save-device-token', {
            deviceToken,
            userId,
        });

        return response.payload;
    } catch (error) {
        console.error(error);
    }
};
