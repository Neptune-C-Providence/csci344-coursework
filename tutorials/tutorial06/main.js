// global variables tracking the user's preferences:
let searchTerm = "";
let openOnly = false;

const search = (ev) => {
    ev.preventDefault(); // overrides default button action

    // Set user's preferences (global variables) from the DOM:
    searchTerm = document.querySelector("#search_term").value;
    openOnly = document.querySelector("#is_open").checked;

    // Invoke the show matching courses function
    showMatchingCourses();
};

// Part 1.1a
const isClassFull = (course) => {
    return course.EnrollmentCurrent >= course.EnrollmentMax;
};

// Part 1.1b
const doesTermMatch = (course) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return course.Code.toLowerCase().includes(term) ||
           course.Title.toLowerCase().includes(term) ||
           course.CRN.toString().includes(term) ||
           course.Instructors[0].Name.toLowerCase().includes(term);
};

// Part 1.2
const dataToHTML = (course) => {
    const available = course.EnrollmentMax - course.EnrollmentCurrent;
    const isOpen = available > 0;
    const location = course.Location.FullLocation || 'TBA';
    const days = course.Days || 'TBA';
    return `
        <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                <i class="fa-solid fa-circle-${isOpen ? 'check' : 'xmark'}"></i> 
                ${isOpen ? 'Open' : 'Closed'} &bull; ${course.CRN} &bull; 
                ${isOpen ? `Seats Available: ${available}` : `Number on Waitlist ${course.WaitlistAvailable}`}
            </p>
            <p>
                ${days} &bull; ${location} &bull; ${course.Hours} credit hour(s)
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
    `;
};

// Part 2
const showMatchingCourses = () => {
    console.log(`Search term: ${searchTerm}`);
    console.log(`Only show open classes: ${openOnly}`);
    console.log(`Course data:`, courseList);

    // Clear existing courses
    document.querySelector('main.courses').innerHTML = '';
    
    // Filter courses based on search criteria
    const filteredCourses = courseList
        .filter(course => !openOnly || !isClassFull(course))
        .filter(doesTermMatch);
    
    // Add filtered courses to DOM
    const coursesContainer = document.querySelector('main.courses');
    filteredCourses.forEach(course => {
        coursesContainer.insertAdjacentHTML('beforeend', dataToHTML(course));
    });
};
