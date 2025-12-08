// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth Scroll
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Quote Fetching
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');

async function fetchQuote() {
    try {
        newQuoteBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i> Loading...';
        newQuoteBtn.disabled = true;

        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();

        quoteText.textContent = `"${data.content}"`;
        quoteAuthor.textContent = `— ${data.author}`;
    } catch (error) {
        quoteText.textContent = '"The human spirit is stronger than anything that can happen to it."';
        quoteAuthor.textContent = '— C.C. Scott';
    } finally {
        newQuoteBtn.innerHTML = '<i class="fas fa-redo-alt mr-3"></i> New Inspirational Quote';
        newQuoteBtn.disabled = false;
    }
}

newQuoteBtn.addEventListener('click', fetchQuote);
fetchQuote();

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    messageError.classList.add('hidden');
    formSuccess.classList.add('hidden');

    if (nameInput.value.trim().length < 2) {
        nameError.classList.remove('hidden');
        valid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
        emailError.classList.remove('hidden');
        valid = false;
    }

    if (messageInput.value.trim().length < 10) {
        messageError.classList.remove('hidden');
        valid = false;
    }

    if (valid) {
        formSuccess.classList.remove('hidden');
        contactForm.reset();
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
