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

const margin = 10;
// Espacio disponible considerando el margen
const availableWidth = pdfWid - 2 * margin;
const availableHeight = pdfHgt - 2 * margin;
// Calcula la escala para que la imagen quepa en el espacio disponible
const widthScale = availableWidth / wid;
const heightScale = availableHeight / hgt;
const scale = Math.min(widthScale, heightScale);
const scaledWidth = wid * scale;
const scaledHeight = hgt * scale;
// Calcula las coordenadas para centrar la imagen
const x = (pdfWid - scaledWidth) / 2;
const y = (pdfHgt - scaledHeight) / 2;

// Agregar la imagen al PDF (usando base64 en lugar de la ruta del archivo)
pdf.addImage(imageBase64, 'JPEG', x, y, scaledWidth, scaledHeight);

// Guardar el PDF
pdf.save('documento-con-imagen.pdf');

// Mostrar valores de escala y dimensiones

console.log("image width",wid);
console.log("image height",hgt);
console.log("Pdf width",pdfWid);
console.log("Pdf height",pdfHgt);
console.log("Pdf height",scale);

console.log("Nuevo width",scaledWidth);
console.log("Nuevo height",scaledHeight);
console.log("X:",x);
console.log("Y:",y);