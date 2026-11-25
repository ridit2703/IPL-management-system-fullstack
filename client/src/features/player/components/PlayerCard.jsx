
import { Link } from "react-router-dom";

function PlayerCard({ player, isAdmin, onDelete }) {
  return (
    <div className="player-card">
      <img
        src={player.photo || "/default-player.png"}
        alt={player.name}
        className="player-photo"
      />

      <div className="player-info">
        <h3>{player.name}</h3>
        <p>{player.role}</p>
        <p>
          Team: {player.team?.name || "Not assigned"}
        </p>

        <div className="player-stats">
          <span>Runs: {player.runs}</span>
          <span>Wickets: {player.wickets}</span>
        </div>

        <Link to={`/players/${player._id}`}>
          View Profile
        </Link>

        {isAdmin && (
          <div className="player-actions">
            <Link to={`/players/edit/${player._id}`}>
              Edit
            </Link>

            <button onClick={() => onDelete(player._id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerCard;
