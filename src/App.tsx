  import React from "react";
  import { Routes, Route, Navigate } from "react-router-dom";
  import { connect, ConnectedProps } from "react-redux";
  import { RootState } from "./redux/store";
  import { clearAuth } from "./redux/authenticationSlice";

  import Login from "./pages/Login"; 
  import Dashboard from "./pages/Dashboard";
  import Profile from "./pages/Profile";
  import Navbar from "./components/Navbar";

  // Map Redux state to props
  const mapState = (state: RootState) => ({
    auth: state.auth,
  });

  // Map dispatch to props
  const mapDispatch = {
    clearAuth,
  };

  const connector = connect(mapState, mapDispatch);

  type PropsFromRedux = ConnectedProps<typeof connector>;

  const App: React.FC<PropsFromRedux> = ({ auth, clearAuth }) => {
    const isAuthenticated = !!auth.token;
    const user = auth.user;
    const isLoading = false;

    const logout = () => {
      clearAuth();
    };

    const updateUser = (updatedUser: any) => {
      // Update the user in store
      // Normally you would create an action for this
      // For simplicity, dispatching setAuth manually
      const setAuthAction = {
        type: "auth/setAuth",
        payload: { token: auth.token!, user: updatedUser },
      };
      // @ts-ignore
      clearAuth.dispatch?.(setAuthAction);
    };

    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-emerald-600 font-medium">Loading your forest...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100">
        {/**@ts-ignore */}
        {isAuthenticated && user && <Navbar user={user} onLogout={logout} />}

        <main className="pt-20">
<Routes>
  <Route 
    path="/login" 
    element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
  />
  <Route 
    path="/dashboard" 
    element={isAuthenticated && user ? <Dashboard user={user} onUpdateProgress={updateUser} /> : <Navigate to="/login" replace />} 
  />
  <Route 
    path="/profile" 
    element={<Profile user={user} onUpdateUser={updateUser} /> } 
  />
  <Route 
    path="*" 
    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
  />
</Routes>

        </main>
      </div>
    );
  };

  export default connector(App);
