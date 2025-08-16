import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for your favorite recipes..."
          className="w-full pl-10 pr-20 py-3 rounded-full border-2 border-orange-200 focus:border-orange-400 focus:outline-none bg-white shadow-sm text-gray-700 placeholder-gray-400 transition-colors"
        />
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}