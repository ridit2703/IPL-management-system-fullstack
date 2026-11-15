function WelcomeCard({ user }) {
  return (
    <section className="welcome-card">
      <div>
        <h2>Welcome, {user?.name}!</h2>
        <p>
          Welcome to your IPL Management System dashboard.
        </p>
      </div>

      <span className="welcome-role">
        {user?.role?.toUpperCase()}
      </span>
    </section>
  );
}

export default WelcomeCard;