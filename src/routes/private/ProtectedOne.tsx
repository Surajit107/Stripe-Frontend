import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DecryptData } from "../../helper/EncryptDecrypt";

const ProtectedOne = (): JSX.Element => {
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = DecryptData(token ?? 'null');
    const location = useLocation();

    return (
        <>
            {
                _TOKEN ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
            }
        </>
    );
};

export default ProtectedOne;