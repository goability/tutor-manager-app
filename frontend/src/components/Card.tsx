import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/card.css'; // Make sure to create this CSS file with the styles provided earlier

interface CardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  route?:string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, subtitle, description, route }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  }

  return (
    <div className="card" onClick={handleClick} style={{ cursor: route ? 'pointer' : 'default' }}>
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <h3 className="card-subtitle">{subtitle}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;