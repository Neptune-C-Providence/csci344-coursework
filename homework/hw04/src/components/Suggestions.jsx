import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion";

export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        async function fetchSuggestions() {
            const data = await getDataFromServer(token, "/api/suggestions");
            console.log(data);
            setSuggestions(data);
        }
        fetchSuggestions();
    }, []);

    const renderSuggestion = (user) => (
        <Suggestion key={user.id} postData={user} token={token} />
    );

    return (
        <div className="mt-4">
            <p className="text-base text-gray-400 font-bold mb-4">
                Suggestions for you
            </p>
            {suggestions.map(renderSuggestion)}
        </div>
    );
}