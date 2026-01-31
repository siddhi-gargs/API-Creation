import React, { useEffect, useState } from "react";
import { addPost, updatePost } from "../Services/postservice";

export default function FormPost({
  getpost,
  setPost,
  editMode,
  setEditingMode,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editMode) {
      setTitle(editMode.title);
      setBody(editMode.body);
    } else {
      clearInputs();
    }
  }, [editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editMode ? editPost() : addnewPost();
    clearInputs();
  };

  const clearInputs = () => {
    setTitle("");
    setBody("");
  };

  const addnewPost = () => {
    addPost({
      title,
      body,
    }).then((response) => {
      setPost([...getpost, response.data]);
    });
  };

  const editPost = () => {
    updatePost(editMode.id, {
      title,
      body,
    }).then((response) => {
      setPost(
        getpost.map((data) => (data.id === editMode.id ? response.data : data)),
      );
      setEditingMode(null);
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
