import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/AppService';
import Header from './Header';
import Footer from './Footer';
import './ArticleList.css';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then(response => {
        setArticles(response.data.results || response.data); // Adjust based on your API response
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div>
      <Header />

      <div className="article-list-container">
        <div className="articles-grid">
          {articles.map(article => (
            <div className="article-card" key={article.id}>
              <img
                src={article.image || 'https://via.placeholder.com/150'}
                alt={article.title}
                className="article-image"
              />
              <div className="article-content">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-meta">{article.meta_description}</p>
                <a href={`/article/${article.slug}`} className="read-more">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ArticleList;
