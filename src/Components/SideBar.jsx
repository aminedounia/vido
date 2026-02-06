import React from 'react'
import Data from './Data'
import { Link } from 'react-router-dom'

export default function SideBar({cat}) {
  const { videos } = Data(cat, "");
  
  return (
    <aside className="container-fluid p-0 text-start" dir="ltr">
      {videos.map((vi) => (
        <Link 
          to={`/watch/${vi.id}?category=${cat}`} 
          key={vi.id}
          className="text-decoration-none d-block mb-3"
        >
          <div className="row g-2 align-items-start">
            
           
            <div className="col-5 position-relative">
              <img
                src={vi.videos.tiny.thumbnail}
                alt={vi.tags}
                className="rounded-3 w-100 shadow-sm"
                style={{
                  height: "100px", 
                  objectFit: "cover",
                  
                }}
              />
              <div 
                className="badge bg-danger position-absolute px-1 py-1" 
                style={{ bottom: "4px", right: "4px", fontSize: "10px", opacity: "0.9" }}
              >
                {vi.duration}s
              </div>
            </div>

         
            <div className="col-7">
              <h6 
                className="text-dark fw-bold mb-1" 
                style={{ 
                  fontSize: "14px", 
                  display: "-webkit-box", 
                  WebkitLineClamp: "2", 
                  WebkitBoxOrient: "vertical", 
                  overflow: "hidden",
                  lineHeight: "1.2"
                }}
              >
                {vi.tags ? vi.tags.split(',').slice(0, 3).join(' • ') : 'Video tags'}
              </h6>
              
              <div className="text-muted" style={{ fontSize: "12px" }}>
                <div className="mb-0">{parseInt(vi.views).toLocaleString()} views</div>
                <div className="text-danger fw-medium">{vi.likes || 0} likes</div>
              </div>
            </div>

          </div>
        </Link>
      ))}
    </aside>
  )
}