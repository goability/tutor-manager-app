import React from 'react';
import data_algebra from '../data/course_content_algebra.json';
import data_primary from '../data/course_content_primary.json';
import data_geometry from '../data/course_content_geometry.json';
interface CourseContentProps {
  courseName: string | undefined;
}

interface Course {
  id: number;
  name: string;
  chapters: Chapter[];
}

interface Chapter {
  chapter_number: string;
  title: string;
  summary: string;
  url: string;
  duration: string;
  sections: Section[];
}

interface Section {
  id: number;
  title: string;
  pages: Page[];
}

interface Page {
  title: string;
  body: string;
}


const CourseContent: React.FC<CourseContentProps> = ({courseName}) => {
  
  let courses:Course[];

  if (courseName === 'algebra') {
    courses = data_algebra;
  } else if (courseName === 'primary') {
    courses = data_primary;
  } else if (courseName === 'geometry') {
    courses = data_geometry;
  }
  else {
    return <div>Course not found</div>;
  }

  return (
    <div className="courses-container">
      {courses.map((course) => (
        <div key={course.id} className="course">
          <h2>{course.name}</h2>
          {course.chapters.map((chapter, index) => (
            <div key={index} className="content-item">
              <h3 className="course_content_item_title">CHAPTER {chapter.chapter_number} {chapter.title}</h3>
              <p className="course_content_item_body">{chapter.summary}</p>
              {chapter.sections.map((section, index) => (
                <div key={index} className="content-item">
                  <h3 className="course_content_item_title">section {section.id} {section.title}</h3>
                  <p className="course_content_item_body">
                    {section.pages.map((page, index) => (
                      <div key={index} className="content-item">
                        <h3 className="course_content_item_title">{page.title}</h3>
                        <p className="course_content_item_body">{page.body}</p>
                      </div>
                    ))}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;