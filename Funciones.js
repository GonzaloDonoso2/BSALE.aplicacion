$(document).ready(function () {

    ObtenerCategorias();
    ObtenerProductos();
});

const listaCategorias = document.querySelector("#listaCategorias");
const botonBuscar = document.querySelector("#botonBuscar");
const carroCompras = document.querySelector("#carroCompras");
const iconoCarroCompras = document.querySelector("#iconoCarroCompras");
const botonOcultar = document.querySelector("#botonOcultar");

function ObtenerCategorias() {

    $.ajax({

        url: "https://gonzalodonosobackend.herokuapp.com/servidor/categorias",
        method: "GET",
        success: function (respuesta) {

            let listaCategorias = respuesta;

            let plantilla = "";

            for (let i = 0; i < listaCategorias.length; i++) {

                plantilla += `<option selected value=${listaCategorias[i].id}>${listaCategorias[i].nombre}</option>'>`;
            }

            plantilla += "<option selected value='Seleccione una Categoría'>Seleccione una Categoría</option>"

            $("#listaCategorias").html(plantilla);
        }
    });
}

function listarProductos(respuesta) {

    let listaProductos = respuesta;
    let a = listaProductos.length;
    let b = (a / 4);
    let c = parseInt(b.toFixed());
    let numeroFilas = (c + 1);
    let plantillaFila = "";

    for (let i = 0; i <= numeroFilas; i++) {

        plantillaFila += `<div class="row" id="fila${i}"></div><br>`;
    }

    $("#contenedorProductos").html(plantillaFila);

    let numeroColumnas = 4;
    let identificadorFila = 0;
    let plantillaColumna = "";

    for (let i = 0; i < listaProductos.length; i++) { 
        
        let imagen = listaProductos[i].imagen;
        let a = listaProductos[i].precio;
        let b = listaProductos[i].descuento;
        let precioNormal = parseInt(a);
        let porcentajeDescuento = parseInt(b);
        let c = ((precioNormal * porcentajeDescuento) / 100);
        let descuento = parseInt(c.toFixed());
        let precioOferta = (precioNormal - descuento);
        
        if (imagen === "" | imagen === null) {
            
            imagen = "Imagenes/SinImagen.png";
        }

        if (i < numeroColumnas) {

            plantillaColumna += `
                <div class="col-3">
                    <div class="card" style="width: 16rem;">
                        <div class="card-header" style="height:80px;">
                            <p class="card-title"><b>${listaProductos[i].nombre}</b></p>
                        </div>
                        <img alt="" height="150px" width="150px" src="${imagen}" class="card-img-top">
                        <div class="card-body">
                            <p class="card-title">Precio Normal: ${precioNormal} CLP</p>
                            <p class="card-title">% Descuento: ${porcentajeDescuento}</p>
                            <p class="card-title"><b>Precio Oferta: ${precioOferta} CLP</b></p>
                            <button class="btn btn-outline-success" onclick="AgregarProductoCarroCompras('${listaProductos[i].nombre}', ${listaProductos[i].id})">Agregar <i class="bi bi-cart-plus"></i></button>
                        </div>                        
                    </div>
                </div>`;

        } else {

            identificadorFila = (identificadorFila + 1);
            numeroColumnas = (numeroColumnas + 4);

            plantillaColumna = `
                <div class="col-3">
                    <div class="card" style="width: 16rem;">
                        <div class="card-header" style="height:80px;">
                            <p class="card-title"><b>${listaProductos[i].nombre}</b></p>
                        </div>
                        <img alt="" height="150px" width="150px" src="${imagen}" class="card-img-top">
                        <div class="card-body">
                            <p class="card-title">Precio Normal: ${precioNormal} CLP</p>
                            <p class="card-title">% Descuento: ${porcentajeDescuento}</p>
                            <p class="card-title"><b>Precio Oferta: ${precioOferta} CLP</b></p>
                            <button class="btn btn-outline-success" onclick="AgregarProductoCarroCompras('${listaProductos[i].nombre}')">Agregar <i class="bi bi-cart-plus"></i></button>
                        </div>                        
                    </div>
                </div>`;
        }

        $(`#fila${identificadorFila}`).html(plantillaColumna);
    }
}

function ObtenerProductos() {

    $.ajax({

        url: "https://gonzalodonosobackend.herokuapp.com/servidor/productos",
        method: "GET",
        success: function (respuesta) {

            listarProductos(respuesta);
        }
    });
}

