import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/providers/SigninContext";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div >
                    <div className="bg-dark w-full h-screen ">
                    <Loading className="absolute bg-dark" />
                    </div> 
                </div>; 
    }

    return isAuthenticated ? children : <Navigate to="/admin-portal" />;
};

export default ProtectedRoute;
