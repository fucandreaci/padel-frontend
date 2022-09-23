const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const getErrorMessage = (error: any): string => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }

    return 'Si è verificato un errore';
}

export const utility = {
    capitalize,
    getErrorMessage
}