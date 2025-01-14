import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/page.css'; // Make sure to create this CSS file with the styles provided earlier

interface PageProps {
  page_name: string;
}

const Page: React.FC<PageProps> = ({ page_name }) => {

  const navigate = useNavigate();


  return (
    <div className="page">
      <div className="page-content">
        <h2 className="page-title">{page_name}</h2>
      </div>
    </div>
  );
};

export default Page;