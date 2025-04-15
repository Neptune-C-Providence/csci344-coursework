import React, { useState } from "react";
import { postDataToServer } from "../server-requests";

export default function Suggestion({ postData, token }) {
    const [followID, setFollowID] = useState(postData.id);

    const followUser = async () => {
        const data = { user_id: postData.id };
        const response = await postDataToServer(token, "/api/following", data);
        console.log(response);
        setFollowID(null);
    };

    return (
        <section className="flex justify-between items-center mb-4 gap-2">
            <img
                src={postData.thumb_url}
                alt="user thumbnail"
                className="rounded-full"
            />
            <div className="w-[180px]">
                <p className="font-bold text-sm">{postData.username}</p>
                <p className="text-gray-500 text-xs">suggested for you</p>
            </div>
            {followID ? (
                <button
                    className="text-blue-500 text-sm py-2"
                    onClick={followUser}
                >
                    follow
                </button>
            ) : (
                <p className="text-green-600 text-sm">Following</p>
            )}
        </section>
    );
}