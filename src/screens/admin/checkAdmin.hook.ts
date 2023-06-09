import {authService} from '../../api/auth.service';
import {useEffect, useState} from 'react';

export const useCheckAdmin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                setError(undefined);

                const response = await authService.checkAdmin();
                const responseDto = response.data;

                if (!responseDto) {
                    setError('Utente non valido');
                }
            } catch (e) {
                setError('Utente non valido');
            } finally {
                setIsLoading(false);
            }
        }

        fetch();
    }, []);

    return [isLoading, error];
}