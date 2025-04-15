import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Stories({ token }) {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        async function fetchStories() {
            const data = await getDataFromServer(token, "/api/stories");
            console.log(data);
            setStories(data);
        }
        fetchStories();
    }, []);

    function renderStory(story) {
        return (
            <div className="flex flex-col justify-center items-center" key={story.id}>
                <img
                    src={story.user.thumb_url}
                    className="rounded-full border-4 border-gray-300"
                    alt="user thumbnail"
                />
                <p className="text-xs text-gray-500">{story.user.username}</p>
            </div>
        );
    }

    return (
        <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
            {stories.map(renderStory)}
        </header>
    );
}
