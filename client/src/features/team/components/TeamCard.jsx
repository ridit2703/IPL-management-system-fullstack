
import { Link } from "react-router-dom";

function TeamCard({ team }) {
  return (
    <div className="team-card">
      <img
        src={team.logo}
        alt={`${team.name} logo`}
        className="team-logo"
      />

      <h3>{team.name}</h3>
      <p>{team.shortName}</p>

      <Link to={`/teams/${team._id}`}>
        View Team
      </Link>
    </div>
  );
}

export default TeamCard;
