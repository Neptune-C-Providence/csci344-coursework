import React, { useState, useEffect } from "react";
import Bookmark from "./Bookmark";
import Like from "./Like";

export default function Post({ postData, token }) {
  return (
    <section className="bg-white border mb-10">
      <div className="p-4 flex justify-between">
        <h3 className="text-lg font-Comfortaa font-bold">
          {postData.user.username}
        </h3>
        <button className="icon-button" aria-label="More info">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
      <img
        src={postData.image_url}
        alt={postData.alt_text || "Post photo"}
        width="300"
        height="300"
        className="w-full bg-cover"
      />
      <div className="p-4">
        <div className="flex justify-between text-2xl mb-3">
          <div className="flex gap-2">
            <Like
              likeID={postData.current_user_like_id}
              postID={postData.id}
              token={token}
            />
            <button aria-label="Comment on post">
              <i className="far fa-comment"></i>
            </button>
            <button aria-label="Share post">
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
          <div>
            <Bookmark
              bookmarkID={postData.current_user_bookmark_id}
              postID={postData.id}
              token={token}
            />
          </div>
        </div>
        <p className="font-bold mb-3">{postData.likes.length} likes</p>
        <div className="text-sm mb-3">
          <p>
            <strong>{postData.user.username}</strong> {postData.caption}{" "}
            <button
              className="button link text-blue-700"
              aria-label="Full description"
            >
            </button>
          </p>
        </div>{" "}
        <p className="uppercase text-gray-500 text-xs">
          {postData.display_time}
        </p>
        {renderComments(postData)}
      </div>
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-3 min-w-[80%]">
          <i className="far fa-smile text-lg"></i>
          <input
            type="text"
            className="min-w-[80%] focus:outline-none"
            placeholder="Add a comment..."
            aria-label="Add a comment"
          />
        </div>
        <button className="text-blue-700 py-2" aria-label="Post comment">
          Post
        </button>
      </div>
    </section>
  );
}

function renderComments(postData) {
  let l = postData.comments.length;
  if (l == 1) {
    return (
      <div>
        {" "}
        <p className="text-sm mb-3">
          <strong>{postData.comments[0].user.username} </strong>
          {postData.comments[0].text}
        </p>
        <p className="uppercase text-gray-500 text-xs">
          {postData.comments[l - 1].display_time}
        </p>
      </div>
    );
  }
  
  if (l > 1) {
    return (
      <div>
        <br></br>
        <button className="link text-blue-700" aria-label="View all comments">
          View all {l} comments
        </button>
        <div className="comments">
          <br></br>
          <div>
            {" "}
            <p className="text-sm mb-3">
              <strong>{postData.comments[l - 1].user.username} </strong>
              {postData.comments[l - 1].text}
            </p>
          </div>
        </div>
        <p className="uppercase text-gray-500 text-xs">
          {postData.comments[l - 1].display_time}
        </p>
      </div>
    );
  }
}