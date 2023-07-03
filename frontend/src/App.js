import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import CreateBlog from "./components/CreateBlog";
import UpdateBlog from "./components/UpdateBlog";

export const config = {
  endpoint: `http://localhost:8082`,
};

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/user/:id" element={<UserBlogs />} />
        <Route path="/blogs/update/:id" element={<UpdateBlog />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
