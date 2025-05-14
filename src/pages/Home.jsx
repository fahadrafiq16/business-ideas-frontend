import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import BusinessCard from '../components/BusinessCard';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import Hero from '../components/Hero';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Home = () => {
    const [cardsData, setCardsData] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [advancedFilters, setAdvancedFilters] = useState({});
    const [searchTitle, setSearchTitle] = useState('');
    const [loading, setLoading] = useState(false);

    async function fetchArticles(category = 'all', extraFilters = {}, title = '') {
        try {

            setLoading(true);

            const query = new URLSearchParams();

            if (category !== 'all') {
                query.append('category', category);
            }

            Object.entries(extraFilters).forEach(([key, value]) => {
                if (value) {
                    query.append(key, value);
                }
            });

            if (title) {
                query.append('title', title);
            }

            let queryString = query.toString();

            // Fix encoded parts
            queryString = queryString
                .replace(/%24/g, '$')       // fix $ → $ 
                .replace(/\+/g, ' ')        // fix + → space
                .replace(/%2F/g, '/');      // fix %2F → /

            const url = `${BASE_URL}/api/get-articles${queryString ? `?${queryString}` : ''}`;
            console.log('Fetching:', url);
            const response = await axios.get(url);
            setCardsData(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category') || 'all';
        setActiveCategory(category);
        fetchArticles(category, advancedFilters, searchTitle);
    }, []);

    const handleCategoryChange = (newCategory) => {
        setActiveCategory(newCategory);
        const urlCategory = newCategory === 'all' ? '' : `?category=${newCategory}`;
        window.history.pushState({}, '', `/${urlCategory}`);
        fetchArticles(newCategory, advancedFilters, searchTitle);
    };

    const handleAdvancedFiltersChange = (newFilters) => {
        setAdvancedFilters(newFilters);
        fetchArticles(activeCategory, newFilters, searchTitle);
    };

    const handleSearchChange = (newTitle) => {
        setSearchTitle(newTitle);
        fetchArticles(activeCategory, advancedFilters, newTitle);
    };

    return (
        <>

            <Hero />
            <section className="bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-4 py-6">

                    <SearchBar
                        onSearch={handleSearchChange}
                        initialQuery={searchTitle}
                        activeCategory={activeCategory}
                    />

                    <FilterBar
                        activeFilter={activeCategory}
                        onFilterChange={handleCategoryChange}
                        onAdvancedFilterChange={handleAdvancedFiltersChange}
                    />
                </div>
            </section>

            {
                loading ? <div className="loader"></div> :
                    <section className="py-8 md:py-12 flex-grow">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(
                                    Array.isArray(cardsData) && cardsData.map((idea, index) => (
                                        <BusinessCard key={idea.id || index} idea={idea} index={index} />
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
            }


        </>
    );
};

export default Home;
