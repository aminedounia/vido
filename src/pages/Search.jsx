import React from 'react';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Data from '../Components/Data';
import FilterBar from '../Components/FilterBar';
export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || "";
    const [cat, setCat] = useState("");
  const { videos } = Data(cat , query);
  return (
    <>
    <FilterBar 
              activeCategory={ cat }
       
              setActiveCategory={setCat} 
            />
    <div className="container-fluid py-3" dir="ltr">
      {videos.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No results found for "{query}"</h4>
        </div>
      ) : (

        <div className="row g-3"> 
          {videos.map((vi) => (
           
            <div key={vi.id} className="col-12 col-md-6 col-lg-4">
              <Link to={`/watch/${vi.id}?category=${cat}`}  className="text-decoration-none d-block card border-0 shadow-sm p-2 h-100">
                <div className="row g-2 align-items-start">
                  
                  <div className="col-5 position-relative">
                    <img
                      src={vi.videos.tiny.thumbnail}
                      alt={vi.tags}
                      className="rounded-3 w-100"
                      style={{ height: "90px", objectFit: "cover" }}
                    />
                    <div className="badge bg-dark position-absolute px-1 py-1" style={{ bottom: "4px", right: "4px", fontSize: "10px", opacity: "0.8" }}>
                      {vi.duration}s
                    </div>
                  </div>

                  {/* Right Side: Info */}
                  <div className="col-7">
                    <h6 className="text-dark fw-bold mb-1" style={{ fontSize: "14px", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.2" }}>
                      {vi.tags ? vi.tags.split(',').slice(0, 3).join(' • ') : 'Video tags'}
                    </h6>
                    <div className="text-muted" style={{ fontSize: "11px" }}>
                      <div>{parseInt(vi.views).toLocaleString()} views</div>
                      <div className="text-danger fw-medium">{vi.likes || 0} likes</div>
                    </div>
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}