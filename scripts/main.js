const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: false },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

function displayCourses(filteredCourses) {
    const courseList = document.getElementById('course-list');
    if (!courseList) return; // Ensure the element exists

    courseList.innerHTML = '';
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
        courseCard.textContent = `${course.subject} ${course.number} - ${course.title} (${course.credits} credits)`;
        courseList.appendChild(courseCard);
    });

    updateTotalCredits(filteredCourses);
}

function filterCourses(category) {
    if (category === 'all') {
        displayCourses(courses);
    } else {
        displayCourses(courses.filter(course => course.subject === category));
    }
}

function updateTotalCredits(filteredCourses) {
    const totalCreditsElement = document.getElementById('total-credits');
    if (!totalCreditsElement) return; // Ensure the element exists

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
}

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('open');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);

    // Update footer with the current year
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Update footer with the last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        lastModifiedElement.textContent = `Last Updated: ${lastModified.toLocaleString()}`;
    }

    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }
});
