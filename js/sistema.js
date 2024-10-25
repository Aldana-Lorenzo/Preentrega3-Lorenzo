//! Todas las funciones que se ejecutarán y reutilizaran en INDEX.TMHL y PRODUCTOS.HTML

// // Creo un nuevo objeto URLSearchParam para poder acceder a todos sus métodos, le paso como parametro el objeto 'window' (ventana actual) y accedo a su propiedad 'location' (url actual)
// // Desde location accedo a su propiedad search, que guarda como valor la parte de la URL que sigue al signo de interrogación (la parte dinámica de la URL)
const URL = new URLSearchParams(window.location.search)

class Sistema {
    constructor() {
        this.productos = [
            new Producto(1, 'Notebook', 'LENOVO', 'I3 SLIM 82XB003QAR', 1079999, 'Procesador Interl Core I3-N305. Rápida capacidad multitarea con 8 GB de RAM LPDDR5 y SSD M.2 de 256 GB. Imagen clara y fluida con pantalla de 15.6" y resolución 1920x1080 respaldada por gráficos Intel UHD integrados.'),
            new Producto(1, 'Notebook', 'ASUS', 'I7 VIVOBOOK 15 X1502ZA-EJ194W', 1999999, 'Pantalla de 15.16" FHD. Procesador Intel Core i7-1260P 2.1 GHz, 12 nucleos. Capacidad 512 GB M.2 NVMe PCIe 3.0 SSD / RAM 16 GB DDR4 (8GB DDR4 + 8GB DDR4 SO-DIMM). Placa de video intel iris Xe graphics.'),
            new Producto(3, 'Tablet', 'SAMSUNG', 'GALAXY A9+ -SM-X210N 11"', 499999, 'Pantalla de 11" TFT. Resolucion 1920x1200. Display 16M. Procesador QualcomSM6375 Octa core (2.2GHz,1.8GHz). Capacidad 64 Gb (expandible hasta 1 Tb). RAM 4 Gb. Camara principal de 8 Mp. Camara frontal 5 Mp. Sistema operativo Android.'),
            new Producto(2, 'Celular', 'MOTOROLA', 'EDGE 50 PRO - XT2403-2', 1199999, 'Pantalla curva POLED de 6.67". Procesador Qualcomm Snapdragon 7 Gen 3, Octa core. Capacidad 512 GB. RAM 12 GB. Camara principal: 50 MP. Gran angular y macro: 13 MP. Zoom digital (30x fotos / 20x videos). Camara frontal 50 MP.'),
            new Producto(1, 'Notebook', 'HP', 'I7 14-DY2000LA', 1599999, 'Notebook 2 en 1. Pantalla multitactil FHD (1920x1080). Procesador intel core I7-1255U. Almacenamiento: Unidad de estado solido de 512 GB. Memoria de 8 GB de RAM. Placa de video integrada Graficos Intel Iris Xe. Lector de huella digital.'),
            new Producto(3, 'Tablet', 'LENOVO', 'M8 - ZABU0022AR 8"', 279999, 'Pantalla de 8" HD. Procesador Mediatek Helio A2. Capacidad 64 GB. RAM LPDDR4x soldado de 4 GB. Camara principal de 5 Mp. Camara frontal de 2 Mp. Sistema operativo Android 12.'),
            new Producto(2, 'Celular', 'SAMSUNG', 'GALAXY A35 - SM-A356E', 799999, 'Pantalla de 6.6" FHD+ Super AMOLED. Procesador Exynos1380 Octa core. Capacidad 256 Gb (expandible hasta 1 Tb). RAM 8 Gb. Camara principal 50 + 8 + 5 MP. Zoom digital hasta 10x. Camara frontal 13 Mp. Sistema operativo Android.'),
            new Producto(1, 'Notebook', 'ASUS', 'I5 ZENBOOK 14X OLED UX5401EA-L7101T', 1429999, 'Pantalla de 14", HD. Procesador Intel Core i5-1135G7. Capacidad 512 GB SSD / RAM 8 GB. Placa de video Integrada Graficos Intel Iris Xe. Sistema operativo Windows 10 home.'),
            new Producto(2, 'Celular', 'SAMSUNG', 'GALAXY S24 ULTRA - SM-S928BZYMARO', 2599999, 'Pantalla de 6.8" Quad HD+. Procesador Snapdragon 8 Gen 3, Octa core. Capacidad 512 GB. RAM 12 GB. Camara principal 200 + 50 + 12 + 10 Mp. Camara frontal 12 Mp. Sistema operativo Android. Incluye lapiz.'),
        ]
    }

    filtrar_categorias() {
        let categoria_filtrada = this.productos.filter((producto) => producto.id_categoria === Number(URL.get("id")));
        return categoria_filtrada;
    }

    filtrar_alfabeticamente(array) {
        // // Con spread operator creo una copia del array original para que las modificaciones sean sobre la copia
        // // Así muestro el array original solo al seleccionar la opción 'Más relevantes' sin aplicar ningún filtro
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

    filtrar_marca(marcas) {
        // // Si producto.marca se encuentra incluido dentro del array marcas, devuelve true y guarda ese producto en el nuevo array marca_filtrada
        let marca_filtrada = this.productos.filter((producto) => marcas.includes(producto.marca))
        return marca_filtrada
    }

    // filtrar_rango_precio() {

    // }
}