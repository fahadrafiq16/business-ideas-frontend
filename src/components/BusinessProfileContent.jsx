import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const BusinessProfileContent = () => {

    const { documentId } = useParams(); // id is your documentId from URL
    console.log(documentId);
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/articles/${documentId}?populate=*`);
                const json = await res.json();
                setArticle(json.data);
                console.log(res);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [documentId]);

    if (!article) return <p className="text-center p-10">Loading...</p>;

    return (
        <>
            <main className="flex-grow px-6 py-16 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            
                                <div
                                    className="prose article-single-content max-w-none text-left px-6 py-6"
                                    dangerouslySetInnerHTML={{ __html: article.Ckeditor5 }}
                                />
                        

                        </div>
                    </div>
                </div>
            </main>

        </>
    );
};

export default BusinessProfileContent;
