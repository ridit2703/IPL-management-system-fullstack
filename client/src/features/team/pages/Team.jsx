
import { useEffect, useState } from "react";
import { getAllTeams } from "../team.service";
import TeamCard from "../components/TeamCard";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await getAllTeams();

        setTeams(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="teams-page">
      <h1>IPL Teams</h1>

      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <div className="teams-grid">
          {teams.map((team) => (
            <TeamCard key={team._id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
