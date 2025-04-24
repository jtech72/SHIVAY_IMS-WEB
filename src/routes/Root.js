import { Navigate } from 'react-router-dom';

const Root = () => {
    const getRootUrl = () => {
        let url = 'shivay/dashboard';
        return url;
    };

    const url = getRootUrl();

    return <Navigate to={`/${url}`} />;
};

export default Root;
