import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/nav/Navbar";
import { CreatePost } from "./pages/post/create-post";
import { Login } from "./pages/login";
import { Main } from "./pages/main/main";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
