import React, { useEffect, useState } from 'react';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(20);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/getImages');
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error('Failed to fetch images', err);
      }
    };

    fetchImages();
  }, []);

  // Infinite scroll with body scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setCount(prev => prev + 20); // Load 20 more images
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleImages = images.slice(0, count);

  return (
    <div className="image-grid">
      {visibleImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Image ${index}`}
          loading="lazy"
          style={{ width: '100%', maxWidth: '600px', margin: '20px auto', display: 'block' }}
        />
      ))}
    </div>
  );
};

export default ImageList;
