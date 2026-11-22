
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getTeamById,
  updateTeam,
} from "../team.service";

function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    logo: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchTeam() {
      try {
        const team = await getTeamById(id);

        if (!cancelled) {
          setFormData({
            name: team.name || "",
            shortName: team.shortName || "",
            logo: team.logo || "",
          });
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.message || "Failed to fetch team");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchTeam();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "shortName" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateTeam(id, formData);

      navigate(`/teams/${id}`);
    } catch (error) {
      setError(error.message || "Failed to update team");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading team...</p>;

  return (
    <div className="team-form-page">
      <h1>Edit Team</h1>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit} className="team-form">
        <div className="form-group">
          <label htmlFor="name">Team Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength={2}
            maxLength={50}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shortName">Short Name</label>
          <input
            id="shortName"
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            maxLength={5}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="logo">Team Logo URL</label>
          <input
            id="logo"
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="primary-btn"
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Team"}
        </button>

        <Link to={`/teams/${id}`} className="back-link">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default EditTeam;
