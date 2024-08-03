import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DecryptData } from "../../helper/EncryptDecrypt";

const ProtectedTwo = (): JSX.Element => {
    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');
    const location = useLocation();

    return (
        <>
            {
                _USER_DATA?.is_subscribed ? <Outlet /> : <Navigate to="/pricing" state={{ from: location }} replace />
            }
        </>
    );
};

export default ProtectedTwo;