class Comida {
    constructor(id, nombre, descripcion, precio, img, cantidad = 1) {
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
        this.img = img
        this.cantidad = cantidad

    }
    descripcionListaComida() {
        return `
      <div class="card" style="width: 18rem;">
          <img src="${this.img}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${this.nombre}</h5>
              <p class="card-text">${this.descripcion}</p>
              <p class="card-text">precio: $${this.precio}</p>             
          </div>
          <div> <button class="btn btn-primary" id="btn_ag-${this.id}"> Añadir al carrito  </button> </div>
      </div>`
    }
    descripcionCarrito() {
        return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${this.img}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.nombre}</h5>
                        <p class="card-text">Cantidad  <button class"btn-primary id="btn_menos-${this.id}"><i class="fa-solid fa-minus"></i></button>  ${this.cantidad}  <button class"btn-primary id="btn_mas-${this.id}"><i class="fa-solid fa-plus"></i></button></p>
                        <p class="card-text">Precio: ${this.precio}</p>
                    </div>
                    <div>
                        <button class="btn btn-secondary" id="btn_eliminar-${this.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>`
    }

}
class ControlDeProducto {
    constructor() {
        this.listaDeComidas = []
    }
    agregar(comida) {
        this.listaDeComidas.push(comida)
    }
    cargarComidas() {
        this.agregar(new Comida(1, "tallarines", "con salsa fileto", 3200, "https://3.bp.blogspot.com/-_uHkRMw0e68/VYFlOBUKvGI/AAAAAAAAAk0/_aE-gG9lm0I/s640/DSCN4522.JPG"))
        this.agregar(new Comida(3, "tallarines", "con salsa bologñesa", 4300, "https://tse3.mm.bing.net/th?id=OIP.pzpRCvCGp3L2PRq9Fx-degHaGG&pid=Api&P=0&h=180"))
        this.agregar(new Comida(4, "tallarines", "con salsa escarparo", 3500, "https://tse4.mm.bing.net/th?id=OIP.XHC8E4nA3ZRrnri1DcaEvgHaFj&pid=Api&P=0&h=180"))
        this.agregar(new Comida(5, "ravioles", " de verdura con salsa fileto", 3200, "https://tse4.mm.bing.net/th?id=OIP.BsgzHt3D0XgBYWAL8BvhzwHaDl&pid=Api&P=0&h=180"))
        this.agregar(new Comida(6, "ravioles", " de verdura con salsa de crema", 3500, "https://tse2.mm.bing.net/th?id=OIP.JtWOEmEr8-pn6rzmKgh2cQHaFG&pid=Api&P=0&h=180"))
        this.agregar(new Comida(2, "tallarines", "con salsa a los 4 quesos", 4000, "https://tse3.mm.bing.net/th?id=OIP.eTVX-D0Z1ofxxYBvpsrggwHaD4&pid=Api&P=0&h=180"))
        this.agregar(new Comida(7, "ravioles", " de verdura y pollo con salsa bologñesa", 3700, "https://tse1.mm.bing.net/th?id=OIP.bi9EZNp5Fq1i0Vaj0aWzQgHaHa&pid=Api&P=0&h=180"))
        this.agregar(new Comida(8, "ravioles", " de verdura verdura y pollo salsa 4 quesos", 3200, "https://tse1.mm.bing.net/th?id=OIP.uh9TodJFxClTIMtT-KIUrQHaFj&pid=Api&P=0&h=180"))

    }

    mostrarProductosEnDOM() { // card vertical mostrar lista producto en DOM
        let lista_Producto = document.getElementById("lista_productos")
        this.listaDeComidas.forEach((comida) => {
            lista_Producto.innerHTML += comida.descripcionListaComida()
        })
        this.listaDeComidas.forEach((comida) => {
            let btn_ag = document.getElementById(`btn_ag-${comida.id}`)
            btn_ag.addEventListener("click", () => {

                carro.agregar(comida)
                carro.guardarEnStorage()
                carro.mostrarProductosEnDOM()

            })
        })

    }

}

class CarritoDelivery {
    constructor() {
        this.listaDeCompras = []
    }
    agregar(productoAgregar) {
        let enlista = this.listaDeCompras.some(prod => prod.id == productoAgregar.id)
        if (enlista == true) {
            let producto = this.listaDeCompras.find(producto => producto.id == productoAgregar.id)
            producto.cantidad += 1
        } else {
            this.listaDeCompras.push(productoAgregar)
        }
    }
    mostrarProductosEnDOM() { // card vertical mostrar lista producto en DOM
        let lista_carrito = document.getElementById("lista_Carrito")
        lista_carrito.innerHTML = ""
        this.listaDeCompras.forEach((comida) => {
            lista_carrito.innerHTML += comida.descripcionCarrito()
        })
        this.evento_Aumentar()
        this.evento_disminuir()
        this.eventoEliminar()
        this.eventoTotal()
    }
    guardarEnStorage() {
        let listaDeComprasJSON = JSON.stringify(this.listaDeCompras)
        localStorage.setItem("listaDeCompras", listaDeComprasJSON)
    }
    recuperarStorage() {
        let listaDeComprasJS = JSON.parse(localStorage.getItem("listaDeCompras"))
        let listaAux = []
        listaDeComprasJS.forEach(comida => {
            let producto = new Comida(comida.id, comida.nombre, comida.descripcion, comida.cantidad, comida.precio, comida.img)
            listaAux.push(producto)
        })
        this.listaDeCompras = listaAux
    }
    eliminarComida(productoEliminar) {
        let indice = this.listaDeCompras.findIndex(producto => producto.id == productoEliminar.id)
        this.listaDeCompras.splice(indice, 1)
    }
    eventoEliminar() {
        this.listaDeCompras.forEach(comida => {
            let btnEliminar = document.getElementById(`btn_eliminar-${comida.id}`)
            btnEliminar.addEventListener("click", () => {
                this.eliminarComida(comida)
                this.guardarEnStorage()
                this.mostrarProductosEnDOM()
            })
        })
    }
    sumarCantidad(comidaAAumentar) {
        this.listaDeCompras.forEach(comida => comida.id == comidaAAumentar.id)
        comidaAAumentar.cantidad += 1

    }
    evento_Aumentar() {
        this.listaDeCompras.forEach(comida => {
            let btn_mas = document.getElementById(`btn_mas-${comida.id}`)
            btn_mas.addEventListener("click", () => {
                this.sumarCantidad(comida)
                this.guardarEnStorage()
                this.mostrarProductosEnDOM()
            })
        })
    }
    restarCantidad(comidaRestar) {
        this.listaDeCompras.forEach(comida => comida.id == comidaRestar.id)
        if (comidaRestar.cantidad > 1) {
            comidaRestar.cantidad -= 1
        }
    }
    evento_disminuir() {
        this.listaDeCompras.forEach(comida => {
            let btn_menos = document.getElementById(`btn_menos-${comida.id}`)
            btn_menos.addEventListener("click", () => {
                this.restarCantidad(comida)
                this.guardarEnStorage()
                this.mostrarProductosEnDOM()
            })
        })
    }
    totalCompra() {
        return this.listaDeCompras.reduce((acumulador, comida) => acumulador += comida.precio * comida.cantidad, 0)
    }
    eventoTotal() {
        let total = document.getElementById("total_compra")
        total.innerText = `Total de la compra: $${this.totalCompra()}`
    }
}
// principal

const cp = new ControlDeProducto()
const carro = new CarritoDelivery()

carro.recuperarStorage()
carro.mostrarProductosEnDOM()

cp.cargarComidas()
cp.mostrarProductosEnDOM()
