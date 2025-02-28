const handleBackspaceNavigation = (event) => {
    const activeElement = document.activeElement;

    // Check if the active element is an input, textarea, or contentEditable
    const isTypingField =
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable;
    if (event.key === "Backspace" && !isTypingField) {
        event.preventDefault(); // Prevent default page navigation
        window.history.back(); // Go to the previous page
    }
};

const enableBackspaceNavigation = () => {
    window.addEventListener("keydown", handleBackspaceNavigation);
};

const disableBackspaceNavigation = () => {
    window.removeEventListener("keydown", handleBackspaceNavigation);
};

export { enableBackspaceNavigation, disableBackspaceNavigation };
