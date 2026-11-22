
// import { useEffect, useState } from "react";
// import { getAllTeams } from "../team.service";
// import TeamCard from "../components/TeamCard";

// function Teams() {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchTeams() {
//       try {
//         const response = await getAllTeams();

//         setTeams(response.data);
//       } catch (error) {
//         setError(error.message || "Failed to fetch teams");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTeams();
//   }, []);

//   if (loading) return <p>Loading teams...</p>;

//   if (error) return <p>{error}</p>;

//   return (
//     <div className="teams-page">
//       <h1>IPL Teams</h1>

//       {teams.length === 0 ? (
//         <p>No teams available.</p>
//       ) : (
//         <div className="teams-grid">
//           {teams.map((team) => (
//             <TeamCard key={team._id} team={team} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Teams;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Team.css";
import {
  getAllTeams,
  deleteTeam,
} from "../team.service";

import TeamCard from "../components/TeamCard";
import useAuth from "../../../hooks/useAuth";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    async function fetchTeams() {
      try {
        setError("");

        const data = await getAllTeams();

        if (!Array.isArray(data)) {
          throw new Error("Invalid teams response from server");
        }

        setTeams(data);
      } catch (error) {
        setError(error.message || "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteTeam(id);

      setTeams((prevTeams) =>
        prevTeams.filter((team) => team._id !== id)
      );
    } catch (error) {
      setError(error.message || "Failed to delete team");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading teams...</p>;

  return (
    <div className="teams-page">
      <div className="teams-header">
        <div>
          <h1>IPL Teams</h1>
          <p>Explore all IPL franchises</p>
        </div>

        {isAdmin && (
          <button
            className="primary-btn"
            onClick={() => navigate("/teams/create")}
          >
            + Create Team
          </button>
        )}
      </div>

      {error && <p className="form-error">{error}</p>}

      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <div className="teams-grid">
          {teams.map((team) => (
            <TeamCard
              key={team._id}
              team={team}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {deletingId && <p>Deleting team...</p>}
    </div>
  );
}

export default Teams;
