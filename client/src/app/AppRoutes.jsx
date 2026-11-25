import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import Teams from "../features/team/pages/Teams";
import TeamDetails from "../features/team/pages/TeamDetails";
import CreateTeam from "../features/team/pages/CreateTeam";
import EditTeam from "../features/team/pages/EditTeam";

import Players from "../features/player/pages/Players";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<TeamDetails />} />


        <Route element={<RoleRoute allowedRoles={["owner"]} />}>
          <Route path="/owner/profile" element={<div>Owner Profile</div>} />
          <Route path="/owner/my-team" element={<div>My Team</div>} />

        </Route>

        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<div>Admin Dashboard</div>} />

          <Route path="/teams/create" element={<CreateTeam />} />
          <Route path="/teams/edit/:id" element={<EditTeam />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={["player"]} />}>
          <Route path="/player/profile" element={<div>Player Profile</div>} />
          <Route path="/players" element={<Players />} />


        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;