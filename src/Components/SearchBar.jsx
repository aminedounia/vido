import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
export default function SearchBar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      const formattedTerm = term.trim().replace(/\s+/g, '+');
      navigate(`/search?q=${formattedTerm}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="input-group">
      <input 
        type="text" 
        className="form-control" 
        placeholder="e.g. yellow flower" 
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-danger"><Search/></button>
    </form>
  );
}