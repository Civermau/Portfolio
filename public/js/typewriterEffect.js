function typewriterEffect(element, text, speed) {
    let index = 0;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    element.appendChild(cursor);

    function type() {
        if (index < text.length) {
            element.insertBefore(document.createTextNode(text.charAt(index)), cursor);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.querySelector(".typewriter-title");
    const titleText = "This is Civer_mau";
    typewriterEffect(titleElement, titleText, 100); // Adjust speed as needed
}); 