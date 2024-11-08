import React from "react";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from "react-router-dom";
import HomePage from "./navPages/HomePage";
import CardsPage from "./navPages/CardsPage";
import LeaderboardPage from "./navPages/LeaderboardPage";
import ProfilePage from "./navPages/ProfilePage";
import './App.css';
import NavBar from "./components/navBar/NavBar";
import { AuthProvider } from "./Context/AuthContext";
import LoginPage from "./navPages/authPages/LoginPage";

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
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
      <Route path="/login" element={<LoginPage />}/>
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
