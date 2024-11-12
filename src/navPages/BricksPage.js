import { useEffect, useState } from "react";
import { Read, Update } from "../api/Bricks";
import Modal from "../components/Modal/Modal";

export default function BricksPage() {
    const [bricks, setBricks] = useState([]);
    const [expanded, setExpanded] = useState(null);

    // Fetch bricks when component mounts
    useEffect(() => {
        const fetchBricks = async () => {
            const response = await Read();
            setBricks(response);
        };
        fetchBricks();
    }, []);

    // Save changes and update bricks
    const saveChanges = async (updatedItem) => {
        const result = await Update(updatedItem);
        if (result.status === "success") {
            setBricks((prevBricks) =>
                prevBricks.map((brick) =>
                    brick.brick_id === updatedItem.brick_id ? updatedItem : brick
                )
            );
        } else {
            alert("Failed to save changes.");
        }
    };

    return (
        <div>
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Bricks</h2>
            {expanded && (
                <EditBrick
                    item={expanded}
                    onSave={(updatedItem) => {
                        saveChanges(updatedItem);
                        setExpanded(null);
                    }}
                    onClose={() => setExpanded(null)}
                />
            )}
            <div>
                {bricks.map((item) => (
                    <BrickItem
                        key={item.brick_id}
                        item={item}
                        onEdit={() => setExpanded(item)}
                        onSave={saveChanges}
                    />
                ))}
            </div>
        </div>
    );
}

function BrickItem({ item, onEdit, onSave }) {
    const toggleStatus = () => {
        onSave({ ...item, status: !item.status });
    };

    return (
        <div>
            <h2>{item.title}</h2>
            <button
                onClick={toggleStatus}
                style={{
                    padding: "10px 20px",
                    backgroundColor: item.status ? "green" : "gray",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginBottom: "20px"
                }}
            >
                {item.status ? "Active" : "Pending"}
            </button>
            <button onClick={onEdit} style={{ marginLeft: "10px" }}>
                Edit
            </button>
        </div>
    );
}

function EditBrick({ item, onSave, onClose }) {
    const [formData, setFormData] = useState({
        title: item.title,
        description: item.description,
        points: item.points,
        status: item.status,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = () => {
        onSave({ ...item, ...formData });
        onClose();
    };

    const toggleStatus = () => {
        setFormData((prev) => ({
            ...prev,
            status: !prev.status,
        }));
    };

    return (
        <Modal onClose={onClose}>
            <h1>
                Edit Brick                 
                <button
                    onClick={toggleStatus}
                    style={{
                        backgroundColor: formData.status ? "green" : "grey",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "10px"
                    }}
                >
                    {formData.status ? "Active" : "Pending"}
                </button>
            </h1>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                placeholder="Points"
            />
            <div style={{display: "flex", justifyContent: "end", gap: "10px"}}>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );}
