import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Data from "../Components/Data";
import {
  Download,
  Heart,
  Frown,
  HeartCrack,
  Play,
  Pause,
  Maximize,
  Volume2,
} from "lucide-react";

export default function VideoPlayer({ id: propId, category: propCat }) {
  const { id: urlId } = useParams();
  const [searchParams] = useSearchParams();
  
  const id = propId || urlId;
  const category = propCat || searchParams.get("category") || "all";

  const { videos } = Data(category, "");
  
  const [likes, setLikes] = useState(0);
  const [hasliked, setHasliked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Toggle for volume

  const videoRef = useRef(null);
  const fullscreenRef = useRef(null);

  const vi = videos.find((v) => String(v.id) === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (vi) {
      setLikes(vi.likes);
      setHasliked(false);
    }
  }, [id, vi]);

  const download = (url, vidId) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `video-${vidId}.mp4`;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
      });
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    setCurrent(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const seek = (e) => {
    const time = (e.target.value / 100) * duration;
    videoRef.current.currentTime = time;
    setCurrent(time);
  };

  const format = (t) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    videoRef.current.volume = v;
    setVolume(v);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const progressPercent = duration ? (current / duration) * 100 : 0;

  if (videos.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );
  }

  if (!vi) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="text-center p-4 border rounded shadow-sm bg-light">
          <Frown size={48} className="mb-3 text-danger" />
          <h5 className="mb-2">Video Non Trouvée</h5>
          <p className="text-muted mb-0">Check the category or ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100 mt-2">
      {/* SCOPED CSS FOR THE VERTICAL SLIDER */}
      <style>{`
        .vol-container { position: relative; display: flex; align-items: center; }
        .vol-popover { 
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          background: rgba(0,0,0,0.8); padding: 10px 5px; border-radius: 20px;
          display: flex; flex-direction: column; align-items: center; z-index: 100;
        }
        .vertical-range {
          appearance: slider-vertical; width: 5px; height: 80px; accent-color: red; cursor: pointer;
        }
      `}</style>

      <div
        ref={fullscreenRef}
        className="bg-black shadow-lg overflow-hidden rounded-3 position-relative d-flex align-items-center justify-content-center"
        style={{ width: "100%", background: "#000", aspectRatio: "16/9" }}
      >
        <video
          ref={videoRef}
          key={id}
          style={{ width: "100%", height: "100%", cursor: "pointer", objectFit: "contain" }}
          onTimeUpdate={onTimeUpdate}
          onClick={togglePlay}
        >
          <source src={vi.videos.medium?.url || vi.videos.small.url} type="video/mp4" />
        </video>

        <div style={{
          position: "absolute", bottom: 0, left: 0, width: "100%",
          background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
          display: "flex", alignItems: "center", padding: "10px", gap: 8, color: "#fff"
        }}>
          <button onClick={togglePlay} style={{ background: "none", border: "none", color: "#fff", padding: 0 }}>
            {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" />}
          </button>

          <span style={{ fontSize: "11px", whiteSpace: "nowrap" }}>
            {format(current)} / {format(duration)}
          </span>

          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent}
            onChange={seek}
            style={{
              flex: 1, height: "4px", cursor: "pointer", appearance: "none", outline: "none",
              background: `linear-gradient(to right, red ${progressPercent}%, #555 ${progressPercent}%)`,
              accentColor: "red"
            }}
          />

          {/* REWRITTEN VOLUME CONTROL - NO BOOTSTRAP JS NEEDED */}
          <div className="vol-container">
            <button 
               onClick={() => setShowVolumeSlider(!showVolumeSlider)}
               style={{ background: "none", border: "none", color: "#fff", padding: 0 }}
            >
              <Volume2 size={20} />
            </button>
            
            {showVolumeSlider && (
              <div className="vol-popover">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolume}
                  className="vertical-range"
                />
              </div>
            )}
          </div>

          <button onClick={toggleFullscreen} style={{ background: "none", border: "none", color: "#fff", padding: 0 }}>
            <Maximize size={20} />
          </button>
        </div>
      </div>

      <div className="mt-3 text-start">
        <div className="mb-1">
          {vi.tags.split(",").slice(0, 3).map((tag, index) => (
            <span key={index} className="text-primary small me-2" style={{ fontSize: "0.85rem" }}>
              #{tag.trim().replace(/\s+/g, "")}
            </span>
          ))}
        </div>

        <h1 className="fs-4 fw-bold mb-2 text-capitalize">
          {vi.tags.split(",").slice(0, 4).join(" & ")}
        </h1>

        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 flex-wrap">
          <span className="text-muted small">
            {parseInt(vi.views).toLocaleString()} views • {new Date().toLocaleDateString()}
          </span>

          <div className="d-flex gap-2 mt-2 mt-md-0">
            <button
              className="btn btn-outline-danger btn-sm rounded-pill d-flex align-items-center px-3"
              onClick={() => {
                setLikes((prev) => (hasliked ? prev : prev + 1));
                setHasliked(true);
                if (!hasliked) {
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 4000);
                }
              }}
            >
              <Heart size={16} fill={hasliked ? "red" : "none"} /> 
              <span className="ms-2 fw-bold">{likes}</span>
            </button>

            {showToast && (
              <div
                className="position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow-lg bg-dark text-white px-4 py-2 rounded-pill d-flex align-items-center"
                style={{ zIndex: 1050 }}
              >
                <span>Merci ! Mais on a déjà oublié votre like... (Pas de backend)<HeartCrack size={16} className="text-danger ms-2" /></span>
              </div>
            )}

            <button
              className="btn btn-outline-success btn-sm rounded-pill d-flex align-items-center px-3"
              onClick={() => {
                if (window.confirm("Voulez-vous télécharger cette vidéo ?")) {
                  download(vi.videos.medium?.url || vi.videos.small.url, vi.id);
                }
              }}
            >
              <Download size={16} /> <span className="ms-2">Télécharger</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}