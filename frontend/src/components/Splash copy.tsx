import React from 'react';
import Card from './Card';
import '../styles/splash.css';

const Splash: React.FC = () => {
    return (
        <div className="Splash">
            <main className="Splash-main">
                <div className="Splash-image">
                    <img
                        src="./images/tutor-splash1.webp"
                        alt="Math tutoring"
                        width="0"
                        height="0"
                    />
                </div>

                <div className="card-container">
                    <Card
                        imageUrl="./images/symbols-primary.jpeg"
                        title="Primary Mathematics"
                        subtitle="Grades 3-6"
                        description="A foundational understanding of addition, subtraction, multiplication, and division."
                        route="/courses/primary"
                    />
                    <Card
                        imageUrl="./images/algebrabook.png"
                        title="Algebra 1"
                        subtitle="y = mx + b"
                        description="Learn the foundations of Algebra including single and multi-variable equations, factoring, and inequalities of linear equations."
                        route="/courses/algebra"
                    />
                    <Card
                        imageUrl="./images/algebra2book.png"
                        title="Algebra 2"
                        subtitle="ax + by + c = 0"
                        description="Explore advanced algebra topics such as quadratic equations, functions, and systems of equations."
                        route="/courses/algebra"
                    />
                    <Card
                        imageUrl="./images/geometrybook.png"
                        title="Geometry"
                        subtitle=""
                        description="Areas and Volumes of shapes."
                        route="/courses/geometry"
                    />
                </div>
            </main>
        </div>
    );
};

export default Splash;
