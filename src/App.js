import React from "react";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from "react-router-dom";
import HomePage from "./navPages/HomePage/HomePage";
import CardsPage from "./navPages/CardsPage";
import LeaderboardPage from "./navPages/LeaderboardPage";
import ProfilePage from "./navPages/ProfilePage/ProfilePage";
import './App.css';
import NavBar from "./components/navBar/NavBar";
import { AuthProvider } from "./Context/AuthContext";
import LoginPage from "./navPages/authPages/LoginPage";
import BricksPage from "./navPages/AdminPage/pages/BricksPage";
import SignupPage from "./navPages/authPages/SignupPage";
import AdminPage from "./navPages/AdminPage/AdminPage";
import UserPage from "./navPages/AdminPage/pages/UserPage";
import {HelmetProvider} from "react-helmet-async";

function Layout() {
  return (
    <div>
            <NavBar />
            <div className="content"><Outlet /></div>
        </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/cards" element={<CardsPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage/>}>
          <Route path="bricks" element={<BricksPage />} />
          <Route path="users" element={<UserPage/>}/>
      </Route>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage/>}/>
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
