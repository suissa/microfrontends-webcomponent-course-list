# Microfrontend - Webcomponent - CourseList

Nesse webcomponent eu faço uma requisição para uma api `localhost:5000/courses` que me retorna uma lista de cursos para eu adicionar a lista no `shadowRoot`.

## Webcomponent CourseList

```js
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
```

## webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'course-list.js',
    library: 'courseList',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 4001,
  },
};
```

# Execução

```
yarn
npx tailwindcss init
yarn start
```