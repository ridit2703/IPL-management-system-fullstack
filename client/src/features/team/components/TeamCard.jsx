
// import { Link } from "react-router-dom";

// function TeamCard({ team }) {
//   return (
//     <div className="team-card">
//       <img
//         src={team.logo}
//         alt={`${team.name} logo`}
//         className="team-logo"
//       />

//       <h3>{team.name}</h3>
//       <p>{team.shortName}</p>

//       <Link to={`/teams/${team._id}`}>
//         View Team
//       </Link>
//     </div>
//   );
// }

// export default TeamCard;


import { Link } from "react-router-dom";

function TeamCard({ team, isAdmin, onDelete }) {
  return (
    <div className="team-card">
      <Link
        to={`/teams/${team._id}`}
        className="team-card-main"
      >
        <img
          src={team.logo}
          alt={`${team.name} logo`}
          className="team-logo"
        />

        <h2>{team.name}</h2>
        <p>{team.shortName}</p>

        <span>View Team →</span>
      </Link>

      {isAdmin && (
        <div className="team-card-actions">
          <Link
            to={`/teams/edit/${team._id}`}
            className="edit-btn"
          >
            Edit
          </Link>

          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(team._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default TeamCard;

