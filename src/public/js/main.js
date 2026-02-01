// Funcionalidad del navbar burger
document.addEventListener('DOMContentLoaded', () => {
    // Obtener todos los elementos navbar-burger
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Agregar click event a cada uno
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            // Obtener el target del data-target attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle la clase "is-active" en el navbar-burger y navbar-menu
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
    });
});
