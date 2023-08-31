class Producto {
    constructor(id, nombre, stock, cantidad, precio) {
        this.id = id;
        this.nombre = nombre;
        this.stock = stock;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}
class ControladorProducto {
    constructor() {
        this.listaProductos = []
    }
    agregar(producto) {

        this.listaProductos.push(producto)
    }
    buscarProducto(id) {
        return this.listaProductos.some((producto) => producto.id == id)
    }
    mostrar() {
        let acumulador = "";
        this.listaProductos.forEach(producto => {
            acumulador = acumulador + "id " + producto.id + " producto: \t" + producto.nombre + "  stock: \t " + producto.stock + " cantidad: " + producto.cantidad + " precio: \t" + producto.precio + "\n"
        })
        return acumulador;
    }

}

class Carrito {
    constructor() {
        this.listaDeCompras = [];
        this.iva = 1.21;
        this.promoSantander = 0.15;
        this.promoCemcosud = 0.10;
    }
    agregar(listaProductos, producto) {
        for (const objeto of listaProductos) {
            if (objeto.id == producto) {
                this.listaDeCompras.push(objeto)
            }
        }
    }
    agregarMasAlCarrito(listaProducto, producto, cantidad) {
        for (const objeto of listaProducto) {
            if (objeto.id == producto) {
                objeto.cantidad = cantidad - 1;
                objeto.stock -= cantidad;
                this.listaDeCompras.push(objeto);
            }
        }
    }
    mostrar() {
        let acumulador = "";
        this.listaDeCompras.forEach(producto => {
            acumulador = acumulador + "id " + producto.id + " producto: \t" + producto.nombre + "  stock: \t " + producto.stock + " cantidad: x  " + producto.cantidad + " precio: \t" + producto.precio + "\n"
        })
        return acumulador;
    }
    sumarIva() {
        return this.listaDeCompras.forEach((producto) => producto.precio = producto.precio * this.iva)
    }
    totalCompra() {
        return this.listaDeCompras.reduce((acumulador, producto) => acumulador = acumulador + (producto.precio * producto.cantidad), 0)
    }
    PagoSantander(total) {
        let totalCompra = total - (total * this.promoSantander);
        return totalCompra;
    }
    PagoCencosud(total) {
        let totalCompra = total - (total * this.promoCemcosud);
        return totalCompra;
    }
}


// declaracion de instancias de producto
let p1 = new Producto(1, "mermelada", 100, 1, 90);
let p2 = new Producto(2, "mayonesa", 10, 1, 120);
let p3 = new Producto(3, "gaseosa", 100, 1, 1900);
let p4 = new Producto(4, "leche", 30, 1, 800);
let p5 = new Producto(5, "cafe", 100, 1, 1700);
let p6 = new Producto(6, "arroz", 10, 1, 1200);
let p7 = new Producto(7, "azucar", 20, 1, 1000)
    //agrego a lista de productos
cp = new ControladorProducto()
cp.agregar(p1);
cp.agregar(p2);
cp.agregar(p3);
cp.agregar(p4);
cp.agregar(p5);
cp.agregar(p6);
cp.agregar(p7);

// mostrar lista
let productos = cp.mostrar();
alert(productos);
// programa principal
let opcion = prompt("agregar un producto al carrito? ingese si o no");
while (opcion != "si" && opcion != "no" && typeof(opcion) != String) {
    opcion = prompt("Error.agregar un producto al carrito? ingese si o no");
}
let carrito = new Carrito();
while (opcion == "si") {

    let producto = Number(prompt("ingrese ID del producto: "));
    let respuesta1 = cp.buscarProducto(producto);
    if (respuesta1 == true) {
        let respuesta2 = prompt("desea agregar mas cantidad del producto " + producto + " ?.Ingrese si o no")
        while (respuesta2 != "si" && respuesta2 != "no" && typeof(respuesta2) != String) {
            respuesta2 = prompt("desea agregar mas unidades del producto " + producto + "?.Ingese si o no")

        }
        if (respuesta2 == "si") {
            let cantidad = Number(prompt("cuantas unidades quiere agregar:"))
            carrito.agregarMasAlCarrito(cp.listaProductos, producto, cantidad)
            alert("se añadio al carrito " + cantidad + " del producto " + producto)
        } else if (respuesta2 == "no") {
            carrito.agregar(cp.listaProductos, producto)
            alert("se agregó 1 unidad del producto " + producto + " al carrito")
        }

    } else if (respuesta1 == false) {
        alert("el producto no se encuentra en la lista");
    }
    opcion = prompt("desea agregar un producto al carrito? ingese si o no");
    while (opcion != "si" && opcion != "no" && typeof(opcion) != String) {
        opcion = prompt("desea agregar un producto al carrito? ingese si o no");
    }

}
alert("esta a punto de finalizar la compra. Estamos Preparando su pedido");
carrito.sumarIva();
let productosComprados = carrito.mostrar();
alert(productosComprados);
let total = carrito.totalCompra();
let respuesta3 = Number(prompt("total a pagar es: $" + total + "\nseleccione metodo de pago:\n 1)debito\n  2)credito Santander( 15% off )\n 3) credito Cencosud (10% off)\n4)Salir de la compra "))
while (respuesta3 < 1 && respuesta3 > 4) {
    respuesta3 = Number(prompt("seleccione metodo de pago: 1)debito\n  2)credito Santander( 15% off ) \n3) credito Cencosud (10% off) o \n4)Salir de la compra"))
}
if (respuesta3 == 1) {
    alert("el total de la compra es : $" + total + " \n Gracias por su compra!!");
} else if (respuesta3 == 2) {
    total = carrito.PagoSantander(total)
    alert("total con descuento del 15% por pago con tarjeta Santander: $ " + total + " \n Gracias por su compra!!");

} else if (respuesta3 == 3) {
    total = carrito.PagoCencosud(total);
    alert("total con descuento por pago con tarjeta Cencosud : $ " + total + " \n Gracias por su compra!!")

}