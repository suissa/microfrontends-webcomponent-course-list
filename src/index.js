class CourseList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.courses = [];
    this.filteredCourses = [];
  }

  connectedCallback() {
    this.render();
    fetch('http://localhost:5000/courses')
      .then(response => response.json())
      .then(data => {
        this.courses = data;
        this.filteredCourses = data;
        this.render();
      });

    window.addEventListener('filter-courses', (event) => {
      const query = event.detail.query.toLowerCase();
      if (query) {
        this.filteredCourses = this.courses.filter(course => course.name.toLowerCase().includes(query));
      } else {
        this.filteredCourses = this.courses;
      }
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <ul>
        ${this.filteredCourses.map(course => `<li>${course.name}</li>`).join('')}
      </ul>
    `;
  }
}

customElements.define('course-list', CourseList);
