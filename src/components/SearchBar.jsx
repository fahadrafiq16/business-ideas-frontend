import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, initialQuery = '', placeholder = 'Find your next business idea...' }) {
    const [query, setQuery] = useState(initialQuery);
    const inputRef = useRef(null);

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary/70" />
            </div>
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors text-gray-700 placeholder-gray-500"
                value={query}
                onChange={handleChange}
            />
        </form>
    );
}
