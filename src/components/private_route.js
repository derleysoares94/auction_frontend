import { Spinner } from "@chakra-ui/react";

import { useAuth } from "../context/useAuth";

import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const nav = useNavigate();

    if (loading) {
        return <Spinner size="xl" />
    }

    if(isAuthenticated) {
        return children
    }else {
        nav('/login')
    }
}

export default PrivateRoute;