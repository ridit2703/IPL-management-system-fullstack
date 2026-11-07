import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h2>IPL Manager</h2>
      </div>

      <div className="navbar-user">
        <span>{user?.name || "User"}</span>
        <span className="user-role">
          {user?.role || "user"}
        </span>
      </div>
    </header>
  );
}

export default Navbar;