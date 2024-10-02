
import { getMySession } from './lib/auth-action'
const withSession = (WrappedComponent) => {
    const WithSession = async ({ req, res }) => {
        const session = await getMySession();

        if (!session) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        return <WrappedComponent {...props} />;
    };

    return WithSession;
};

export default withSession;