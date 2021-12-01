/**
 * Define Global Variables
 *
 */
// a variable to define the number of all sections
const sections = document.querySelectorAll("section");
// a variable to get the value of the nav bar ul element
const navBarList = document.getElementById("navbar__list");
// Create a Document Fragment to append created nav items to it
const docFragment = document.createDocumentFragment();

/**
 *
 * build the nav
 *
 */

// a function to create a loop that extracts sections attributes and create a navigation bar with the same name and style
function createNavItems() {
  for (const section of sections) { // for every section in section
    const itemName = section.dataset.nav; // variable have the sections data nav value
    const itemLink = section.getAttribute("id"); // variable have the sections id value
    const listItem = document.createElement("li"); // create li element
    listItem.innerHTML = `<a class="menu__link" href="#${itemLink}" data-nav="${itemLink}">${itemName}</a>`; // giving the new a element the same attributes
    docFragment.appendChild(listItem); // puting the listItem inside the Document Fragment
    navBarList.appendChild(docFragment); // putting the Document Fragment inside the ul element
  }
};
createNavItems();

/**
 *
 * Add class 'active' to section and highlight the same section in navbar when near top of viewport
 *
 */

// define options as a variale to use it later in IntersectionObserver
const options = {
  root: null, // it is the viewport
  threshold: 0.5,
  rootMargin: "0px"
};
// using IntersectionObserver to detect the section inside the viewport and if this section isIntersecting then add active class else remove active class
const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    let navLink = navBarList.querySelector(`[data-nav=${entry.target.id}]`); // creating a variable with the data-nav value to link sections & navBar section
    if (entry.isIntersecting) { // if the section intersecting
      entry.target.classList.add("your-active-class"); // adding active class to section who Intersecting
      navLink.classList.add("your-active-link"); // adding active class to navBar sections who Intersecting
      location.hash = `${entry.target.id}`;
    } else {
      entry.target.classList.remove("your-active-class"); // if it wasn't intersecting remove active class
      navLink.classList.remove("your-active-link"); // removing active class from navBar sections whi isn't Intersecting
    }
  })
}, options);
sections.forEach(section => {
  observer.observe(section); // to observ the observer on all sections
});

/**
 *
 * Scroll to anchor ID using scrollIntoView event
 *
 */
const links = document.querySelectorAll(".menu__link"); // selecting all anchor in a variable
links.forEach((item) => {
  item.addEventListener("click", (event) => { // adding event listener for each anchor on click
    event.preventDefault();// getting the section with the same value of anchor
    // define a variable with a data-nav value & using scrollIntoView 
    const el = document.getElementById(item.getAttribute('data-nav')).scrollIntoView({ behavior: "smooth" }); 
  });
});

/**
 *
 * adding new button " Go up " to the page
 *
 */
const goUpButton = document.getElementById("go-up");
window.onscroll = function () { // using on scroll to set the button
  if (window.pageYOffset > 1400) {
    goUpButton.style.display = "block";
  } else { // making the button disapper if the pageyoffset > 1400
    goUpButton.style.display = "none";
  }
};
// using onclick to go to the top of the page when the button is clicked
goUpButton.onclick = function () {
  window.scrollTo(0, 0);
};
