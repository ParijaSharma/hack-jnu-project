// import React, { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// const LoginForm = ({ onLoginSuccess }) => {

//   const [googleUser, setGoogleUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [formData, setFormData] = useState({
//     ownerName: "",
//     businessName: "",
//     city: "",
//     state: "",
//   });

//   // ---------------- GOOGLE LOGIN ----------------
//   const handleGoogleSuccess = (credentialResponse) => {
//     const user = jwtDecode(credentialResponse.credential);

//     setGoogleUser(user);
//     setIsLoggedIn(true);

//     // Save token
//     localStorage.setItem("token", credentialResponse.credential);
//   };

//   // ---------------- FORM CHANGE ----------------
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // ---------------- FINAL SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const businessData = {
//       ...formData,
//       email: googleUser.email,
//       picture: googleUser.picture,
//     };

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/business", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(businessData),
//       });

//       if (!res.ok) {
//         alert("Failed to save profile");
//         return;
//       }

//       const savedProfile = await res.json();

//       //  IMPORTANT FIX
//       onLoginSuccess(googleUser, token);

//     } catch (error) {
//       console.error("Save failed", error);
//       alert("Server error while saving");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">

//       {!isLoggedIn ? (

//         <div className="bg-white p-6 rounded-xl shadow w-[350px] text-center">
//           <h2 className="font-semibold mb-4">Login with Google</h2>

//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={() => alert("Google Login Failed")}
//           />
//         </div>

//       ) : (

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-xl shadow w-[350px] space-y-3"
//         >
//           <input
//             name="ownerName"
//             placeholder="Owner Name"
//             value={formData.ownerName}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             name="businessName"
//             placeholder="Business Name"
//             value={formData.businessName}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             name="city"
//             placeholder="City"
//             value={formData.city}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             name="state"
//             placeholder="State"
//             value={formData.state}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded"
//           >
//             Continue
//           </button>
//         </form>

//       )}
//     </div>
//   );
// };

// export default LoginForm;

import { useState } from "react";
import { OnboardingForm } from "./onboarding-form";
//import { Dashboard } from "./dashboard";
import Dashboard from "./dashboard";
import { Shield, CircleCheckBig } from "lucide-react";
// import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLogin";

export default function LoginPage({ onLoginSuccess }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if (isLoggedIn) {
  //  return <Dashboard />;
  // }
  const [onboardingData, setOnboardingData] = useState(null);


  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">

      {/* LEFT BRAND PANEL */}
      <div className="relative hidden md:flex flex-col items-center 
                      bg-gradient-to-br from-primary to-secondary 
                      text-white p-12 overflow-hidden">

        {/* Floating Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-16 w-44 h-44 
                          bg-white/15 rounded-full blur-3xl 
                          animate-float" />

          <div className="absolute bottom-24 right-20 w-60 h-60 
                          bg-white/10 rounded-full blur-[90px] 
                          animate-float-delay" />
        </div>

        {/* Shield Icon */}
        <Shield className="h-16 w-16 mb-4 soft-pulse z-10" />

        {/* Brand Title */}
        <h1 className="text-2xl md:text-5xl font-bold mb-4 tracking-tight z-10 text-center">
          SETU
        </h1>

        {/* Illustration */}
        <img
          src="/workingwoman.svg"
          alt="Business illustration"
          className="w-40 my-6 z-10 drop-shadow-xl mx-auto"
        />

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-blue-100 max-w-lg text-center leading-relaxed z-10">
          Launch your business legally.  
          Track compliance. Avoid penalties.
        </p>

        {/* Feature List */}
        <ul className="mt-12 space-y-2 text-xs md:text-sm text-blue-100 z-10">
          {[
            "License tracking",
            "Automated reminders",
            "Compliance dashboard",
            "AI guidance",
          ].map((text, index) => (
            <li
              key={index}
              className="flex items-center gap-3 hover:translate-x-1 transition-transform"
            >
              <CircleCheckBig className="h-5 w-5 text-white/90" />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-sm opacity-90 z-10">
          Trusted by early founders 🚀
        </p>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* FORM CARD */}
          <div className="flex flex-col bg-card rounded-2xl shadow-xl 
                          p-8 border border-border/50">

            {/* LOGO HEADER */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 
                              rounded-xl bg-primary">
                <Shield className="h-6 w-6 text-white" />
              </div>

              <div className="flex flex-col leading-tight">
                <h1 className="text-2xl font-bold text-primary">SETU</h1>
                <p className="text-sm text-muted-foreground">
                  Compliance, Simplified.
                </p>
              </div>
            </div>

            {/* YOUR FORM */}
            <OnboardingForm
              onSubmit={(data) => {
                setOnboardingData(data);
              }}
            />


            {/* GOOGLE LOGIN */}
         {/* <GoogleLoginButton
          onSuccess={(user, token) => onLoginSuccess(user, token)}
        /> */}
          {/* <GoogleLoginButton onSuccess={onLoginSuccess} /> */}

            {onboardingData && (
            <div className="flex justify-center mt-6">
              <GoogleLoginButton
            onSuccess={async (user, token) => {
              try {
                localStorage.setItem("token", token);

                //  Save onboarding data to backend
                await fetch("http://localhost:5000/api/business", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(onboardingData),
                });

                console.log("Business profile saved successfully");

                //  Now move to dashboard
                onLoginSuccess(user, token);

              } catch (err) {
                console.error("Failed to save onboarding:", err);
                alert("Failed to save business profile");
              }
            }}
          />

            </div>
          )}

          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>

        </div>
      </div>

    </main>
  );
}
