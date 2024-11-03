//! Constructor general. Estructura de cada elemento Producto.

class Producto {
    constructor(id_categoria, categoria, marca, nombre_modelo, precio, producto_destacado, imagen, descripcion) {
        this.id = this.generar_id()
        this.stock = this.stock_random()

        this.id_categoria = id_categoria,
            this.categoria = categoria,
            this.marca = marca,
            this.nombre_modelo = nombre_modelo,
            this.precio = precio,
            this.producto_destacado = producto_destacado,
            this.imagen = imagen,
            this.descripcion = descripcion
    }

    generar_id() {
        const caracteres = 'AaBbC0cDdEe1FfGgH2hIiJj3KkLlM4mNnOo5PpQqR6rSsTt7UuVvW8wXxYy9Zz'
        let id = ''

        for (let i = 0; i < 2; i++) {
            let index = Math.floor(Math.random() * caracteres.length)
            id += caracteres[index]
        }

        id += '-'

        for (let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * caracteres.length)
            id += caracteres[index]
        }

        return id
    }

    stock_random() {
        let stock = Math.floor(Math.random() * 21) // Número entero entre 0 y 20
        return stock
    }
}