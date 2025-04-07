var jsPDF = require("jspdf").jsPDF;
var fs = require("fs");
// Crear una instancia de jsPDF
var pdf = new jsPDF('p', 'pt', 'a4');
// Leer la imagen local
var url = 'image.jpg';
var imageBuffer = fs.readFileSync(url);
// Convertir la imagen a base64
var imageBase64 = imageBuffer.toString('base64');
// Obtener las propiedades de la imagen
var imgProps = pdf.getImageProperties(imageBase64);
var wid = imgProps.width;
var hgt = imgProps.height;
// Obtener las dimensiones del PDF
var pdfWid = pdf.internal.pageSize.getWidth();
var pdfHgt = pdf.internal.pageSize.getHeight();
// Determinar la escala y el tamaño de la imagen
var isLandscape = wid > hgt;
var scale = isLandscape ? pdfWid / wid : pdfHgt / hgt;
var newWid = 500;
var newHgt = hgt * scale * (1 || 1);
// Calcular la posición de la imagen en el centro del PDF
var x = (pdfWid - newWid) / 2;
var y = (pdfHgt - newHgt) / 2;
// Agregar la imagen al PDF (usando base64 en lugar de la ruta del archivo)
pdf.addImage(imageBase64, 'JPEG', x, y, newWid, newHgt);
// Guardar el PDF
pdf.save('documento-con-imagen.pdf');
// Mostrar valores de escala y dimensiones
console.log(wid);
console.log(hgt);
console.log(scale);
console.log(newWid);
console.log(newHgt);
console.log(x);
console.log(y);
