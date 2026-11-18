
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
import { Link, useNavigate } from "react-router-dom";
import { getAllTeams } from "../team.service";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const isAdmin = user?.role === "admin";

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getAllTeams();
                setTeams(response.data.data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) return <p>Loading teams...</p>;

    return (
        <div className="teams-page">
            <div className="teams-header">
                <h1>IPL Teams</h1>

                {isAdmin && (
                    <button
                        onClick={() => navigate("/teams/create")}
                    >
                        Create Team
                    </button>
                )}
            </div>

            <div className="teams-grid">
                {teams.map((team) => (
                    <Link
                        key={team._id}
                        to={`/teams/${team._id}`}
                        className="team-card"
                    >
                        <img
                            src={team.logo}
                            alt={team.name}
                        />

                        <h2>{team.name}</h2>
                        <p>{team.shortName}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Teams;
