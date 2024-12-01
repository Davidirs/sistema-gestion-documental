
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        window.open(href, '_blank');
        });
    }); 