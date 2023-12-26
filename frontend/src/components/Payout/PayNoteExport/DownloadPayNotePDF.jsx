// Import React if needed
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';


// Define the DownloadPayNotePDF function
const downloadPayNotePDF = (cribroomDataArray, year, month, zone_name) => {

    var sumMax_capacity = 0;
    var sumAmount = 0

    cribroomDataArray.map((dataItem, index) => { 
      sumMax_capacity += dataItem.max_capacity;
      sumAmount += dataItem.payNote_amount;
    });
  
    // Dynamically generate table rows based on the array data
    const tableRows = cribroomDataArray.map((dataItem, index) => `
      <tr style="height:18pt">
        <td style="width:69pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 32pt;text-indent: 0pt;text-align: left;">${dataItem.id}</p>
        </td>
        <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">${dataItem.CUIT}</p>
        </td>
        <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">${dataItem.name}</p>
        </td>
        <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">${dataItem.entity}</p>
        </td>
        <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">${dataItem.code}</p>
        </td>
        <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">${year}</p>
        </td>
        <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">${month}</p>
        </td>
        <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">${dataItem.max_capacity}</p>
        </td>
        <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s5" style="padding-top: 4pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">${dataItem.payNote_amount}</p>
        </td>
        <!-- Add more table cells for other dataItem properties -->
      </tr>
    `).join('');
  
        

    const htmlContent = `
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>file_1703560369387</title><style type="text/css"> * {margin:0; padding:0; text-indent:0; }
 h1 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: underline; font-size: 9pt; }
 .s1 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 7.5pt; }
 h2 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 7.5pt; }
 .s2 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: underline; font-size: 7.5pt; }
 p { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 7pt; margin:0pt; }
 .s3 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 7.5pt; }
 .s4 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 7pt; }
 .s5 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 6.5pt; }
</style></head><body><h1 style="padding-top: 3pt;padding-bottom: 1pt;padding-left: 156pt;text-indent: 0pt;text-align: left;">Dirección General de Coordinación de Salas Cuna</h1><p style="padding-left: 5pt;text-indent: 0pt;line-height: 1pt;text-align: left;"/><p class="s1" style="padding-left: 340pt;text-indent: 0pt;text-align: left;">Córdoba,</p><h2 style="padding-top: 3pt;padding-left: 7pt;text-indent: 0pt;line-height: 135%;text-align: left;">Sr. Subsecretario de Administración y Recursos Humanos</h2><h2 style="padding-left: 7pt;text-indent: 0pt;line-height: 135%;text-align: left;">Cr. Alejandro Francesconi Ministerio de Desarrollo Social</h2><p class="s2" style="padding-left: 7pt;text-indent: 0pt;line-height: 9pt;text-align: left;">S &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D</p><p style="text-indent: 0pt;text-align: left;"><br/></p><p style="padding-top: 4pt;padding-left: 7pt;text-indent: 119pt;line-height: 199%;text-align: left;">De mi mayor consideración, por medio de la presente remito a Ud. con mi CONFORMIDAD, la nómina de participantes del Programa Salas Cuna ${zone_name}, con el total de niñas y niños que recibieron atención y cuidado en los establecimientos adheridos a tal efecto, para que se efectivice el pago del mes de ${month} de ${year} según lo establecido en Resolución Ministerial N° 2023/MDS00-00000731, de las siguientes Salas Cuna continuación se detallan:</p><p style="text-indent: 0pt;text-align: left;"><br/></p><table style="border-collapse:collapse;margin-left:5.87065pt" cellspacing="0">
<!-- Table headers -->
<tr style="height:21pt">
  <td style="width:69pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499">
    <p class="s3" style="padding-left: 19pt;padding-right: 10pt;text-indent: -11pt;line-height: 9pt;text-align: left;">NÚMERO DE ORDEN</p>
  </td>
  <td style="width:67pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499"><p class="s3" style="padding-top: 5pt;padding-left: 12pt;padding-right: 12pt;text-indent: 0pt;text-align: center;">CUIT</p></td><td style="width:47pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499"><p class="s3" style="padding-top: 5pt;padding-left: 3pt;padding-right: 3pt;text-indent: 0pt;text-align: center;">SALA</p></td><td style="width:75pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499"><p class="s3" style="padding-top: 5pt;padding-left: 6pt;padding-right: 6pt;text-indent: 0pt;text-align: center;">ENTIDAD</p></td><td style="width:38pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499"><p class="s3" style="padding-top: 5pt;padding-left: 1pt;padding-right: 1pt;text-indent: 0pt;text-align: center;">CÓDIGO</p></td><td style="width:23pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499"><p class="s3" style="padding-top: 5pt;padding-left: 1pt;padding-right: 1pt;text-indent: 0pt;text-align: center;">AÑO</p></td><td style="width:46pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499"><p class="s3" style="padding-top: 5pt;padding-left: 3pt;padding-right: 3pt;text-indent: 0pt;text-align: center;">MES</p></td><td style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499"><p class="s3" style="padding-left: 22pt;padding-right: 7pt;text-indent: -16pt;line-height: 9pt;text-align: left;">CANTIDAD DE NIÑOS</p></td><td style="width:62pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#FFE499"><p class="s3" style="padding-top: 5pt;padding-left: 15pt;text-indent: 0pt;text-align: left;">MONTO</p></td>
  <!-- Add headers for other properties -->
  </tr><tr style="height:11pt"><td style="width:365pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="7" bgcolor="#D9D9D9"><p class="s4" style="padding-left: 149pt;padding-right: 149pt;text-indent: 0pt;text-align: center;">TOTAL GENERAL</p></td><td style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#D9D9D9"><p class="s4" style="padding-left: 28pt;padding-right: 27pt;text-indent: 0pt;text-align: center;">${sumMax_capacity}</p></td><td style="width:62pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" bgcolor="#D9D9D9"><p class="s4" style="padding-left: 15pt;text-indent: 0pt;text-align: left;">$${sumAmount}</p></td>
</tr>
<!-- Dynamically generated table rows -->
${tableRows}
<!-- Total row -->
<tr style="height:11pt">
  <!-- Total row data -->
</tr>
</table>
<h2 style="padding-top: 1pt;padding-left: 266pt;text-indent: 0pt;text-align: left;">Sin otro particular, lo saludo cordialmente.</h2></body></html>
    `;


    let opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${month} ${zone_name}.pdf`,
        // filename: `${cribroomCode} ${cribroomName} ${startDate}-${endDate}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

    html2pdf().set(opt).from(htmlContent).save();
};

// Export the downloadPayNotePDF function
export default downloadPayNotePDF;
