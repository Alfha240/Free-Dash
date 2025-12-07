import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
