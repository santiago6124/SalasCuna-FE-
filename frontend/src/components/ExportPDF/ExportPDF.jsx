import React from 'react';
import { useRef } from 'react';

// import baseFile from './baseFile.html';

export default function ExportPDF() {
    // create a ref by importing sellet from react
    const iframeRef = useRef();

    const downloadPDF = () => {
        const iframe = iframeRef.current;
        const iframeWindow = iframe.contentWindow || iframe;

        // Replace this with your HTML content as a string
        const htmlContent = `
        <html>
    
        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="content-type">
            <style type="text/css">
                ol {
                    margin: 0;
                    padding: 0
                }
        
                table td,
                table th {
                    padding: 0
                }
        
                .c1 {
                    border-right-style: solid;
                    border-bottom-color: #000000;
                    border-top-width: 1.5pt;
                    border-right-width: 1.5pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1.5pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1.5pt;
                    width: 150pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c4 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c2 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial MT";
                    font-style: normal
                }
        
                .c15 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 10pt;
                    font-family: "Arial MT";
                    font-style: normal
                }
        
                .c11 {
                    margin-left: 5pt;
                    padding-top: 6.3pt;
                    text-indent: 162.8pt;
                    padding-bottom: 0pt;
                    line-height: 1.5;
                    text-align: justify;
                    margin-right: 5.6pt
                }
        
                .c8 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 4.5pt;
                    font-family: "Arial MT";
                    font-style: normal
                }
        
                .c7 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 9pt;
                    font-family: "Arial MT";
                    font-style: normal
                }
        
                .c16 {
                    color: #000000;
                    font-weight: 400;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial MT";
                    font-style: normal
                }
        
                .c12 {
                    margin-left: 5pt;
                    padding-top: 1.9pt;
                    padding-bottom: 0pt;
                    line-height: 1.5;
                    text-align: left;
                    margin-right: 275.2pt
                }
        
                .c18 {
                    margin-left: 5pt;
                    padding-top: 0.1pt;
                    padding-bottom: 0pt;
                    line-height: 1.1500000000000001;
                    text-align: left;
                    margin-right: 4.7pt
                }
        
                .c6 {
                    margin-left: 4.5pt;
                    padding-top: 5.5pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }
        
                .c14 {
                    padding-top: 0.4pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left;
                    height: 11pt
                }
        
                .c5 {
                    margin-left: 5pt;
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }
        
                .c22 {
                    padding-top: 5.5pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: right;
                    margin-right: 103.1pt
                }
        
                .c13 {
                    margin-left: 5pt;
                    padding-top: 5.5pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }
        
                .c3 {
                    margin-left: 4.5pt;
                    padding-top: 5.7pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }
        
                .c17 {
                    padding-top: 0.1pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left;
                    height: 11pt
                }
        
                .c9 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 0.06;
                    text-align: left
                }
        
                .c24 {
                    margin-left: 6.5pt;
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin-right: auto
                }
        
                .c20 {
                    padding-top: 0.2pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }
        
                .c19 {
                    padding-top: 0.6pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }
        
                .c0 {
                    text-decoration-skip-ink: none;
                    -webkit-text-decoration-skip: none;
                    text-decoration: underline
                }
        
                .c21 {
                    background-color: #ffffff;
                    max-width: 452pt;
                    padding: 72pt 72pt 72pt 72pt
                }
        
                .c10 {
                    height: 24.5pt
                }
        
                .c23 {
                    height: 11pt
                }
        
                .title {
                    padding-top: 0pt;
                    color: #000000;
                    font-weight: 700;
                    font-size: 11pt;
                    padding-bottom: 0pt;
                    font-family: "Arial";
                    line-height: 1.0;
                    text-align: left
                }
        
                .subtitle {
                    padding-top: 18pt;
                    color: #666666;
                    font-size: 24pt;
                    padding-bottom: 4pt;
                    font-family: "Georgia";
                    line-height: 1.0;
                    page-break-after: avoid;
                    font-style: italic;
                    text-align: left
                }
        
                li {
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial MT"
                }
        
                p {
                    margin: 0;
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial MT"
                }
        
                h1 {
                    padding-top: 24pt;
                    color: #000000;
                    font-weight: 700;
                    font-size: 24pt;
                    padding-bottom: 6pt;
                    font-family: "Arial MT";
                    line-height: 1.0;
                    page-break-after: avoid;
                    text-align: left
                }
        
                h2 {
                    padding-top: 18pt;
                    color: #000000;
                    font-weight: 700;
                    font-size: 18pt;
                    padding-bottom: 4pt;
                    font-family: "Arial MT";
                    line-height: 1.0;
                    page-break-after: avoid;
                    text-align: left
                }
        
                h3 {
                    padding-top: 14pt;
                    color: #000000;
                    font-weight: 700;
                    font-size: 14pt;
                    padding-bottom: 4pt;
                    font-family: "Arial MT";
                    line-height: 1.0;
                    page-break-after: avoid;
                    text-align: left
                }
        
                h4 {
                    padding-top: 12pt;
                    color: #000000;
                    font-weight: 700;
                    font-size: 12pt;
                    padding-bottom: 2pt;
                    font-family: "Arial MT";
                    line-height: 1.0;
                    page-break-after: avoid;
                    text-align: left
                }
        
                h5 {
                    padding-top: 11pt;
                    color: #000000;
                    font-weight: 700;
                    font-size: 11pt;
                    padding-bottom: 2pt;
                    font-family: "Arial MT";
                    line-height: 1.0;
                    page-break-after: avoid;
                    text-align: left
                }
        
                h6 {
                    padding-top: 10pt;
                    color: #000000;
                    font-weight: 700;
                    font-size: 10pt;
                    padding-bottom: 2pt;
                    font-family: "Arial MT";
                    line-height: 1.0;
                    page-break-after: avoid;
                    text-align: left
                }
            </style>
        </head>
        
        <body class="c21 doc-content">
            <div>
                <p class="c9"><span
                        style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 602.00px; height: 72.00px;"><img
                            alt="" src="images/image5.png"
                            style="width: 602.00px; height: 72.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                            title=""></span></p>
            </div>
            <p class="c22"><span class="c2">C&oacute;rdoba,</span></p>
            <p class="c12 title"><span class="c4">Sr. Ministro de Desarrollo Social Dr. Juan Carlos Massei</span></p>
            <p class="c5 title"><span
                    class="c0">S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D</span>
            </p>
            <p class="c11"><span class="c2">Habiendo tomado conocimiento de lo solicitado por la entidad </span><span
                    class="c4">MUNICIPALIDAD DE HUINCA RENAC&Oacute;</span><span class="c2">, CUIT , esta Direcci&oacute;n de
                    Jurisdicci&oacute;n Coordinaci&oacute;n Salas Cuna del Ministerio de Desarrollo Social CERTIFICA que la sala
                    PASITOS </span><span class="c4">C&oacute;digo I.0491</span><span class="c2">, sita en MAIPU Y RAUL ALVAREZ
                    S/N de la Localidad de HUINCA RENANCO, Departamento GENERAL ROCA, de la Provincia de C&Oacute;RDOBA, se
                    encuentra adherida al Programa Salas Cuna. Atento a ello, en el marco de lo dispuesto por la normativa
                    vigente del Programa, se otorga el Visto Bueno a la solicitud, sugiriendo el Se&ntilde;or Secretario de
                    Gesti&oacute;n Administrativa - en funci&oacute;n del destino de los fondos y salvo mejor criterio - el
                    otorgamiento de un aporte econ&oacute;mico pagadero de forma mensual en concepto de ayuda directa no
                    reintegrable por la suma total de </span><span class="c4">PESOS OCHO MILLONES SETECIENTOS CINCUENTA MIL (
                    $8.750.000,00 ) </span><span class="c2">para el per&iacute;odo comprendido entre los meses de MAYO del 2023
                    a ABRIL del 2024 seg&uacute;n detalle adjunto, cabe aclarar que los importes mensuales ser&aacute;n de por
                    cada ni&ntilde;o asistente a la sala hasta un m&aacute;ximo de SETENTA (70) ni&ntilde;os y ni&ntilde;as
                    liquidables a favor de la instituci&oacute;n solicitante por el plazo anteriormente mencionado, ser&aacute;n
                    establecidos en la Resoluci&oacute;n Ministerial N&deg; 0007/2023.</span></p>
            <p class="c5"><span class="c0 c16">DETALLE</span></p>
            <p class="c17"><span class="c8"></span></p><a id="t.6ea88f66dc398c1cd51f2d89dde631a80804542d"></a><a id="t.0"></a>
            <table class="c24">
                <tr class="c10">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c2">C&Oacute;DIGO DE SALA</span></p>
                    </td>
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c2">NOMBRE DE SALA</span></p>
                    </td>
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c2">CANTIDAD DE NI&Ntilde;OS</span></p>
                    </td>
                </tr>
                <tr class="c10">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c6"><span class="c2">I.0491</span></p>
                    </td>
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c6"><span class="c2">PASITOS</span></p>
                    </td>
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c6"><span class="c2">70</span></p>
                    </td>
                </tr>
            </table>
            <p class="c19"><span
                    style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 601.33px; height: 70.67px;"><img
                        alt="" src="images/image2.png"
                        style="width: 601.33px; height: 70.67px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                        title=""></span><span
                    style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 601.33px; height: 70.67px;"><img
                        alt="" src="images/image1.png"
                        style="width: 601.33px; height: 70.67px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                        title=""></span></p>
            <p class="c20"><span
                    style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 601.33px; height: 70.67px;"><img
                        alt="" src="images/image4.png"
                        style="width: 601.33px; height: 70.67px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                        title=""></span></p>
            <p class="c20 c23"><span class="c7"></span></p>
            <p class="c14"><span class="c2"></span></p>
            <p class="c18"><span class="c2">Hecho, REM&Iacute;TANSE a la Subsecretaria de Administraci&oacute;n y Recursos
                    Humanos a los fines de su intervenci&oacute;n.</span></p>
            <p class="c13"><span class="c2">Sin otro particular, lo saludo atentamente.</span></p>
            <div>
                <p class="c9"><span
                        style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 274.78px; height: 28.60px;"><img
                            alt="" src="images/image3.jpg"
                            style="width: 274.78px; height: 28.60px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                            title=""></span></p>
            </div>
        </body>
        
        </html>
        `;

        // Inject the HTML content into the iframe
        iframeWindow.document.open();
        iframeWindow.document.write(htmlContent);
        iframeWindow.document.close();

        // Wait for a short time to ensure iframe content is loaded
        setTimeout(() => {
            iframeWindow.print();
        }, 1000);
    };

    return (
        <>
            {/* Off-screen iframe */}
            <iframe ref={iframeRef} style={{ display: 'none' }} title="PDFFrame" />

            <div className='row text-center mt-5'>
                <button className="btn btn-primary" onClick={downloadPDF}>
                    Download PDF
                </button>
            </div>
        </>
    );
}
