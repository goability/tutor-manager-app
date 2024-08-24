import React from 'react';
import coursesData from '../data/course_content_algebra1.json';

interface ContentItem {
  title: string;
  body: string;
}

interface Course {
  id: number;
  name: string;
  content_items: ContentItem[];
}

const CourseContent: React.FC = () => {
  const courses: Course[] = coursesData.courses;

  return (
    <div className="courses-container">
      {courses.map((course) => (
        <div key={course.id} className="course">
          <h2>{course.name}</h2>
          {course.content_items.map((item, index) => (
            <div key={index} className="content-item">
              <h3 className="course_content_item_title">{item.title}</h3>
              <p className="course_content_item_body">{item.body}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;