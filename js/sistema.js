//! Todas las funciones que se ejecutarán y reutilizaran en INDEX.TMHL y PRODUCTOS.HTML

class Sistema {
    constructor() {
        this.productos = []
        this.cargar_data()
    }

    async cargar_data() {
        try {
            const response = await fetch('../js/productos.json')

            if (!response.ok) {
                throw new Error('Error al cargar archivo JSON')
            }

            const data = await response.json()
            this.productos = data.map(producto => new Producto(
                producto.id_categoria,
                producto.categoria,
                producto.marca,
                producto.nombre_modelo,
                producto.precio,
                producto.producto_destacado,
                producto.imagen,
                producto.descripcion
            ))
        }
        catch (error) {
            console.error(error);
        }
    }
    
    filtrar_categorias(id_categoria) {
        let categoria_filtrada = this.productos.filter((producto) => producto.id_categoria === Number(id_categoria))
        return categoria_filtrada
    }

    filtrar_alfabeticamente(array) {
        // Con spread operator creo una copia del array original para que las modificaciones sean sobre la copia
        // Muestro el array original solo al seleccionar la opción 'Más relevantes' sin aplicar ningún filtro
        return [...array].sort((a, b) => {
            if (a.marca > b.marca) return 1
            if (a.marca < b.marca) return -1
            return 0
        })
    }

    filtrar_precios_asc(array) {
        return [...array].sort((a, b) => {
            if (a.precio > b.precio) return 1
            if (a.precio < b.precio) return -1
            return 0
        })
    }

    filtrar_precios_desc(array) {
        return [...array].sort((a, b) => {
            if (a.precio > b.precio) return -1
            if (a.precio < b.precio) return 1
            return 0
        })
    }

    filtrar_marca(marcas, categoria_seleccionada) {
        // Guardo en lista_productos el array de productos que se filtran cuando el usuario selecciona determinada categoría
        let lista_productos = this.filtrar_categorias(categoria_seleccionada)

        // Valido si el array de marcas contiene algo dentro o no
        if (marcas.length > 0) {
            // Si producto.marca se encuentra dentro del array marcas, devuelve true y guarda ese producto en el nuevo array marca_filtrada
            let marca_filtrada = lista_productos.filter((producto) => marcas.includes(producto.marca))
            return marca_filtrada

        } else {
            return lista_productos
        }
    }

    filtrar_rango_precio(marcas, categoria_seleccionada, precio) {
        let lista_productos = this.filtrar_marca(marcas, categoria_seleccionada)
        let precio_filtrado = []

        if (precio >= 0) {
            precio_filtrado = lista_productos.filter((producto) => producto.precio <= precio)
        } else {
            precio *= -1
            precio_filtrado = lista_productos.filter((producto) => producto.precio >= precio)
        }

        return precio_filtrado
    }
}