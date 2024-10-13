$(document).ready(function() {
    // Obtenemos el botón
    var $button = $('.scroll-to-target');

    // Función para mostrar/ocultar el botón
    function toggleButton() {
        if ($(window).scrollTop() > 100) {
            $button.fadeIn();
        } else {
            $button.fadeOut();
        }
    }

    // Ejecutamos la función al cargar la página y cada vez que se desplaza
    toggleButton();
    $(window).scroll(toggleButton);

    // Al hacer clic en el botón
    $button.click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
});