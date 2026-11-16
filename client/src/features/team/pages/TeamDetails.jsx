
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTeamById } from "../team.service";

function TeamDetails() {
  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await getTeamById(id);
        setTeam(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch team details");
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, [id]);

  if (loading) return <p>Loading team details...</p>;
  if (error) return <p>{error}</p>;
  if (!team) return <p>Team not found.</p>;

  return (
    <div className="team-details">
      <Link to="/teams">← Back to Teams</Link>

      <div className="team-details-card">
        <img src={team.logo} alt={`${team.name} logo`} />

        <h1>{team.name}</h1>
        <h3>{team.shortName}</h3>
      </div>
    </div>
  );
}

export default TeamDetails;
