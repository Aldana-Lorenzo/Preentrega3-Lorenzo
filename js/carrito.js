//! Abrir y cerrar modal del carrito de forma general en toda la app

//! Renderización del modal carrito
let abrir_carrito = document.querySelector('.boton_carrito')
let modal_carrito = document.querySelector('.ocultar_carrito')
let cerrar_carrito = document.querySelector('.cerrar_carrito')

abrir_carrito.addEventListener('click', () => {
    if (modal_carrito.className == 'ocultar_carrito') {
        modal_carrito.className = 'mostrar_carrito'
    }
})

cerrar_carrito.addEventListener('click', () => {
    if (modal_carrito.className == 'mostrar_carrito') {
        modal_carrito.className = 'ocultar_carrito'
    }
})


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//! Validar si el carrito está vacío para mostrar diferentes mensajes
let carrito_vacio = document.querySelector('.carrito_vacio')
let carrito_container = document.querySelector('.carrito_container')
let carrito_footer = document.querySelector('.carrito_footer')

let productos_carrito = [] // Array que contiene los productos en el carrito

if (productos_carrito.length == 0) {
    // Si el array de productos_carrito está vacío, en carrito_container no se verá ninguna mini card
    // En su lugar creo un div con el alerta de que el carrito está vacío

    carrito_vacio.innerHTML = `
        <p>Tu carrito está vacío</p>
        `
    // Le quito el display al carrito_footer para que no pueda visualizarse
    // carrito_footer.style.display = 'none'

} else if (productos_carrito.length > 0) {
    // Si el array no está vacío 
    carrito_vacio.style.display = 'none'

    // carrito.style.display = 'flex'
    carrito_footer.style.display = 'block'
}


//! Estructura de cada mini card de producto en el carrito
// Paso 2 parámetros
// El producto que se agrega al carrito
// Y el índice de ese producto para poder manipular solo ese elemento al resta, sumar o eliminarlo del carrito

function agregar_al_carrito(producto, indice) {

    let carrito_box = document.createElement('div')
    carrito_box.classList.add('carrito_box')
    carrito_box.setAttribute('id', indice)
    // Le seteo/agrego un atributo 'id' a cada div que se va creando
    // El 'id' obtiene el valor del índice que le corresponde a ese producto puntual dentro del array productos_carrito cuando se pushea para renderizar dentro del modal (productos.js:101)

    carrito_box.innerHTML = `
        <div class="carrito_info">
            <div class="carrito_img">
                <img src="${producto.imagen}" alt="">
            </div>

            <div class="carrito_datos">
                <div class="carrito_nombre">
                    <p>${producto.categoria} ${producto.marca} ${producto.nombre_modelo}</p>
             <button onclick="eliminar(${indice}, ${producto.precio})"><i class="bx bx-trash"></i></button>
                </div>

                <div class="carrito_cantidad">
                    <div class="carrito_contador">
                        <button onclick="restar(${indice}, ${producto.precio})"><span><i class="bx bx-minus"></i></span></button>
                        <input type="number" value="1" id="cantidad${indice}">
                        <button onclick="sumar(${indice}, ${producto.precio}, ${producto.stock})"><span><i class="bx bx-plus"></i></span></button>
                    </div>

                    <div class="carrito_precio">
                        <p>$ ${producto.precio}</p>
                    </div>
                </div>

                <p class="mensaje_stock_oculto mensaje${indice}"><i class='bx bx-error'></i>Límite de stock superado</p>
            </div>
        </div>
        `

    carrito_container.appendChild(carrito_box)
    actualizar_total(true, producto.precio)
}


function sumar(indice, agregar_precio, stock_max) {

    // El índice indica sobre qué mini card debe ejecutarse la función al presionar el botón de agregar otra unidad
    // Así se suma el precio de ese producto específico
    let input_cantidad = document.getElementById('cantidad' + indice)
    let cantidad = parseInt(input_cantidad.value)

    if (cantidad + 1 <= stock_max) {
        cantidad++
        input_cantidad.value = cantidad

        actualizar_total(true, agregar_precio)
    } else {
        // Si supera la cantidad de stock disponible muestra un mensaje y detiene el conteo, deja de sumar
        let mensaje_stock = document.querySelector('.mensaje_stock_oculto')

        // Valido en caso de que la class ya haya sido modificada. Porque al no encotrarla arrajaría null.
        // Ejemplo: Cuando el usuario siga haciendo click en el btn '+' y ya se arrojó el mensaje de límite de stock
        if (mensaje_stock != null) {
            mensaje_stock.className = 'mensaje_stock_visible'
        }
    }
}

function restar(indice, borrar_precio) {
    let input_cantidad = document.getElementById('cantidad' + indice)
    let cantidad = parseInt(input_cantidad.value)

    if (cantidad - 1 >= 1) {
        cantidad--
        input_cantidad.value = cantidad

        actualizar_total(false, borrar_precio)
    } 

    let mensaje_stock = document.querySelector('.mensaje_stock_visible')

    if (mensaje_stock != null) {
        mensaje_stock.className = 'mensaje_stock_oculto'
    }

    // cantidad++
    // input_cantidad.value = cantidad
}

function eliminar(indice, borrar_precio) {
    let contenedor = document.getElementById(indice)
    contenedor.remove()

    actualizar_total(false, borrar_precio)
}

function actualizar_total(esta_sumando, precio) {
    let span_total = document.querySelector('.precio_total')
    let total = parseFloat(span_total.innerHTML) // Me traigo el primer valor que figura en mi HTML

    if (esta_sumando) {
        total += precio
    } else {
        total -= precio
    }

    // Modifico el valor del total
    span_total.innerHTML = total
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//! Finalizar compra
let finalizar_compra = document.querySelector('.finalizar_compra')

finalizar_compra.addEventListener('click', () => {
    Swal.fire({
        icon: "success",
        title: "¡Muchas gracias por tu compra!",
        width: 550,
        padding: "2em",
        color: "#716add",
        backdrop: `
          rgba(0,0,0,0.7)
        `
    });

    if (modal_carrito.className == 'mostrar_carrito') {
        modal_carrito.className = 'ocultar_carrito'
    }

    //! No vacía el carrito
    carrito_container = ""
    carrito_vacio.innerHTML = `
        <p>Tu carrito está vacío</p>
        `
    carrito_footer.style.display = 'none'
})