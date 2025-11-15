import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const OvenManager = () => {
  const [ovens, setOvens] = useState([]);
  const [oven, setOven] = useState({
    id: "",
    brand: "",
    modelName: "",
    capacity: "",
    price: "",
    colour: ""
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedOven, setFetchedOven] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  // e.g., http://localhost:1111
  const baseUrl = `${import.meta.env.VITE_API_URL}/api/ovens`;

  // Fetch all Ovens on mount
  useEffect(() => {
    fetchAllOvens();
  }, []);

  const fetchAllOvens = async () => {
    try {
      const res = await axios.get(`${baseUrl}/viewall`);
      setOvens(res.data);
    } catch (err) {
      setError("Failed to fetch Ovens");
    }
  };

  const handleChange = (e) => {
    setOven({ ...oven, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in oven) {
      if (key !== "id" && (!oven[key] || oven[key].toString().trim() === "")) {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addOven = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, oven);
      setMessage("Oven added successfully.");
      setError("");
      fetchAllOvens();
      resetForm();
    } catch (err) {
      setError("Error adding Oven.");
      setMessage("");
    }
  };

  const updateOven = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update/${oven.id}`, oven);
      setMessage("Oven updated successfully.");
      setError("");
      fetchAllOvens();
      resetForm();
    } catch (err) {
      setError("Error updating Oven.");
      setMessage("");
    }
  };

  const deleteOven = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      setError("");
      fetchAllOvens();
    } catch (err) {
      setError("Error deleting Oven.");
      setMessage("");
    }
  };

  const getOvenById = async () => {
    if (!idToFetch) return;
    try {
      const res = await axios.get(`${baseUrl}/view/${idToFetch}`);
      setFetchedOven(res.data);
      setMessage("");
      setError("");
    } catch (err) {
      setFetchedOven(null);
      setError("Oven not found.");
      setMessage("");
    }
  };

  const handleEdit = (ovenItem) => {
    setOven(ovenItem);
    setEditMode(true);
    setMessage(`Editing Oven with ID ${ovenItem.id}`);
    setError("");
  };

  const resetForm = () => {
    setOven({
      id: "",
      brand: "",
      modelName: "",
      capacity: "",
      price: "",
      colour: ""
    });
    setEditMode(false);
  };

  return (
    <div className="ac-container">
      {message && <div className="message-banner success">{message}</div>}
      {error && <div className="message-banner error">{error}</div>}

      <h2>Oven Management</h2>

      {/* Add / Edit Form */}
      <div>
        <h3>{editMode ? "Edit Oven" : "Add Oven"}</h3>
        <div className="form-grid">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={oven.brand}
            onChange={handleChange}
          />
          <input
            type="text"
            name="modelName"
            placeholder="Model Name"
            value={oven.modelName}
            onChange={handleChange}
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity (L)"
            value={oven.capacity}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={oven.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="colour"
            placeholder="Colour"
            value={oven.colour}
            onChange={handleChange}
          />
        </div>
        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addOven}>
              Add Oven
            </button>
          ) : (
            <>
              <button className="btn-green" onClick={updateOven}>
                Update Oven
              </button>
              <button className="btn-gray" onClick={resetForm}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fetch by ID */}
      <div>
        <h3>Get Oven By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getOvenById}>
          Fetch
        </button>
        {fetchedOven && (
          <div>
            <h4>Oven Found:</h4>
            <pre>{JSON.stringify(fetchedOven, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All Ovens Table */}
      <div>
        <h3>All Ovens</h3>
        {ovens.length === 0 ? (
          <p>No Ovens found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand</th>
                  <th>Model Name</th>
                  <th>Capacity</th>
                  <th>Price</th>
                  <th>Colour</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ovens.map((ovenItem) => (
                  <tr key={ovenItem.id}>
                    <td>{ovenItem.id}</td>
                    <td>{ovenItem.brand}</td>
                    <td>{ovenItem.modelName}</td>
                    <td>{ovenItem.capacity}</td>
                    <td>{ovenItem.price}</td>
                    <td>{ovenItem.colour}</td>
                    <td>
                      <button
                        className="btn-green"
                        onClick={() => handleEdit(ovenItem)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-red"
                        onClick={() => deleteOven(ovenItem.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OvenManager;
