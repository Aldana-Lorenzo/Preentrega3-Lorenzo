// Ejecución de PRODUCTOS.HTML

let sistema = new Sistema()
let container_cards = document.querySelector('.template_container')

// Renderizo los productos en el DOM
// Creo una funcion para que por cada modificacion del array de productos, se actualice la renderización

function mostrar_productos(productos) {

    // Vacío el container para que cuando se actualice no se multipliquen las vistas anteriores
    container_cards.innerHTML = ''

    productos.forEach((producto) => {

        // Capturo el template y por cada producto que se itera se crea un clon, una copia de la card (template) con los datos correspondientes
        let clon = document.querySelector('template').content.cloneNode(true)
        clon.querySelector('h2').innerText = `${producto.categoria} ${producto.marca} ${producto.nombre_modelo}`
        clon.querySelector('.precio_producto').querySelector('p').innerText += `${producto.precio}`

        // Guardo en una variable el elemento (span) donde iría el stock y a esa variable le concateno el valor aleatorio
        let stock = clon.querySelector('span')
        stock.innerText += `${producto.stock}`

        clon.querySelector('.boton_producto').addEventListener('click', () => {

            // Si el stock es mayor a 0 una vez que el usuario hace click en el boton de agregar al carrito, se resta el stock y se actualiza su valor
            if (producto.stock > 0) {
                console.log(`Agregaste ${producto.categoria} ${producto.marca} ${producto.nombre_modelo} a tu carrito`)

                // Sobre la variable 'stock' resto 1 luego de que el usuario cargo el producto a su carrito 
                producto.stock--
                stock.innerText = `Stock ${producto.stock}`
            } else {
                alert('Producto no disponible')
            }
        })

        // Con appendChild() Agrego las distintas cards (clon) al div con class template_container
        container_cards.appendChild(clon)
    })

}

// Le paso como parámetro el array productos que se encuentra en mi variable sistema
// new Sistema() es el constructor que contiene el array de objetos
// Accedo a la propiedad this.productos de ese objeto constructor con el .productos
mostrar_productos(sistema.productos)


let filtros = document.querySelector('.filtros_container')
filtros.querySelector('select').addEventListener('change', (e) => {

    let productos_filtrados

    if(e.target.value == 'mayor') {
        productos_filtrados = sistema.filtrar_precios_desc(sistema.productos)
    } else if (e.target.value == 'menor'){
        productos_filtrados = sistema.filtrar_precios_asc(sistema.productos)
    } else if (e.target.value == 'alfabeticamente'){
        productos_filtrados = sistema.filtrar_abc(sistema.productos)
    } else {
        productos_filtrados = sistema.productos
        console.log(e.target.value)
    }

    mostrar_productos(productos_filtrados)
})
