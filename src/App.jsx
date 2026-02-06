import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./pages/Video";
import Search from "./pages/Search";
import Header from "./Components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
<div style={{ paddingTop: '80px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}
