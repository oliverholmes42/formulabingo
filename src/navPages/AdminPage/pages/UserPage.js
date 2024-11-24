import { useEffect, useState } from "react";
import { ReadAll, Update } from "../../../api/User";

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(""); // State for search input

    const fetchUsers = async () => {
        try {
            const response = await ReadAll();
            setUsers(response);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleAdmin = async (user) => {
        const payload = { ...user, admin: !user.admin };
        try {
            await Update(user.id, payload);
            await fetchUsers(); // Refresh the user list after update
        } catch (error) {
            alert(`Error updating profile: ${error.message}`);
        }
    };
    const AddBoost = async (user) => {
        const payload = { ...user, boosts: user.boosts+1 };
        try {
            await Update(user.id, payload);
            await fetchUsers(); // Refresh the user list after update
        } catch (error) {
            alert(`Error updating profile: ${error.message}`);
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {/* Filter and Map Users */}
            {users.length > 0 ? (
                users
                    .filter((item) =>
                        item.username
                            .toLowerCase()
                            .includes(search.toLowerCase()) // Filter by username
                    )
                    .map((item) => (
                        <div className="Block hoverable" key={item.id}>
                            <h2>{item.username} {item.boosts} boosts</h2>
                            <button onClick={()=>AddBoost(item)}>
                                Add boost
                            </button>
                            <button
                                onClick={() => toggleAdmin(item)}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: item.admin
                                        ? "green"
                                        : "gray",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    marginBottom: "20px",
                                }}
                            >
                                {item.admin ? "Admin" : "User"}
                            </button>
                        </div>
                    ))
            ) : (
                <p>Loading users...</p>
            )}
        </>
    );
}
