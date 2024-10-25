//! Ejecución de INDEX.HTML

let sistema = new Sistema()

const CATEGORIAS = [
    {nombre: "Notebook", id_categoria: 1, class_icono: "bx bx-laptop"},
    {nombre: "Celular", id_categoria: 2, class_icono: "bx bx-mobile"},
    {nombre: "Tablet", id_categoria: 3, class_icono: "bx bxs-devices"}
]

// // Obtengo el div con class '.categorias' que va a contener dentro todos los botones que vaya creando en mi array CATEGORIAS
let btn_categorias_container = document.querySelector('.categorias')

CATEGORIAS.forEach((categoria) => {
    // // Creo en el DOM el elemento button, le agrego una class y le asigno un value (el nombre de la categoría de ese botón)
    const boton = document.createElement('button')
    boton.classList = "btn-categoria"
    boton.value = categoria.nombre

    // // Creo una etiqueta a y le asigno una ruta dinámina con ?id= y como valor, le concateno el id vinculado a la categoria que se está iterando en ese momento
    const a = document.createElement('a')
    a.innerHTML = `<a href="pages/productos.html?id=${categoria.id_categoria}"><i class="${categoria.class_icono}"></i>${categoria.nombre}</a>`

    boton.appendChild(a)
    btn_categorias_container.appendChild(boton)
})