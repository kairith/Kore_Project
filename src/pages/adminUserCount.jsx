import { useEffect, useState } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({ firstName: '', lastName: '', email: '', phone: '', gender: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/all-users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        console.log("Attempting to delete user with ID:", userId);
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`http://localhost:8000/users/${userId}/`, {
                    method: "DELETE",
                });
                console.log("Response status:", response.status);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Failed to delete user");
                }
                setUsers(users.filter(user => user.id !== userId));
            } catch (err) {
                console.error("Error deleting user:", err);
                setError(err.message);
            }
        }
    };

    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setUpdatedUser({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, gender: user.gender });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append("first_name", updatedUser.firstName);
        formData.append("last_name", updatedUser.lastName);
        formData.append("email", updatedUser.email);
        formData.append("phone", updatedUser.phone);
        formData.append("gender", updatedUser.gender);
    
        try {
            const response = await fetch(`http://localhost:8000/users/${editingUserId}/`, {
                method: "PUT",
                body: formData
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Response Error:", errorText);
                throw new Error("Failed to update user");
            }
    
            const result = await response.json();
            console.log(result.message);
    
            // Update the user in the local state
            setUsers(users.map(user => (user.id === editingUserId ? { ...user, ...updatedUser } : user)));
            setEditingUserId(null);
            setUpdatedUser({ firstName: '', lastName: '', email: '', phone: '', gender: '' });
        } catch (err) {
            setError(err.message);
        }
    };


    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">First Name</th>
                        <th className="border border-gray-300 p-2">Last Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Phone</th>
                        <th className="border border-gray-300 p-2">Gender</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border border-gray-300">
                            <td className="p-2">
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={updatedUser.firstName}
                                        onChange={handleUpdateChange}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    user.firstName
                                )}
                            </td>
                            <td className="p-2">
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={updatedUser.lastName}
                                        onChange={handleUpdateChange}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    user.lastName
                                )}
                            </td>
                            <td className="p-2">
                                {editingUserId === user.id ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={updatedUser.email}
                                        onChange={handleUpdateChange}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="p-2">
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        name="phone"
                                        value={updatedUser.phone}
                                        onChange={handleUpdateChange}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    user.phone
                                )}
                            </td>
                            <td className="p-2">
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        name="gender"
                                        value={updatedUser.gender}
                                        onChange={handleUpdateChange}
                                        className="border border-gray-300 p-1"
                                    />
                                ) : (
                                    user.gender
                                )}
                            </td>
                            <td className="p-2">
                                {editingUserId === user.id ? (
                                    <button 
                                        onClick={handleUpdateSubmit}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => handleEditClick(user)} 
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Update
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user.id)} 
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;