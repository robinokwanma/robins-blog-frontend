import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../services/AppService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ArticleDetail.css';

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(slug)
      .then(response => setArticle(response.data))
      .catch(error => console.error('Error fetching article:', error));
  }, [slug]);

  if (!article) {
    return <p>Loading...</p>;
  }

  // Resolve full image URL
  const imageUrl = article.image.startsWith('/media/')
    ? `http://192.168.0.180:8000${article.image}` // Replace with your base API URL or Localhost Ip
    : article.image;

  return (
    <div>
      <Header />
      <div className="article-detail-container">
        <div className="article-card">
          <img
            src={imageUrl}
            alt={article.title}
            className="article-detail-image"
          />
          <h1 className="article-title">{article.title}</h1>
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.clean_content }}
          />
          <div className="article-meta">
            <p>
              <strong>Tags:</strong>{' '}
              {article.tags.map(tag => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </p>
            <p>
              <strong>Author:</strong> {article.author}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ArticleDetail;
