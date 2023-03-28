"use client";

import React, { useState, useEffect } from "react";
import Post from "../post/page";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts/", {
          headers: {
            Authorization: `Bearer 'token'`,
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Main feed page.</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
