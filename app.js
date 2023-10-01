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
                        <p class="card-text">Precio: $${this.precio}</p>
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
        this.platosFiltrados = []
    }
    agregar(comida) {
        if (comida instanceof Comida) {
            this.listaDeComidas.push(comida)
        }

    }
    async traerDeAPI() {
        let lista_ProductoJSON = await fetch("simulacionAPI.json")
        let lista_ProductoJS = await lista_ProductoJSON.json()
        lista_ProductoJS.forEach(producto => {
            let plato = new Comida(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.img, producto.cantidad)
            this.agregar(plato)
        })
        this.mostrarProductosEnDOM()



    }

    mostrarProductosEnDOM() {
        let lista_Producto = document.getElementById("lista_productos")
        lista_Producto.innerHTML = ""
        this.listaDeComidas.forEach((comida) => {
            lista_Producto.innerHTML += comida.descripcionListaComida()
        })
        this.listaDeComidas.forEach((comida) => {
            let btn_ag = document.getElementById(`btn_ag-${comida.id}`)
            btn_ag.addEventListener("click", () => {
                carro.agregar(comida)
                carro.guardarEnStorage()
                carro.mostrarProductosEnDOM()
                Toastify({
                    text: `añadiendo 1 ${comida.nombre} ${comida.descripcion}!`,
                    avatar: `${comida.img}`,
                    position: `center`,
                    gravity: "top",
                    duration: 3000

                }).showToast();

            })
        })

    }
    mostrarComidasFiltradasEnDOM() {
        let lista_Producto = document.getElementById("lista_productos")
        lista_Producto.innerHTML = ""
        this.platosFiltrados.forEach((comida) => {
            lista_Producto.innerHTML += comida.descripcionListaComida()
        })
        this.platosFiltrados.forEach((comida) => {
            let btn_ag = document.getElementById(`btn_ag-${comida.id}`)
            btn_ag.addEventListener("click", () => {
                carro.agregar(comida)
                carro.guardarEnStorage()
                carro.mostrarProductosEnDOM()
                Toastify({
                    text: `añadiendo 1 ${comida.nombre} ${comida.descripcion}!`,
                    avatar: `${comida.img}`,
                    position: `center`,
                    gravity: "top",
                    duration: 3000

                }).showToast();


            })
        })

    }
    eventoFiltro() {
        this.filtroRavioles()
        this.filtroTallarines()
        this.filtroAgnoloti()
        this.todosLosPlatos()
    }
    filtroRavioles() {
        this.platosFiltrados = []
        let btn_ravioles = document.getElementById("btn_ravioles")
        btn_ravioles.addEventListener("click", () => {
            this.platosFiltrados = this.listaDeComidas.filter((producto) => producto.nombre == "ravioles")
            this.mostrarComidasFiltradasEnDOM()
        })
    }
    filtroAgnoloti() {
        this.platosFiltrados = []
        let btn_agnoloti = document.getElementById("btn_agnoloti")
        btn_agnoloti.addEventListener("click", () => {
            this.platosFiltrados = this.listaDeComidas.filter((producto) => producto.nombre == "Agnolotis")
            this.mostrarComidasFiltradasEnDOM()
        })
    }
    filtroTallarines() {
        this.platosFiltrados = []
        let btn_tallarines = document.getElementById("btn_tallarines")
        btn_tallarines.addEventListener("click", () => {
            this.platosFiltrados = this.listaDeComidas.filter((producto) => producto.nombre == "tallarines")
            this.mostrarComidasFiltradasEnDOM()
        })


    }
    todosLosPlatos() {

        let btn_todos = document.getElementById("btn_todos")
        btn_todos.addEventListener("click", () => {
            this.listaDeComidas = []
            this.traerDeAPI()
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
    mostrarProductosEnDOM() {
        let lista_carrito = document.getElementById("lista_Carrito")
        lista_carrito.innerHTML = ""
        this.listaDeCompras.forEach((comida) => {
            lista_carrito.innerHTML += comida.descripcionCarrito()
        })
        this.evento_Aumentar()
        this.evento_disminuir()
        this.eventoEliminar()
        this.eventoTotal()
        this.vaciarCarro()
        this.eventoFinalizar()

    }
    guardarEnStorage() {
        let listaDeComprasJSON = JSON.stringify(this.listaDeCompras)
        localStorage.setItem("listaDeCompras", listaDeComprasJSON)
    }
    recuperarStorage() {
        let listaDeComprasJS = JSON.parse(localStorage.getItem("listaDeCompras")) || []
        listaDeComprasJS.forEach(comida => {
            let producto = new Comida(comida.id, comida.nombre, comida.descripcion, comida.precio, comida.img, comida.cantidad, )
            this.listaDeCompras.push(producto)
        })
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
    vaciarCarro() {
        let btn_vaciar = document.getElementById("btn_vaciar")
        btn_vaciar.addEventListener("click", () => {
            if (this.listaDeCompras.length > 0) {

                swal({
                        title: "Estas seguro?",
                        text: "¡ estas a punto de vaciar el carrito!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            this.listaDeCompras = []
                            this.eventoTotal()
                            this.guardarEnStorage()
                            this.mostrarProductosEnDOM()
                            swal("¡ el carro fue vaciado exitosamente !", {
                                icon: "success",
                            });
                        } else {
                            swal("cancelado.Los productos seguirán en el carrito!");
                        }
                    });


            } else {
                swal("¡ Upss.! ", " ...¡ No hay productos en el carrito ! ")
            }



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
    eventoFinalizar() {
        let btn_finalizar = document.getElementById("btn_finalizar")
        btn_finalizar.addEventListener("click", () => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Estas a punto de realizar la compra ?',
                text: "Estas seguro de continuar?!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'si, continuar!',
                cancelButtonText: 'No, cancelar!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.listaDeCompras=[]
                    this.guardarEnStorage()
                    this.mostrarProductosEnDOM()
                    swalWithBootstrapButtons.fire(
                        'Compra finalizada!',
                        ' Gracias por su compra !!',
                        'success'
                    )
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        '¡ Compra Cancelada !',
                        `puede seguir comprando`,
                        'error'
                    )
                }
            })
        })
    }
}
// principal

const cp = new ControlDeProducto()
const carro = new CarritoDelivery()

carro.recuperarStorage()
carro.mostrarProductosEnDOM()

cp.traerDeAPI()
cp.eventoFiltro()