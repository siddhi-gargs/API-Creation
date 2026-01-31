import axios from "axios";

const createpost = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

const getPost = () => createpost.get("/posts");
const deletePost = (id) => createpost.delete(`/posts/${id}`);
const addPost = (data) => createpost.post("/posts", data);
const updatePost = (id, data) => createpost.put(`/posts/${id}`, data);

export { getPost, deletePost, addPost, updatePost };
