import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/players">Players</NavLink>
        <NavLink to="/matches">Matches</NavLink>
        <NavLink to="/points-table">Points Table</NavLink>

        {user?.role === "owner" && (
          <>
            <NavLink to="/owner/profile">My Profile</NavLink>
            <NavLink to="/owner/my-team">My Team</NavLink>
          </>
        )}

        {user?.role === "player" && (
          <NavLink to="/player/profile">My Profile</NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/admin">Admin Panel</NavLink>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;