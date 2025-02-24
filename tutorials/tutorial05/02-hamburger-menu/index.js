function toggleMenu() {
    const menuToggle = document.getElementById("menu-toggle"); 
    const navLinks = document.getElementById("nav-links");
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    const isExpanded = menuToggle.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isExpanded);
}
