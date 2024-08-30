import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/course.css';
import CourseContent from './CourseContent';


const Course: React.FC = () => {

  
  //"This is the course body";
  const params = useParams<'course_name'>();
  const course_name = params.course_name;

  return (
    <div className='course_container'>
      <CourseContent courseName={course_name} />
     
    </div>
  );
};

export default Course;
