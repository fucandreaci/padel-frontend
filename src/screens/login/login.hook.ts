import {authService} from 'api/auth.service';
import {RequestLoginDto, ResponseLoginDto} from 'models/utente';
import {useEffect, useState} from 'react';

export const useLogin = (dto?: RequestLoginDto) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [data, setData] = useState<ResponseLoginDto>();

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                setError(undefined);

                if (dto) {
                    const response = await authService.login(dto);
                    const responseDto = response.data;
                    localStorage.setItem('token', responseDto.token);

                    setData(responseDto);
                }
            } catch (e) {
                setError('Credenziali non valide');
            } finally {
                setIsLoading(false);
            }
        }

        fetch();
    }, [dto]);

    return [isLoading, error, data];
}