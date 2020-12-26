var http = require("http");

var server = http.createServer();

function mensaje(petic, resp) {
  resp.writeHead(200, { "content-type": "text/plain" });
  resp.write("Hola Mundo");
  resp.end();
}
server.on("request", mensaje);

server.listen(3000, function () {
  console.log("La Aplicación está funcionando en el puerto 3000");
});

//// Conexion a Base de datos/////////

// Paquete necesario para conectar a bases de datos MySQL.
var mysql = require("mysql2");
// Consulta SQL.
var sql = "SELECT * FROM ventas_2020";

// Parámetros de conexión a la base de datos.
var con = mysql.createConnection({
  host: "192.168.19.250",
  port: 3306,
  user: "root",
  password: "N4r4nk4",
  database: "naranka",
});

// Funcion que nos permite comprobar la conexión a la base de datos.
con.connect(function (err) {
  if (err) throw err;
  console.log("Conexión Creada!");
});

// Funcion que nos devolverá resultados de la base de datos y los almacena en funcion setValue.
con.connect(function (err) {
  if (err) throw err;
  console.log();
  con.query(sql, function (err, result) {
    if (err) throw err;
    /*else {
    setValue(result);
  }*/

    // Bucle que recore los resultados y pinta en consola.
    for (i = 0; i < result.length; i++) {
      console.log(
        "---------------------------------------------" +
          "\n" +
          "Cliente: " +
          result[i].cliente +
          "\n" +
          "Producto: " +
          result[i].nombre_referencia +
          "\n" +
          "---------------------------------------------" +
          "\n" +
          "\n"
      );
    }
  });
});

///////////////////////Data ////////////////
var clientes = [];

function setValue(value) {
  clientes = value;
  console.log(clientes);
}

//////////////// CRON /////////////////

var cron = require("node-cron");

cron.schedule("*/1 * * * *", () => {
  console.log("Corriendo proceso cada 2 minutos");
});
