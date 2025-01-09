// Dynamic Date for Footer
const currentYearElement = document.getElementById('currentyear');
const lastModifiedElement = document.getElementById('lastModified');

currentYearElement.textContent = new Date().getFullYear();
lastModifiedElement.textContent = `Last Updated: ${document.lastModified}`;

// Responsive Navigation
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Course Data and Filtering
const courses = [
  { name: 'CSE 110', type: 'cse', completed: true },
  { name: 'CSE 111', type: 'cse', completed: true },
  { name: 'WDD 130', type: 'wdd', completed: true },
  { name: 'CSE 210', type: 'wdd', completed: false },
  { name: 'WDD 231', type: 'wdd', completed: false },
  { name: 'WDD 131', type: 'wdd', completed: true },
];

const courseCards = document.getElementById('course-cards');
const courseButtons = document.querySelectorAll('#course-buttons button');

// Display Courses
function displayCourses(filter) {
  courseCards.innerHTML = '';
  const filteredCourses = courses.filter(
    (course) => filter === 'all' || course.type === filter
  );
  filteredCourses.forEach((course) => {
    const card = document.createElement('div');
    card.textContent = course.name;
    card.style.backgroundColor = course.completed ? '#d4edda' : '#f8d7da';
    card.style.padding = '10px';
    card.style.margin = '5px';
    card.style.border = '1px solid #ccc';
    courseCards.appendChild(card);
  });
}

// Event Listeners for Buttons
courseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    displayCourses(button.dataset.filter);
  });
});

// Initial Display
displayCourses('all');
