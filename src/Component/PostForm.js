import React, { useEffect, useState } from "react";
import { addPost, updatePost } from "../Services/postservice";

export default function FormPost({ getpost, setPost, edit, setEditing }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (edit) {
      setTitle(edit.title);
      setBody(edit.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    edit ? editPost() : addnewPost();
    setTitle("");
    setBody("");
  };

  const addnewPost = () => {
    let id = 201;
    addPost({
      id: id++,
      title,
      body,
    }).then((response) => {
      setPost([...getpost, response.data]);
    });
  };

  const editPost = () => {
    updatePost(edit.id, {
      title,
      body,
    }).then((response) => {
      setPost(
        getpost.map((data) => (data.id === edit.id ? response.data : data)),
      );
      setEditing(null);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <div style={{ margin: "10px" }}>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        Body
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">{edit ? "Edit Post" : "ADD POST"}</button>
    </form>
  );
}
