
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTeam } from "../team.service";

function CreateTeam() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    logo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createTeam({
        ...formData,
        shortName: formData.shortName.toUpperCase(),
      });

      navigate("/teams");
    } catch (error) {
      setError(error.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-team-page">
      <h1>Create IPL Team</h1>

      <form onSubmit={handleSubmit} className="team-form">
        <div>
          <label>Team Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Chennai Super Kings"
            required
          />
        </div>

        <div>
          <label>Short Name</label>
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            placeholder="CSK"
            maxLength={5}
            required
          />
        </div>

        <div>
          <label>Team Logo URL</label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            required
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Team"}
        </button>

        <Link to="/teams">Cancel</Link>
      </form>
    </div>
  );
}

export default CreateTeam;
