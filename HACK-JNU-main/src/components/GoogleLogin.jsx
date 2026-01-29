import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginButton({ onSuccess }) {

  const handleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        { idToken }
      );

      const { token, user } = res.data;

      // ✅ Save token correctly
      localStorage.setItem("token", token);

      // ✅ Send data back to App
      onSuccess(user, token);

    } catch (error) {
      console.error("Login failed", error);
      alert("Google login failed");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Login Failed")}
      />
    </div>
  );
}
