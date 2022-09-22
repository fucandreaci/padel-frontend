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

export const tokenUtils = {
    getJWT,
    getHeader
}