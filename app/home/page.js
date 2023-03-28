"use client";

import React, { useState, useEffect } from "react";
import Post from "../post/page";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts/", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwMDQ3MDE5LCJpYXQiOjE2ODAwNDM0MTksImp0aSI6IjEyY2E0NzIxMTg2YTQ3MGY5NzhiYTBjMjFkYTVkOGZiIiwidXNlcl9pZCI6MTgsImVtYWlsIjoiVGVzdHRlc3RAZ21haWwuY29tIn0.8qdrXLcW74J9887ynxpyip3miqD5N6xZJd51KSWseK0`,
          },
        });
        const data = await response.json();
        console.log(data);
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
