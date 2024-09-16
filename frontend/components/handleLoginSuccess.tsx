// useLogin.js
import useStore from '@/components/stores/zstore';
import { SignIn } from '@/app/lib/auth-action';
import { parseCookies, setCookie } from 'nookies';
import useRouter from '@/components/useCustRouter';

export const useLogin = () => {
  const { setAuthtoken, setAuthOverlayVisible } = useStore();
  const router = useRouter();

  const handleLoginSuccess = async (response) => {
    try {
      const { accessToken } = await response.json();
      const maxAge  = parseInt(process.env.TOKEN_MAX_AGE, 10);

      setCookie(null, 'token', accessToken, {
        maxAge, // cookie expiration time (in seconds)
        path: '/', // cookie path
      });

      setAuthtoken(accessToken);

      await SignIn(accessToken);

      setAuthOverlayVisible(false);
      router.push('/'); // redirect to the dashboard page on successful login
    } catch (error) {
      setAuthOverlayVisible(false);
      console.error('Login failed:', error);
      throw error;
    }
  };

  return { handleLoginSuccess };
};
