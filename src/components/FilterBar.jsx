import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Building, CircleDollarSign, Star, Clock, Zap, Filter } from 'lucide-react';
import axios from 'axios'

export default function FilterBar({ activeFilter, onFilterChange, onAdvancedFilterChange }) {
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState({
        startupCost: '',
        difficulty: '',
        timeCommitment: '',
        speedToRevenue: '',
        businessType: ''
    });

    const [mainCategories, setMainCategories] = useState([]);

    const advancedFiltersRef = useRef(null);



    useEffect(() => {

        axios.get('http://localhost:1337/api/categories')
            .then(response => {
                setMainCategories(response.data.data);
                console.log('Fetched', response.data.data);
            })
            .catch(error => {
                console.log(error, 'Error');
            })

    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (advancedFiltersRef.current && !advancedFiltersRef.current.contains(event.target) &&
                showAdvancedFilters && !(event.target.classList?.contains('advanced-filter-toggle'))) {
                setShowAdvancedFilters(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAdvancedFilters]);

    const handleFilterChange = (key, value) => {
        const newValue = advancedFilters[key] === value ? '' : value;
        const newFilters = { ...advancedFilters, [key]: newValue };
        setAdvancedFilters(newFilters);
        onAdvancedFilterChange(newFilters);
    };

    return (
        <section className="z-40">
            <div className="space-y-4">
                {/* Category Buttons */}
                <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
                    <button
                        key={'all'}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeFilter === 'all'
                            ? 'bg-primary text-white'
                            : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                        onClick={() => onFilterChange('all')}
                    >
                        All
                    </button>
                    {mainCategories?.map(category => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 capitalize rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeFilter === category.id
                                ? 'bg-primary text-white'
                                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                                }`}
                            onClick={() => onFilterChange(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Advanced Filters Toggle */}
                <div className="flex justify-end">
                    <button
                        className={`advanced-filter-toggle px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${showAdvancedFilters
                            ? 'bg-primary text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                        <Filter className="h-4 w-4" />
                        <span>Advanced Filters</span>
                        {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                </div>

                {/* Advanced Filters Panel */}
                {showAdvancedFilters && (
                    <motion.div
                        ref={advancedFiltersRef}
                        className="bg-white shadow-md rounded-lg p-5 mt-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="space-y-5">
                            {/* Business Type */}
                            {renderFilterSection('Business Type', [
                                { id: 'B2B', label: 'B2B' },
                                { id: 'B2C', label: 'B2C' },
                                { id: 'B2B,B2C', label: 'B2B/B2C' }
                            ], advancedFilters.businessType, (id) => handleFilterChange('businessType', id), Building)}

                            {/* Startup Cost */}
                            {renderFilterSection('Startup Cost', [
                                { id: '$', label: '$' },
                                { id: '$$', label: '$$' },
                                { id: '$$$', label: '$$$' },
                                { id: '$$$$', label: '$$$$' },
                                { id: '$$$$$', label: '$$$$$' }
                            ], advancedFilters.startupCost, (id) => handleFilterChange('startupCost', id), CircleDollarSign)}

                            {/* Difficulty */}
                            {renderFilterSection('Difficulty', [
                                { id: '1', label: 'Easy' },
                                { id: '2', label: 'Medium' },
                                { id: '3', label: 'Hard' },
                                { id: '4', label: 'Very Hard' },
                                { id: '5', label: 'Extreme' }
                            ], advancedFilters.difficulty, (id) => handleFilterChange('difficulty', id), Star)}

                            {/* Time Commitment */}
                            {renderFilterSection('Time Commitment', [
                                { id: '5-10 hrs/week', label: '< 10 hrs/week' },
                                { id: '10-20 hrs/week', label: '10-20 hrs/week' },
                                { id: '20-30 hrs/week', label: '20-30 hrs/week' },
                                { id: '30-40 hrs/week', label: '30+ hrs/week' }
                            ], advancedFilters.timeCommitment, (id) => handleFilterChange('timeCommitment', id), Clock)}

                            {/* Speed to Revenue */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Zap className="h-4 w-4 mr-1 text-gray-500" /> Revenue Speed
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['1-3 months', '3-6 months', '6-12 months'].map(period => (
                                        <button
                                            key={period}
                                            className={`px-4 py-2 text-sm rounded-full transition-colors ${advancedFilters.speedToRevenue === period
                                                ? 'bg-primary/10 text-primary border border-primary/30'
                                                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                                                }`}
                                            onClick={() => handleFilterChange('speedToRevenue', period)}
                                        >
                                            {period === '1-3 months' ? 'Less than 3 months' : period}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clear All */}
                            <div className="pt-2">
                                <button
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm transition-colors"
                                    onClick={() => {
                                        const emptyFilters = {
                                            startupCost: '',
                                            difficulty: '',
                                            timeCommitment: '',
                                            speedToRevenue: '',
                                            businessType: ''
                                        };
                                        setAdvancedFilters(emptyFilters);
                                        onAdvancedFilterChange(emptyFilters);
                                    }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function renderFilterSection(title, options, selectedValue, onClick, IconComponent) {
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <IconComponent className="h-4 w-4 mr-1 text-gray-500" /> {title}
            </h3>
            <div className="flex flex-wrap gap-2">
                {options.map(option => (
                    <button
                        key={option.id}
                        className={`px-4 py-2 text-sm rounded-full transition-colors ${selectedValue === option.id
                            ? 'bg-primary/10 text-primary border border-primary/30'
                            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                            }`}
                        onClick={() => onClick(option.id)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
