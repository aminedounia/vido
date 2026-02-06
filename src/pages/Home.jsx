import React, { useState } from "react";
import icon from '../../public/icon.svg'
import { Link } from 'react-router-dom';
import Data from "../Components/Data";
import FilterBar from "../Components/FilterBar";
import { Heart } from 'lucide-react'

export default function Home() {
  const [cat, setCat] = useState("");
  const { videos } = Data(cat, "");

  return (
    <div dir="ltr">
      <div className="container-fluid px-0 px-md-4 mt-1"> 
        <FilterBar 
          activeCategory={ cat }
   
          setActiveCategory={setCat} 
        />

        <div className="row g-0 g-md-4 mt-2"> 
          {videos && videos.map((vi) => (
            <Link 
              to={`/watch/${vi.id}?category=${cat}`} 
              key={vi.id}
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-decoration-none mb-4"
            >
              <div className="card border-0 bg-transparent text-start p-0 h-100"> 
                <div className="position-relative overflow-hidden rounded-0 rounded-md-3 bg-black">
                  <img
                    src={vi.videos.tiny.thumbnail}
                    alt={vi.tags}
                    className="w-100" 
                    style={{ height: "240px", objectFit: "cover" }}
                  />
                  <div className="position-absolute translate-middle top-50 start-50">
                    <img src={icon} style={{ width: "50px", opacity: "0.7" }} alt="play" />
                  </div>
                  <div className="badge bg-dark position-absolute m-2 px-2 py-1" style={{ bottom: "5px", right: "5px" }}>
                    {vi.duration}s
                  </div>
                </div>
                <div className="card-body px-3 px-md-0 pt-2">
                  <h6 className="card-title text-dark fw-bold mb-1">
                    { vi.tags.split(',').slice(0, 4).join(' & ') }
                  </h6>
                  <div className="d-flex align-items-center mt-2 small text-muted">
                    <span>{parseInt(vi.views).toLocaleString()} views</span>
                    <span className="mx-1">•</span>
                    <span className="text-danger d-flex align-items-center">
                      <Heart size={14} className="me-1" /> {vi.likes || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}