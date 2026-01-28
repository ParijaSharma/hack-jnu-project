import { motion } from 'framer-motion'
import { FiSun, FiMoon, FiLogIn, FiLogOut } from 'react-icons/fi'
//import { GoogleLogin } from "@react-oauth/google";

const TopBar = ({ 
  isDark, 
  onThemeToggle, 
  googleUser, 
  // onLoginSuccess, 
  onLogout 
}) => {

  // const handleGoogleSuccess = async (credentialResponse) => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/auth/google", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         idToken: credentialResponse.credential,
  //       }),
  //     });

  //     const data = await res.json();

  //     console.log("LOGIN RESPONSE:", data);

  //     //  Save JWT token
  //     localStorage.setItem("token", data.token);

  //     //  Send user to App.jsx
  //     onLoginSuccess(data.user);

  //   } catch (error) {
  //     console.error("Google login failed:", error);
  //     alert("Login failed");
  //   }
  // };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between bg-white/90 backdrop-blur border-b border-gray-200 dark:bg-slate-950/80 dark:border-slate-800">

      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        MSME Compliance Navigator
      </h1>

      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onThemeToggle}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-all"
        >
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.button>

        {/*  Logout */}
        {googleUser && (
          <button
            onClick={handleLogoutClick}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
};

export default TopBar;
