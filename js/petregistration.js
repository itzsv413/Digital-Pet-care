// petregistration.js

// Function to toggle the success popup visibility
function toggleSuccess() {
    const successPopup = document.getElementById("popup-1");
    if (successPopup) { // Check if element exists
        successPopup.classList.toggle("active");
    } else {
        console.error("Success popup element not found!");
    }
}

// Function to toggle the failure popup visibility
function toggleFail(message = 'Registration failed. Please try again.') {
     const failPopup = document.getElementById("popup-0");
     const failMessageElement = document.getElementById("failMessage");
    if (failPopup) { // Check if element exists
        failPopup.classList.toggle("active");
         if (failMessageElement) {
             failMessageElement.textContent = message; // Update message text
         }
    } else {
        console.error("Failure popup element not found!");
    }
}

// --- Removed the checkURLForMessage function and its event listener ---
// This logic is not needed when using the fetch API for form submission.
// function checkURLForMessage() { ... }
// window.addEventListener('DOMContentLoaded', checkURLForMessage);
// --- End of code to remove ---


// Add event listener for the form submission
const petRegistrationForm = document.getElementById('petRegistrationForm');

if (petRegistrationForm) { // Check if form element exists
    petRegistrationForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the browser's default form submission

        // Get values from form inputs
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        // Changed id from 'sex' to 'gender' here
        const gender = document.getElementById('gender').value;
        const breed = document.getElementById('breed').value;
        const ownerAddress = document.getElementById('ownerAddress').value; // Use camelCase ID
        const identificationNumber = document.getElementById('identificationNumber').value; // Use camelCase ID

        try {
            // Send a POST request to your backend API
           // petregistration.js

// ... inside the form submit event listener

const response = await fetch('http://localhost:5000/api/pet-registration', { // <-- Change the URL here
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name,
        dob,
        gender,
        breed,
        ownerAddress,
        identificationNumber
    }),
});

// ... rest of the async function

            // Check if the HTTP status code indicates success (200-299)
            if (response.ok) {
                const result = await response.json();
                console.log('Pet registration successful:', result);
                toggleSuccess(); // Show the success popup
                petRegistrationForm.reset(); // Clear the form fields
            } else {
                // If response is not OK (e.g., 400, 409, 500)
                const errorData = await response.json();
                console.error('Pet registration failed:', response.status, errorData);
                toggleFail(errorData.message || 'Registration failed. Please try again.');
            }

        } catch (error) {
            // This catches network errors or issues preventing the fetch request
            console.error('Network or fetch error during registration:', error);
            toggleFail('Network error. Could not reach the server.');
        }
    });
} else {
    console.error("Pet registration form element not found!");
}