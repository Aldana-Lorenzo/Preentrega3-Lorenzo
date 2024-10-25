//! Ejecución de PRODUCTOS.HTML

let sistema = new Sistema()
let container_cards = document.querySelector('.template_container')


//! Filtro por categoría
const CATEGORIAS = [
    {nombre: "Notebook", id_categoria: 1, class_icono: "bx bx-laptop"},
    {nombre: "Celular", id_categoria: 2, class_icono: "bx bx-mobile"},
    {nombre: "Tablet", id_categoria: 3, class_icono: "bx bxs-devices"}
]

let btn_categorias_container = document.querySelector('.categorias')

CATEGORIAS.forEach((categoria) => {
    const boton = document.createElement('button')
    boton.classList = "btn-categoria"
    boton.value = categoria.nombre

    const a = document.createElement('a')
    a.innerHTML = `<a href="productos.html?id=${categoria.id_categoria}"><i class="${categoria.class_icono}"></i>${categoria.nombre}</a>`

    boton.appendChild(a)
    btn_categorias_container.appendChild(boton)
})


//! Ordenar: alfabéticamente - precio asc/desc
let filtros = document.querySelector('.filtros_container')

filtros.querySelector('select').addEventListener('change', (e) => {
    let productos_filtrados

    if (e.target.value == 'mayor') {
        productos_filtrados = sistema.filtrar_precios_desc(sistema.productos)
    } else if (e.target.value == 'menor') {
        productos_filtrados = sistema.filtrar_precios_asc(sistema.productos)
    } else if (e.target.value == 'alfabeticamente') {
        productos_filtrados = sistema.filtrar_alfabeticamente(sistema.productos)
    } else {
        productos_filtrados = sistema.productos
    }

    mostrar_productos(productos_filtrados)
})


//! Filtrar por marca
const MARCAS = [
    { nombre: "LENOVO" },
    { nombre: "ASUS" },
    { nombre: "HP" },
    { nombre: "SAMSUNG" },
    { nombre: "MOTOROLA" }
]

let marcas = document.querySelector('.accordion-body')

MARCAS.forEach((marca) => {
    const div = document.createElement('div')
    const input = document.createElement('input')
    input.type = "checkbox"
    input.value = marca.nombre

    div.appendChild(input)
    div.innerHTML += `${marca.nombre}` // // Concateno la marca luego del input (no va en el input porque es una etiqueta sin cierre)
    marcas.appendChild(div)
})

marcas.querySelector('input').addEventListener('click', () => {
    const marcas_seleccionadas = [];
    document.querySelectorAll('.accordion-body input:checked').forEach(input => {
        marcas_seleccionadas.push(input.value);
    });

    const productos_filtrados = sistema.filtrar_marca(marcas_seleccionadas);
    mostrar_productos(productos_filtrados);
});

//! Filtrar por rango de precio


//! Renderizar productos en el DOM
// // Creo una funcion para que por cada modificacion del array de productos, se actualice la renderización
function mostrar_productos(productos) {
    // // Vacío el container para que cuando se actualice no se multipliquen las vistas anteriores
    container_cards.innerHTML = ''

    productos.forEach((producto) => {
        // // Capturo el template y por cada producto que se itera se crea un clon, una copia de la card (template) con los datos correspondientes
        let clon = document.querySelector('template').content.cloneNode(true)
        clon.querySelector('h2').innerText = `${producto.categoria} ${producto.marca} ${producto.nombre_modelo}`
        clon.querySelector('.precio_producto').querySelector('p').innerText += `${producto.precio}`

        // // Guardo en una variable el elemento (span) donde iría el stock y a esa variable le concateno el valor aleatorio
        let stock = clon.querySelector('span')
        stock.innerText += `${producto.stock}`

        clon.querySelector('.boton_producto').addEventListener('click', () => {
            // // Si el stock es mayor a 0 una vez que el usuario hace click en el boton de agregar al carrito, se resta el stock y se actualiza su valor
            if (producto.stock > 0) {
                console.log(`Agregaste ${producto.categoria} ${producto.marca} ${producto.nombre_modelo} a tu carrito`)

                // // Sobre la variable 'stock' resto 1 luego de que el usuario cargo el producto a su carrito 
                producto.stock--
                stock.innerText = `Stock ${producto.stock}`
            } else {
                alert('Producto no disponible')
            }
        })

        // // Con appendChild() Agrego las distintas cards (clon) al div con class template_container
        container_cards.appendChild(clon)
    })
}

mostrar_productos(sistema.filtrar_categorias())
// // Le paso como parámetro el array de productos que se encuentra en mi variable sistema
// // new Sistema() es el constructor que contiene el array de objetos
// // Accedo a la propiedad this.productos de ese objeto constructor con el .productos