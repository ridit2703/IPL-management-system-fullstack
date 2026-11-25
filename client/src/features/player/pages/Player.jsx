
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import {
  getAllPlayers,
  deletePlayer
} from "../player.service";

import PlayerCard from "../components/PlayerCard";
import "../Player.css";

function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllPlayers();
      setPlayers(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this player?"
    );

    if (!confirmed) return;

    try {
      await deletePlayer(id);
      setPlayers((currentPlayers) =>
        currentPlayers.filter((player) => player._id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="players-page">
      <div className="players-header">
        <h1>IPL Players</h1>

        {isAdmin && (
          <Link to="/players/create" className="add-player-btn">
            + Add Player
          </Link>
        )}
      </div>

      {players.length === 0 ? (
        <p>No players found.</p>
      ) : (
        <div className="players-grid">
          {players.map((player) => (
            <PlayerCard
              key={player._id}
              player={player}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Players;
