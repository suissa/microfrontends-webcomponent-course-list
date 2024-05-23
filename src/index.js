import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import CourseList from './CourseList';
import './styles.css';

const CourseListComponent = reactToWebComponent(CourseList, React, ReactDOM);

// Verifica se o componente já está definido
if (!customElements.get('course-list')) {
  customElements.define('course-list', CourseListComponent);
}
