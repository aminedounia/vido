import React, { useEffect, useState, useRef } from "react";
import Data from "../Components/Data";
import { Download, Heart, Frown, Play, Pause, Maximize, Volume2, HeartCrack } from "lucide-react";

export default function VideoPlayer({ id, category }) {
  const { videos } = Data(category || "all", "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVol, setShowVol] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const videoRef = useRef(null);
  const fullscreenRef = useRef(null);

  const vi = videos.find((v) => String(v.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (videos.length === 0) return <div className="p-5 text-center">Loading...</div>;
  if (!vi) return <div className="p-5 text-center"><Frown size={48} /><h5>Video Not Found</h5></div>;

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="w-100">
      {/* INLINE COMPONENT STYLES */}
      <style>{`
        .player-box { position: relative; width: 100%; background: #000; border-radius: 12px; overflow: hidden; aspect-ratio: 16/9; }
        .player-controls { position: absolute; bottom: 0; left: 0; right: 0; padding: 15px; background: linear-gradient(transparent, rgba(0,0,0,0.9)); display: flex; align-items: center; gap: 12px; z-index: 10; }
        .red-progress { flex-grow: 1; height: 4px; cursor: pointer; accent-color: #ff0000; }
        .vol-wrap { position: relative; display: flex; align-items: center; }
        .vol-pop { position: absolute; bottom: 45px; left: 50%; transform: translateX(-50%); background: #1a1a1a; padding: 12px 8px; border-radius: 20px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.5); z-index: 100; }
        .vol-pop input { appearance: slider-vertical; writing-mode: bt-lr; width: 6px; height: 80px; accent-color: #ff0000; cursor: pointer; }
      `}</style>

      <div ref={fullscreenRef} className="player-box">
        <video
          ref={videoRef}
          key={id}
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
          onTimeUpdate={() => setCurrent(videoRef.current.currentTime)}
          onLoadedMetadata={() => setDuration(videoRef.current.duration)}
          onClick={togglePlay}
        >
          <source src={vi.videos.medium?.url || vi.videos.small.url} type="video/mp4" />
        </video>

        <div className="player-controls">
          <button onClick={togglePlay} className="btn border-0 p-0 text-white">
            {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
          </button>

          <span className="text-white small" style={{ minWidth: '65px', fontFamily: 'monospace' }}>
            {Math.floor(current / 60)}:{Math.floor(current % 60).toString().padStart(2, "0")}
          </span>

          <input
            type="range"
            className="red-progress"
            value={(current / duration) * 100 || 0}
            onChange={(e) => videoRef.current.currentTime = (e.target.value / 100) * duration}
          />

          <div className="vol-wrap">
            <button className="btn border-0 p-0 text-white" onClick={() => setShowVol(!showVol)}>
              <Volume2 size={22} />
            </button>
            {showVol && (
              <div className="vol-pop">
                <input
                  type="range" min="0" max="1" step="0.01" value={volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    videoRef.current.volume = v;
                    setVolume(v);
                  }}
                />
              </div>
            )}
          </div>

          <button onClick={toggleFullscreen} className="btn border-0 p-0 text-white">
            <Maximize size={22} />
          </button>
        </div>
      </div>

      <div className="mt-3 text-start">
        <h1 className="h4 fw-bold text-capitalize">{vi.tags.split(',').slice(0, 3).join(' ')}</h1>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
          <span className="text-muted small">{parseInt(vi.views).toLocaleString()} views</span>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-danger btn-sm rounded-pill px-3" 
              onClick={() => { setHasLiked(true); setShowToast(true); setTimeout(() => setShowToast(false), 3000); }}
            >
              <Heart size={16} fill={hasLiked ? "red" : "none"} /> Like
            </button>
            <button className="btn btn-outline-success btn-sm rounded-pill px-3" onClick={() => window.open(vi.videos.medium?.url)}>
              <Download size={16} /> Save
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 bg-dark text-white px-4 py-2 rounded-pill shadow" style={{ zIndex: 2000 }}>
          Merci ! Mais on a déjà oublié votre like... (Pas de backend)<HeartCrack size={16} className="text-danger ms-2" />
        </div>
      )}
    </div>
  );
}