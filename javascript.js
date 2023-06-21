function scrollToSection(event,sectionId) {   
    event.preventDefault();

    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior:'smooth' });
}