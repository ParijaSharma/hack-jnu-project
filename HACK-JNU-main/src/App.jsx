import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TopBar from "./components/TopBar";
import ProfilePage from "./components/ProfilePage";
import AnalyticsDashboard from "./components/AnalyticsDashboard";


function App() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [googleUser, setGoogleUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // ------------------ API ------------------
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

  // ------------------ AUTH ------------------
  const handleLoginSuccess = (user) => {
    setGoogleUser(user);
    setIsLoggedIn(true);
    fetchProfile();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setGoogleUser(null);
    setIsLoggedIn(false);
    setActivePage("home");
  };

  // Auto login if token exists
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //     fetchProfile();
  //   }
  // }, []);

  // Theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

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

  // ------------------ LOGIN SCREEN ------------------
  if (!isLoggedIn) {
  setIsLoggedIn(true);   // temporary bypass
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
