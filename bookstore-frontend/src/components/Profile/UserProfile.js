import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}` // Attach token for authentication
                }
            });
            setUserProfile(response.data);
        } catch (err) {
            setError(err.message); // Handle errors
            console.error("Error fetching user profile:", err);
        }
    };

    useEffect(() => {
        fetchUserProfile(); // Call function to fetch user data on component mount
    }, []);

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>; // Display error message if fetching fails
    }

    if (!userProfile) {
        return <div className="text-center">Loading...</div>; // Loading state while fetching data
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">User Profile</h1>
            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title">Profile Details</h5>
                    <p className="card-text"><strong>Email:</strong> {userProfile.email}</p>
                    {/* Add other user profile details here */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

