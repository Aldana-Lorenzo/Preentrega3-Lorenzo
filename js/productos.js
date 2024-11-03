//! Ejecución de PRODUCTOS.HTML
let sistema = new Sistema()
let container_cards = document.querySelector('.template_container')


//! Filtro por categoría
let categoria_seleccionada = 1

const CATEGORIAS = [
    { nombre: "Notebook", id_categoria: 1, class_icono: "bx bx-laptop" },
    { nombre: "Celular", id_categoria: 2, class_icono: "bx bx-mobile" },
    { nombre: "Tablet", id_categoria: 3, class_icono: "bx bxs-devices" }
]

let btn_categorias_container = document.querySelector('.categorias')

CATEGORIAS.forEach((categoria) => {
    const boton = document.createElement('button')
    boton.classList = "btn-categoria"
    boton.value = categoria.nombre

    boton.addEventListener('click', () => {
        categoria_seleccionada = categoria.id_categoria
        mostrar_productos(sistema.filtrar_categorias(categoria.id_categoria), true)
    })

    boton.innerHTML = `<i class="${categoria.class_icono}"></i>${categoria.nombre}`

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

    mostrar_productos(productos_filtrados, true)
})


//! Filtrar por marca
let marcas_seleccionadas = [] // Marcas específicas filtradas por el usuario
let MARCAS = [] // Marcas que contiene cada categoría


//! Filtrar por rango de precio
let precio_seleccionado = 0
let precios = document.querySelectorAll('.accordion-body')[1] // Segundo elemento con esta class
let precio_inputs = precios.querySelectorAll('input')

precio_inputs.forEach((input_radio) => {

    input_radio.addEventListener('click', () => {

        precio_seleccionado = parseInt(document.querySelector('input[name=precioRadio]:checked').value);

        const productos_filtrados = sistema.filtrar_rango_precio(marcas_seleccionadas, categoria_seleccionada, precio_seleccionado);

        mostrar_productos(productos_filtrados, false)
    });
})


//! Renderizar productos en el DOM
// Creo una fn para que por cada modificacion del array de Productos se actualice la renderización
function mostrar_productos(productos, existe_categoria) {

    // Vacío el container para que cuando se actualice no se multipliquen las vistas anteriores
    container_cards.innerHTML = ''

    let marcas = document.querySelector('.accordion-body')

    if (existe_categoria) {
        MARCAS = []
    }

    productos.forEach((producto) => {
        // Capturo el template y por cada producto que se itera se crea un clon, una copia de la card (template) con los datos correspondientes
        let clon = document.querySelector('template').content.cloneNode(true)
        clon.querySelector('.img_producto').innerHTML = `<img src="${producto.imagen}" alt="">`
        clon.querySelector('h2').innerText = `${producto.categoria} ${producto.marca} ${producto.nombre_modelo}`
        clon.querySelector('.precio_producto').querySelector('p').innerText += `${producto.precio}`

        clon.querySelector('.boton_producto').addEventListener('click', () => {

            // Evaluo si el stock es menor o mayor a 0
            if (producto.stock > 0) {
                Toastify({
                    text: `Agregaste ${producto.categoria} ${producto.marca} ${producto.nombre_modelo} a tu carrito`,
                    duration: 2500,
                    close: true,
                    style: {
                        background: '#0c1b898'
                    }
                }).showToast();

                producto.stock-- // Resto el stock
                productos_carrito.push(producto)

                // LocalStorage
                let memoria_carrito = JSON.stringify(productos_carrito)
                localStorage.setItem('memoria_carrito', memoria_carrito)

                agregar_al_carrito(producto, productos_carrito.length)

            } else {
                alert('Producto no disponible')
            }
        })

        // Agrego las distintas cards (clon) al div con class template_container
        container_cards.appendChild(clon)

        if (existe_categoria && !MARCAS.includes(producto.marca)) {
            const div = document.createElement('div')
            const input = document.createElement('input')
            input.type = "checkbox"
            input.value = producto.marca

            div.appendChild(input)
            div.innerHTML += `${producto.marca}` // Concateno la marca luego del input (no va en el input porque es una etiqueta sin cierre)
            marcas.appendChild(div)

            MARCAS.push(producto.marca)
        }
    })

    let marca_inputs = marcas.querySelectorAll('input');

    marca_inputs.forEach((input_checkbox) => {

        input_checkbox.addEventListener('click', () => {

            marcas_seleccionadas = [];

            document.querySelectorAll('.accordion-body input:checked').forEach(input => {
                marcas_seleccionadas.push(input.value);
            });

            const productos_filtrados = sistema.filtrar_marca(marcas_seleccionadas, categoria_seleccionada)

            mostrar_productos(productos_filtrados, false)
        });
    })

}

mostrar_productos(sistema.filtrar_categorias(), true)
// Paso como parámetro el array de productos guardado en mi variable sistema
// Una vez que accedo a class Sistema() le aplico la función filtrar_categorias
// Esta filtra el array de los productos según la categoría seleccionada por el usuario
// Y así se renderizan únicamente los productos ya filtrados por categoría

function cargar_data_carrito() {
    let memoria_carrito = localStorage.getItem('memoria_carrito')

    if (memoria_carrito != null) {
        let array_carrito = JSON.parse(memoria_carrito)

        array_carrito.forEach((producto) => {
            agregar_al_carrito(producto, productos_carrito.length)
        })
    }
}

cargar_data_carrito()