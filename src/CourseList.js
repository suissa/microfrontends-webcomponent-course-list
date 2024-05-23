import React, { useEffect, useState } from 'react';
import './styles.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        setFilteredCourses(data);
      });

    const handleFilterCourses = (event) => {
      const query = event.detail.query.toLowerCase();
      if (query) {
        setFilteredCourses(courses.filter(course => course.name.toLowerCase().includes(query)));
      } else {
        setFilteredCourses(courses);
      }
    };

    window.addEventListener('filter-courses', handleFilterCourses);
    return () => {
      window.removeEventListener('filter-courses', handleFilterCourses);
    };
  }, [courses]);

  return (
    <div className="course-container">
      {filteredCourses.map(course => (
        <div key={course.id} className="course-card">
          <h3>{course.title}</h3>
          <p>Duração: {course.durationLabel}</p>
          <p>Grau: {course.graduationLabel}</p>
          <p>Modalidade: {course.modalityLabel}</p>
          <button>Inscreva-se</button>
          <a href="#">Sobre o Curso</a>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
