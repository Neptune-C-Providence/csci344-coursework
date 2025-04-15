import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function Like({ likeID, postID, token }) {
  console.log(likeID);

  const [currentLikeID, setCurrentLikeID] = useState(likeID);

  const createLike = async () => {
    const dataToSend = { post_id: postID };
    const res = await postDataToServer(token, "/api/likes", dataToSend);
    console.log(res);
    setCurrentLikeID(res.id);
  };

  const deleteLike = async () => {
    const url = `/api/likes/${currentLikeID}`;
    await deleteDataFromServer(token, url);
    setCurrentLikeID(null);
  };

  console.log(likeID);
  console.log(currentLikeID);

  const isLiked = !!currentLikeID;

  return isLiked ? (
    <button
      onClick={deleteLike}
      aria-label="Like post on"
      aria-checked="true"
    >
      <i className="fas fa-heart text-red-700"></i>
    </button>
  ) : (
    <button
      onClick={createLike}
      aria-label="Like post off"
      aria-checked="false"
    >
      <i className="far fa-heart"></i>
    </button>
  );
}