//! Aplicar modo claro/oscuro de forma general en toda la app

let modo = document.querySelector('.dark-light-mood')
let body = document.body

let modo_seleccionado = localStorage.getItem('modo_seleccionado')
body.className = modo_seleccionado

if (modo_seleccionado == 'modo_claro') {
    modo.innerHTML = `<i class="bx bxs-moon"></i>`
} else {
    modo.innerHTML = `<i class="bx bx-sun"></i>`
}

modo.addEventListener('click', () => {

    if (body.className == 'modo_claro') {
        body.className = 'modo_oscuro'
        modo.innerHTML = `<i class="bx bx-sun"></i>`
    } else {
        body.className = 'modo_claro'
        modo.innerHTML = `<i class="bx bxs-moon"></i>`
    }

    localStorage.setItem('modo_seleccionado', body.className)
})