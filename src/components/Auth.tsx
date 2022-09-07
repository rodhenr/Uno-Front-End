import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

function Auth() {
  const location = useLocation();
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);

  return sessionId ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default Auth;