function ObtenerProductosCategoria() {
    
    $("#nombreProducto").val("");

    let categoria = $("#listaCategorias").val();    
    let nombreCategoria = $("#listaCategorias option:selected").text();

    if (categoria === "Seleccione una Categoría") {
        
        ObtenerProductos();
        
        $("#alertaVisual").addClass("show").addClass("alert-warning").removeClass("fade").removeClass("alert-danger").removeClass("alert-success");
        $("#mensajeAlertaVisual").text("Listando todos los productos.");   
        
    } else {       

        let Url = "https://gonzalodonosobackend.herokuapp.com/servidor/productos/productosCategoria/" + categoria + "?";

        $.ajax({

            url: Url,
            method: "GET",
            success: function (respuesta) {

                $("#alertaVisual").addClass("show").addClass("alert-success").removeClass("fade").removeClass("alert-danger").removeClass("alert-warning");
                $("#mensajeAlertaVisual").text("Listando todos los productos de la categoría " + nombreCategoria + ".");

                listarProductos(respuesta);
            }
        });
    }
}

function ObtenerProductosNombre() {
    
    ObtenerCategorias();

    let nombre = $("#nombreProducto").val();

    if (nombre === "") {

        $("#alertaVisual").addClass("show").addClass("alert-danger").removeClass("fade").removeClass("alert-success").removeClass("alert-warning");
        $("#mensajeAlertaVisual").text("Primero ingrese el nombre de un producto.");        
        $("#nombreProducto").focus();

    } else {

        let Url = "https://gonzalodonosobackend.herokuapp.com/servidor/productos/productosNombre/" + nombre + "?";

        $.ajax({

            url: Url,
            method: "GET",
            success: function (respuesta) {
                
                if (respuesta.length > 0) {
                    
                    listarProductos(respuesta);
                    
                    $("#alertaVisual").addClass("show").addClass("alert-success").removeClass("fade").removeClass("alert-danger").removeClass("alert-warning");
                    $("#mensajeAlertaVisual").text("Listando todos los productos que coinciden con su búsqueda.");
                    
                } else {
                    
                    $("#alertaVisual").addClass("show").addClass("alert-danger").removeClass("fade").removeClass("alert-success").removeClass("alert-warning");
                    $("#mensajeAlertaVisual").text("No hay productos que coinciden con su búsqueda.");
                    $("#contenedorProductos").html("");                    
                }
            }
        });
    }
}

function AgregarProductoCarroCompras (nombre) {
    
    let a = $("#carroCompras").text();
    let cantidadAnterior = parseInt(a);
    let cantidadActual = (cantidadAnterior + 1);
    
    $("#carroCompras").text(cantidadActual);
    $("#alertaVisual").addClass("show").addClass("alert-success").removeClass("fade").removeClass("alert-danger").removeClass("alert-warning");
    $("#mensajeAlertaVisual").text("Agrego un " + nombre + " a su carro de compras.");       
}

function AgregarProductoCarroCompras (nombre) {
    
    let a = $("#carroCompras").text();
    let cantidadAnterior = parseInt(a);
    let cantidadActual = (cantidadAnterior + 1);
    
    $("#carroCompras").text(cantidadActual);
    $("#alertaVisual").addClass("show").addClass("alert-success").removeClass("fade").removeClass("alert-danger").removeClass("alert-warning");
    $("#mensajeAlertaVisual").text("Agrego un " + nombre + " a su carro de compras.");       
}

function MostrarCarroCompras () {
    
    let a = $("#carroCompras").text();
    let cantidadActual = parseInt(a);
    
    $("#carroCompras").text(cantidadActual);
    $("#alertaVisual").addClass("show").addClass("alert-warning").removeClass("fade").removeClass("alert-danger").removeClass("alert-success");
    $("#mensajeAlertaVisual").text("Tiene " + cantidadActual + " productos en su carro de compras. ");       
}

function OcultarAlertaVisual() {

    $("#alertaVisual").addClass("fade").removeClass("show");
}

listaCategorias.addEventListener("change", ObtenerProductosCategoria, false);
botonBuscar.addEventListener("click", ObtenerProductosNombre, false);
carroCompras.addEventListener("click", MostrarCarroCompras, false);
iconoCarroCompras.addEventListener("click", MostrarCarroCompras, false);
botonOcultar.addEventListener("click", OcultarAlertaVisual, false);