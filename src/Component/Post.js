import React, { useEffect, useState } from "react";
import { getPost, deletePost } from "../Services/postservice";
import FormPost from "./PostForm";

export default function Post() {
  const [getpost, setpost] = useState([]);
  const [edit, setEditing] = useState(null);

  useEffect(() => {
    getPost().then((res) => setpost(res.data));
  }, []);

  const handleDelete = (id) => {
    deletePost(id).then((data) => {
      setpost(getpost.filter((post) => post.id !== id));
    });
  };

  const handleEditing = (data) => {
    setEditing(data);
  };

  return (
    <div>
      <h1>Different Post</h1>
      <FormPost
        getpost={getpost}
        setPost={setpost}
        edit={edit}
        setEditing={setEditing}
      ></FormPost>
      {getpost.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Can Delete</button>
            <button onClick={() => handleEditing(post)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
}
