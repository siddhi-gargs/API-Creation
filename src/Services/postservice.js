import axios from "axios";

const apiManager = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiManager.interceptors.response.use(
  (response) => {
    console.log("Response Received", response.data);
    return response;
  },
  (error) => {
    Promise.reject(error);
  },
);

const getPost = () => apiManager.get("/posts");
const deletePost = (id) => apiManager.delete(`/posts/${id}`);
const addPost = (data) => apiManager.post("/posts", data);
const updatePost = (id, data) => apiManager.put(`/posts/${id}`, data);

export { getPost, deletePost, addPost, updatePost };
