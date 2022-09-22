import {authService} from 'api/auth.service';
import {RequestSignupDto} from 'models/utente';
import {useEffect, useState} from 'react';
import {AxiosError} from 'axios';

export const useSignup = (dto?: RequestSignupDto) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [data, setData] = useState<RequestSignupDto>();

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                setError(undefined);

                if (dto) {
                    const response = await authService.signup(dto);
                    const responseDto = response.data;

                    setData(responseDto);
                }
            } catch (e) {
                const {response} = e as AxiosError
                if (response && response.data) {
                    const errData = response.data as { message: string }
                    setError(errData.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetch();
    }, [dto]);

    return [isLoading, error, data];
}