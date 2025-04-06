import { useState } from "react";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        profileImage: null, // New field for the image file
    }); 

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formToSubmit = new FormData();
        // Append form data
        for (const key in formData) {
            formToSubmit.append(key, formData[key]);
        }

        const response = await fetch("http://localhost:5020/api/auth/signup", {
            method: "POST",
            body: formToSubmit, // Send FormData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful!");
        } else {
            alert(data.message);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profileImage") {
            setFormData({ ...formData, [name]: files[0] }); // Handle file input
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input
                
                    type="file"
                    name="profileImage"
                    onChange={handleChange} // Handle file input
                    accept="image/*" // Only accept image files
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;