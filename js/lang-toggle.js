// lang-toggle.js - Language toggler script
const translations = {
    "welcome": { "en": "Welcome", "ar": "أهلا وسهلا" },
    "greeting": { "en": "Hello, how are you?", "ar": "مرحبا، كيف حالك؟" }
};

let currentLanguage = 'en';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    document.documentElement.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
 
    // Update text content based on translations
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = translations[key][currentLanguage];
    });
    
    // Update button label
    const languageButton = document.getElementById('language-toggle');
    languageButton.textContent = currentLanguage === 'en' ? 'العربية' : 'English';
}

// Add event listener for language toggle button
document.addEventListener('DOMContentLoaded', () => {
    const languageButton = document.createElement('button');
    languageButton.id = 'language-toggle';
    languageButton.textContent = currentLanguage === 'en' ? 'العربية' : 'English';
    languageButton.addEventListener('click', toggleLanguage);
    document.body.insertBefore(languageButton, document.body.firstChild);
});
