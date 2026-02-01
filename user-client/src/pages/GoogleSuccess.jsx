import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("userToken", token);
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging you in...</p>;
}
