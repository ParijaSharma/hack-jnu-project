import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TopBar from "./components/TopBar";
import ProfilePage from "./components/ProfilePage";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import LoginPage from './components/LoginPage';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [googleUser, setGoogleUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [userProfile, setUserProfile] = useState({
    businessOwnerName: "",
    businessName: "",
    businessType: "",
    msmeCategory: "",
    city: "",
    state: "",
    email: "",
    mobileNumber: "",
    gstNumber: "",
    registrationDate: "",
    picture: "",
  });

  // ------------------ FETCH PROFILE ------------------
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/business/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setUserProfile(data);
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };

  // ------------------ AUTO LOGIN ------------------
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //     fetchProfile();
  //   }
  // }, []);
// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     setIsLoggedIn(true);
//   }
//   setAuthChecked(true);  
// }, []);

useEffect(() => {
  setAuthChecked(true);   // only allow rendering
}, []);

useEffect(() => {
  if (isLoggedIn) {
    fetchProfile();
  }
}, [isLoggedIn]);

  // ------------------ THEME ------------------
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // ------------------ LOGIN ------------------
  // const handleLoginSuccess = (user, token) => {
  //   localStorage.setItem("token", token);
  //   setGoogleUser(user);
  //   setIsLoggedIn(true);
  //   fetchProfile();
  // };

  const handleLoginSuccess = async (user, token, onboardingData) => {
  localStorage.setItem("token", token);
  setGoogleUser(user);
  setIsLoggedIn(true);

  if (onboardingData) {
    await fetch("http://localhost:5000/api/business", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(onboardingData),
    });
  }

  fetchProfile();
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    setGoogleUser(null);
    setIsLoggedIn(false);
    setActivePage("home");
  };

  const handleViewProfile = () => {
    setActivePage("profile");
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Not logged in");

      const res = await fetch("http://localhost:5000/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!res.ok) throw new Error("Save failed");

      const savedData = await res.json();
      setUserProfile(savedData);
      alert("Profile saved successfully");
    } catch (error) {
      console.error("Save profile error:", error);
      alert("Failed to save profile");
    }
  };
  if (!authChecked) {
  return (
    <div className="h-screen flex items-center justify-center text-lg">
      Loading...
    </div>
  );
}


  // ------------------ LOGIN SCREEN ------------------
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // ------------------ DASHBOARD ------------------
  return (
    <div className={`min-h-screen ${isDark ? "dark bg-slate-950" : "bg-slate-50"}`}>
      <div className="flex h-screen overflow-hidden">

        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onViewProfile={handleViewProfile}
          googleUser={googleUser}
          onNavigate={setActivePage}
          activePage={activePage}
        />

        <div className="flex-1 flex flex-col overflow-hidden">

          <TopBar
            isDark={isDark}
            onThemeToggle={() => setIsDark(!isDark)}
            googleUser={googleUser}
            onLogout={handleLogout}
          />

          {activePage === "home" && (
            <MainContent sidebarCollapsed={sidebarCollapsed} />
          )}

          {activePage === "dashboard" && <AnalyticsDashboard />}

          {activePage === "profile" && (
            <ProfilePage
              userProfile={userProfile}
              onSave={handleSaveProfile}
              onBack={() => setActivePage("home")}
            />
          )}

        </div>
      </div>
    </div>
  );
}


export default App;
