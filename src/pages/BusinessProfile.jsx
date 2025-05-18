import React from 'react';
import BusinessProfileContent from '../components/BusinessProfileContent';

const BusinessProfile = () => {
    return (
        <>
            <div className="single-article-wrapper">
                <header className="bg-gradient-to-r from-primary to-primary/80 text-white py-20 px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4 max-w-4xl mx-auto flex items-center justify-center">
                        Micro SaaS Tool
                    </h1>
                    <p className="text-xl max-w-4xl mx-auto flex items-center justify-center">
                        How to build a profitable business in this market.
                    </p>
                </header>

                <div className="relative">
                    <div className="mx-auto max-w-6xl article-content px-6 -mt-8">
                        <div className="border bg-card text-card-foreground bg-white grid grid-cols-2 md:grid-cols-5 shadow-md rounded-lg">
                            <div className="text-center py-6">
                                <div className="text-xl font-bold text-primary">$$$</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase">
                                    START-UP COSTS
                                </div>
                            </div>

                            <div className="text-center py-6">
                                <div className="text-xl font-bold text-primary">★★★★☆</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase">
                                    DIFFICULTY
                                </div>
                            </div>

                            <div className="text-center py-6">
                                <div className="text-xl font-bold text-primary">30-40 hrs/week</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase">
                                    TIME COMMITMENT
                                </div>
                            </div>

                            <div className="text-center py-6">
                                <div className="text-xl font-bold text-primary">6-12 months</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase">
                                    SPEED TO REVENUE
                                </div>
                            </div>

                            <div className="text-center py-6">
                                <div className="text-xl font-bold text-green-600 flex items-center justify-center">
                                    $15,000/mo
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-arrow-up-right ml-1 h-4 w-4"
                                    >
                                        <path d="M7 7h10v10"></path>
                                        <path d="M7 17L17 7"></path>
                                    </svg>
                                </div>
                                <div className="text-xs font-semibold text-gray-500 uppercase">
                                    POTENTIAL REVENUE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BusinessProfileContent />
            </div>
        </>
    );
};

export default BusinessProfile;
