import jwt_decode from 'jwt-decode';

const getJWT = () => {
    const token = localStorage.getItem('token');
    return token;
}

const getHeader = () => {
    const token = getJWT();
    if (!token) return undefined;

    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}

const getPayload = () => {
    const token = localStorage.getItem('token')
    const payload =  jwt_decode<{sub: number}>(token || '');
    return payload;
}

export const tokenUtils = {
    getJWT,
    getHeader,
    getPayload
}