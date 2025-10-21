import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import axios from "axios";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

interface GoogleTokens {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  expiry_date: number;
}

interface AuthResponse {
  user: GoogleUser;
  googleTokens: GoogleTokens;
  appToken: string;
}

function Home() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const res = await axios.post("http://localhost:3000/auth/google", {
          code,
        });
        const authResponse: AuthResponse = res.data;

        console.log(authResponse);

        const name = authResponse.user.name;
        setUser(name);

        console.log("Google Tokens: ", authResponse.googleTokens);
        console.log("App token from backend: ", authResponse.appToken);
        navigate("/app");
      } catch (error) {
        console.error("Login error: ", error);
      }
    },
    flow: "auth-code",
  });
  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={googleLogin}>Login With Google.</button>
    </div>
  );
}

export default Home;
