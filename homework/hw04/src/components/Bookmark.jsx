import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function Bookmark({ bookmarkID, postID, token }) {
  const [currentBookmarkID, updateBookmarkID] = useState(bookmarkID);

  const createBookmark = async () => {
    const payload = { post_id: postID };
    const result = await postDataToServer(token, "/api/bookmarks", payload);
    updateBookmarkID(result.id);
  };

  const deleteBookmark = async () => {
    const endpoint = `/api/bookmarks/${currentBookmarkID}`;
    await deleteDataFromServer(token, endpoint);
    updateBookmarkID(null);
  };

  const isBookmarked = Boolean(currentBookmarkID);

  return isBookmarked ? (
    <button
      onClick={deleteBookmark}
      aria-label="Bookmark post on"
      aria-checked="true"
    >
      <i className="fas fa-bookmark"></i>
    </button>
  ) : (
    <button
      onClick={createBookmark}
      aria-label="Bookmark post off"
      aria-checked="false"
    >
      <i className="far fa-bookmark"></i>
    </button>
  );
}