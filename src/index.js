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
    <style>
      @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
      .course-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        padding: 1rem;
      }

      .course-card {
        display: flex;
        flex-flow: column wrap;
        width: 100%;
        align-items: flex-start;
        -webkit-box-pack: justify;
        justify-content: space-between;
        border-radius: 8px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        max-width: 370px;
        border: 2px solid rgb(18, 18, 18);
        padding-left: 24px;
        padding-right: 24px;
      }

      .course-card h3 {
        box-sizing: border-box;
        display: flex;
        flex-flow: column wrap;
        width: 100%;
        align-items: flex-start;
        border-color: rgb(0, 0, 0);
        padding-top: 24px;
        font-size: 1.5rem;
      }

      .course-card p {
        font-size: 0.875rem;
        color: #4b5563;
        margin-bottom: 0.25rem;
      }

      .course-card button {
        margin-top: 1rem;
        background-color: #f59e0b;
        color: #000;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        margin: 1rem auto 1rem auto;
        width:100%;
      }

      .course-card button:hover {
        color: #fff;
      }

      .course-card a {
        padding-top: 4px;
        padding-bottom: 16px;
        text-decoration: underline;
        color: rgb(18, 18, 18);
        font-weight: 500;
        line-height: 133%;
        display: block;
        margin: 0 auto;
      }
    </style>
      <div class="course-container">
        ${this.filteredCourses.map(course => `
          <div class="course-card">
            <h3>${course.title}</h3>
            <p>Duração: ${course.durationLabel}</p>
            <p>Grau: ${course.graduationLabel}</p>
            <p>Modalidade: ${course.modalityLabel}</p>
            <button>Inscreva-se</button>
            <a href="#">Sobre o Curso</a>
          </div>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('course-list', CourseList);


