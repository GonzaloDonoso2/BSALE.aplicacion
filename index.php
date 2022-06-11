<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>BSALE</title>
        <!--Estos <link> contienen las importaciones de los CDN de Bootstrap que dan estilo e icono a esta página web.-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">   
    </head>
    <body>
        <nav class="navbar sticky-top" style="background-color: #EA5B0C;">
            <table style="table-layout: fixed; width: 100%;">
                <tbody>
                    <tr>     
                        <td>
                            <img height="75px" src="Imagenes/Logotipo.png" width="150px">
                        </td>
                        <td>
                            <select class="form-select" id="listaCategorias">
                                <option selected value="Seleccione una Categoría">Seleccione una Categoría</option>
                            </select> 
                        </td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input class="form-control" id="nombreProducto" placeholder="Nombre del porducto" type="text">  
                                        </td>
                                        <td>
                                            <button class="btn btn-primary form-control" id="botonBuscar" type="button">Buscar <i class="bi bi-search"></i></button>  
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <button class="btn btn-secondary" id="carroCompras" type="button">0</button>
                                                <button class="btn btn-secondary" id="iconoCarroCompras" type="button"><i class="bi bi-cart"></i></button>
                                            </div>                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>   
        </nav>
        <main>
            <div class="alert alert-warning alert-dismissible fade sticky-top" role="alert" id="alertaVisual">
                <strong id="mensajeAlertaVisual"></strong>
                <button aria-label="Close" class="btn-close" id="botonOcultar" type="button"></button>
            </div>           
            <div class="container" id="contenedorProductos"></div>
        </main>        
        <!--Estos <script></<script> contienen las importaciones de los CDN de jQuery que dan funcionalidad a esta página web.-->
        <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
        <!--Estos <script></<script> contienen las importaciones de los CDN de Bootstrap que dan funcionalidad a esta página web.-->
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        <script src="Funciones.js"></script>
    </body>
</html>
