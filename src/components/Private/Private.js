import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Private(props) {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? props.children : <Navigate to="/" />;
}
