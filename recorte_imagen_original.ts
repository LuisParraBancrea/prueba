const { jsPDF } = require("jspdf");
const fs = require("fs");

// Crear una instancia de jsPDF
const pdf = new jsPDF('p', 'pt', 'a4');

// Leer la imagen local
const url = 'image2.jpg';
const imageBuffer = fs.readFileSync(url);

// Convertir la imagen a base64
const imageBase64 = imageBuffer.toString('base64');

// Obtener las propiedades de la imagen
const imgProps = pdf.getImageProperties(imageBase64);
const wid = imgProps.width;
const hgt = imgProps.height;

// Obtener las dimensiones del PDF
const pdfWid = pdf.internal.pageSize.getWidth();
const pdfHgt = pdf.internal.pageSize.getHeight();

// Determinar la escala y el tamaño de la imagen
const isLandscape = wid > hgt;
const scale = isLandscape ? pdfWid / wid : pdfHgt / hgt;
const newWid = wid * scale * (1 || 1);
const newHgt = hgt * scale * (1 || 1);

// Calcular la posición de la imagen en el centro del PDF
const x = (pdfWid - newWid) / 2;
const y = (pdfHgt - newHgt) / 2;

// Agregar la imagen al PDF (usando base64 en lugar de la ruta del archivo)
pdf.addImage(imageBase64, 'JPEG', x, y, newWid, newHgt);

// Guardar el PDF
pdf.save('documento-con-imagen.pdf');

// Mostrar valores de escala y dimensiones

console.log("image width",wid);
console.log("image height",hgt);
console.log("Pdf width",pdfWid);
console.log("Pdf height",pdfHgt);
console.log("Pdf height",scale);
console.log("Es horizontal? " ,isLandscape);
console.log("Nuevo width",newWid);
console.log("Nuevo height",newHgt);
console.log("X:",x);
console.log("Y:",y);