import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/VideoPlayer";
import SideBar from "../Components/SideBar";
import FilterBar from "../Components/FilterBar";
export default function Video() {
  const { id } = useParams();
 const [cat, setCat] = useState("All");
  return (
    <>
      <FilterBar activeCategory={cat} setActiveCategory={setCat} />
      <div className="container-fluid mt-3 px-4">
        <div className="row">
          <div className="col-12 col-lg-8">
            <VideoPlayer id={id} />
          </div>
          <div className="col-12 col-lg-4  mt-4 mt-lg-0">
            <SideBar  cat={cat}/>
          </div>
        </div>
      </div>
    </>
  );
}
