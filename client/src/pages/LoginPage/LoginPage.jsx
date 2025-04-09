import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          console.log("hello");
          console.log(jwtDecode(credentialResponse.credential));
          navigate("/donar");
        }}
        onError={() => console.log("Login failed")}
      />
    </>
  );
}
