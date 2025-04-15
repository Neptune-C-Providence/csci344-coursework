import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Profile({ token }) {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const data = await getDataFromServer(token, "/api/profile/");
            console.log(data);
            setUserProfile(data);
        }
        fetchProfile();
    }, [token]);

    if (!userProfile) return null;

    return (
        <div className="flex items-center space-x-4 p-2">
            <img
                src={userProfile?.image_url}
                alt={userProfile?.image_url}
                className="w-16 h-16 rounded-full object-cover"
            />
            <div>
                <h2 className="text-2xl font-Comfortaa font-semibold">
                    {userProfile?.username}
                </h2>
            </div>
        </div>
    );
}
