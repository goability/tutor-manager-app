import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/course.css';
import CourseContent from './CourseContent';
import Card from './Card';

const Course: React.FC = () => {

const params = useParams<'course_name'>();
const course_name = params.course_name;

  return (
    <div className='course_container'>
      <div className="card-container">
        <Card
          imageUrl="../images/symbols-primary.jpeg"
          title="Chapter title"
          subtitle="a subtitle for the chapter"
          description="A foundational understanding of addition, subtraction, multiplication, and division."
          route="/courses/primary"
        />
      </div>
      <CourseContent courseName={course_name} />
    </div>
  );
};

export default Course;
