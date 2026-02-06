import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import VideoPlayer from "../Components/VideoPlayer";
import SideBar from "../Components/SideBar";
import FilterBar from "../Components/FilterBar";

export default function Video() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCat = searchParams.get("category") || "All";

  const handleCategoryChange = (newCat) => {
    setSearchParams({ category: newCat });
  };

  return (
    <>
      <FilterBar 
        activeCategory={currentCat} 
        setActiveCategory={handleCategoryChange} 
      />
      <div className="container-fluid mt-3 px-4">
        <div className="row">
          <div className="col-12 col-lg-8">
            <VideoPlayer id={id} category={currentCat} />
          </div>
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <SideBar cat={currentCat} />
          </div>
        </div>
      </div>
    </>
  );
}