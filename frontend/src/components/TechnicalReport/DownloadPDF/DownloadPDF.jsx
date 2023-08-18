// Import React if needed
import React, { useRef } from 'react';

// Define the downloadPDF function
const downloadPDF = (
    iframeRef,
    entity,
    cribroomName,
    cribroomCode,
    cribroomStreet,
    cribroomHouseNumber,
    cribroomLocality,
    cribroomDepartment,
    totalSumStr,
    totalSumInitMonth,
    totalSumInitYear,
    totalSumEndMonth,
    totalSumEndYear,
    cribroomMaxCapacityStr,
    cribroomMaxCapacityInt,
    firstSubTotalSumEndMonth,
    SecSubTotalSumInitMonth,
    totalSumFloat,
    firstSubTotalSumFloat,
    SecSubTotalSumFloat
    ) => {
    const iframe = iframeRef.current;
    const iframeWindow = iframe.contentWindow || iframe;

    const base64Image1 = "iVBORw0KGgoAAAANSUhEUgAAAlMAAABGCAYAAADoxRHpAAAZWUlEQVR4Xu2dCbhWU9vHeQ0pQ12VmZIGQmQeQiRplgyRiDILKSVjoSJzRUkpIYpSyhQnkQbzPGVKNKhMlSFU63t/y3fvd+119qOj55zr63vP/3dd6+rsvfZee++117PWf9/3vVbrrbfeek5JSUlJSUlJSWmt03quoKDAzZkzR0lJSUlJSUlJqYgJ/ZSIqY8++sgJIYQQQoiig36SmBJCCCGEWEskpoQQQggh8kBiSgghhBAiDySmhBBCCCHyQGJKCCGEECIPJKaEEEIIIfJAYkoIIYQQIg8kpoQQQggh8kBiSgghhBAiDySmhBBCCCHyQGKqFDF58mR3yy23uJUrV8ZZQgghhFhLJKZKEYceeqh74okn4t1CCCGEyAOJqVLCokWL3J133hnvFkIIIUSeFKuYmjFjhrv++uvdbbfd5r744gv31ltv+f3PPvusu//++5P06aefJueMHj062T9r1qzUcaQpU6a4N954I+WaWr58eaHjwvTcc88lx8Lrr7/ubrrpJterVy83btw498cffyR5v//+e6Hzw/Tkk08GJTm3evVq9/LLL6f2wdKlSwud+/3338eHJSxcuDB17NNPP+1effVV99tvv/n8ZcuWFSovTPPnz3dfffVVah/1/OKLL7qffvopdS2ePzyO64S8+eabSf2MHTs2VT9ffvll6lzyp06d6t599123atWqoJQ0vMu+ffv6MrGGrcm1uGLFCjds2DB33XXXZdbvd999526//XY3dOjQ1P3BO++843r37u3uuusu9+OPP6byfvjhB7+/X79+7uuvv07lZcEz8YyzZ89OnvnDDz+MD0vgvdlxtI2Yl156KbUdlksqKChI8nhu249LNoTfEs9AfT722GOF6uCfsGDBgtQ9jBkzxr9TrhGX+8ILL6SOjfuIt99+291xxx3+vVEXf/75p99HvYfnPfzww+6TTz5J7YsTzJw5M9mO27HBNewY6ok6DMuZMGGCf56wLdD+wmPGjx/vj6F9h8ydO7fQfYXp119/dZ999pl75ZVXUucJIUo3xSamBg0a5E4++WT37bffuo8//ti1bt3aHX744Un+5Zdf7i/EIBzTqlUr37kBYqJ69equUaNGvnOn0+rRo4fbfvvtfecHH3zwgTv66KO90GHfFlts4Tp16uT/pmNv1qyZP46O76STTnJXXnmlFycIp1GjRrkDDjjAd4jAwHLIIYe4iRMn+vN32GEH1759e//33Xff7Y444gh/nMGAsfvuu6f2GT///LO/z8MOO8yLgzWBQNhkk018vT3//PPunHPOcdtss00iJihjp512ci1atPD3Y+nSSy9N3HXffPONW3/99d3555/v86699lq32WabueHDh4eX8qKV+uf5Deqaa/NuEIPUzyOPPOL233//lOBFGHNux44d/TWog3PPPddtt912bvDgwclxgNA99thjvaimPniGESNGuIMOOsgPVFkgYHjfp5xyijvmmGP8tXiPxrx581z9+vW9AEWwN27cOBFyzzzzjH+fZ5xxhq872g71Cgymp556qhcgPNO2226bc4AGBtwuXbp4Kx68//77/l7CdhyCoN1444192QzwMUuWLPFtk/sOefTRR92//vUv16RJk5QA42/azjXXXJOUxztq27at69atm793xA7iZ7/99vPCbG2xtnfCCSf4DxZECc9OHd54442p++rTp4+vBwSywb3QLi+66CLfBrkvhCP3f9555/ljEFSUFz7ne++958tCfFl75vq8X/uQuPXWW/0xCOQsaMPk0y8YlMc+fkeIX8RbjRo13CWXXJIcQ51Sb3vvvbe/LuKI3+vpp5+e+jCgD9tggw38uXaPJNq1iS9+Tw899FByjhCidFNsYoqBCguBQed65plnJtsPPPCAv1CWNYNOMbQaNGzY0AuaEIQGHR/w9YpVxqhUqVLKhWWCoU2bNu64445L9hv9+/d3O++8sxdYfC2bBQ1q1qzpevbsmWyH4gNOPPFE/xx0rlkcfPDByWBSFHgmrEIGoqNatWrJNnFOCJcQRE94/U033TQlaqirMmXKeIFkmDDACmUwSLds2TLZNrDkIOLC8zfaaKNCAu3xxx/3ouCee+5J9jHAtmvXLjjqL7BS1a5d2wvcGCyJ4UCNcECE2ABMW+B8A4GLQAMGXGtTiJsKFSr4wRiwkJilhcGfOsFyl4urr77aC5WQOnXq+HqjzcVcccUVfsBGkGbBPSNsEZYxCBeeETFvLF68uFC7P+2001zz5s1T+4CPl6pVq/6tOFwTfDggnEIQRAhExImBpYc6CK+F6OVDJQYhGrZXhEvnzp2T7V9++cWXhYU4hI8mK593xO9w6623TgRWyPHH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"; // Replace with your actual base64 encoded image data
    const base64Image2 = "iVBORw0KGgoAAAANSUhEUgAAAlMAAABGCAYAAADoxRHpAAAX8ElEQVR4Xu2dCbRO1fvHTZHkF7GUVFKoltJAc4YmGRpNlUwpUmmQBsrYXJKplimFDJkqSolrakAyUyGSoVAaiMz2f312a5+1333Pvbjvvdx/fT9rPct79j7vGfbZ793f8zzP3nLkyJHDyGQymUwmk8kybDlMSkqKWb16tUwmk8lkMpnsIA39FImpb7/91gghhBBCiIMH/SQxJYQQQgiRQSSmhBBCCCGSQGJKCCGEECIJJKaEEEIIIZJAYkoIIYQQIgkkpoQQQgghkkBiSgghhBAiCSSmhBBCCCGSQGJKCCGEECIJJKaEEEIIIZJAYuo/xLBhw8wTTzxh9u7dG1YJIYQQIoNITP2HuPTSS82sWbPCYiGEEEIkgcTUf4SNGzeakSNHhsVCCCGESJJMFVNDhw41Dz30kGndurVJSUkxEyZMsOUTJ040zz//vOncubPp0aOHWbFiRfSdd99915a/+uqr1mvSr18/u+2sb9++ZtSoUWbz5s3Rd37//feEfUJ75513on0JafH9p59+2jz11FOma9eu9vuOHTt2pPq+b/3794/2hT179pixY8cmlMGWLVvstbrvcR+//fZbuFvEhg0bzOuvvx7t37t3b9sWP/30k63funVrqrbwbeXKlebHH380vXr1isq6detmBg0aZL777ruEc3399dfmpZdesvu88sor5quvvorqaJ/Ro0fb9sGo96/7hx9+MD179ozOwXPkHB988EHCM/GhjYYPH26P165dO9O9e3fz559/hrsl8Ouvv9r9mzZtaoYMGWL279+fUL98+fLo/H/88UdC3Ycffmjuuece06ZNG3u9adG+fXuzbt26sDiB7du3m8GDB9vjvPHGG6na3Rl9iP7OZ55ByEcffWSeffZZ299of7dvnH3++ef2efv958UXX7Tt/OWXX4aHjli8eHG0f9u2bc3cuXPDXTIMv4tx48aFxVaUh+3y5ptvmvfff9+2nYM+xr27fejr9An6vQ/t5PahHWl3jufKOBf93Ifz0DY7d+5MKBdCiCNFpokpBkJE1L59++wfu0ceecRUrlw5qn/hhRfsidasWeN96x+aNGliZsyYYT8ziJYrV87UqVPHDjAM2AiaggULWrEBDCKNGzc233zzjVm9erUpXLiw6dixo/08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"; // Replace with your actual base64 encoded image data
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
    
            .c12 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
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
                width: 450pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }
    
            .c24 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
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
                width: 449.2pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }
    
            .c14 {
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
    
            .c25 {
                -webkit-text-decoration-skip: none;
                color: #000000;
                font-weight: 400;
                text-decoration: underline;
                vertical-align: baseline;
                text-decoration-skip-ink: none;
                font-size: 11pt;
                font-family: "Arial MT";
                font-style: normal
            }
    
            .c11 {
                color: #000000;
                font-weight: 400;
                text-decoration: none;
                vertical-align: baseline;
                font-size: 10pt;
                font-family: "Arial MT";
                font-style: normal
            }
    
            .c8 {
                color: #000000;
                font-weight: 700;
                text-decoration: none;
                vertical-align: baseline;
                font-size: 11pt;
                font-family: "Arial";
                font-style: normal
            }
    
            .c19 {
                color: #000000;
                font-weight: 400;
                text-decoration: none;
                vertical-align: baseline;
                font-size: 4.5pt;
                font-family: "Arial MT";
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
    
            .c7 {
                margin-left: 7.1pt;
                padding-top: 0.1pt;
                padding-bottom: 0pt;
                line-height: 1.1500000000000001;
                text-align: left;
                margin-right: 4.7pt
            }
    
            .c17 {
                margin-left: 6.8pt;
                padding-top: 0.1pt;
                padding-bottom: 0pt;
                line-height: 1.1500000000000001;
                text-align: left;
                margin-right: 4.7pt
            }
    
            .c27 {
                padding-top: 6.3pt;
                text-indent: 162.8pt;
                padding-bottom: 0pt;
                line-height: 1.5;
                text-align: justify;
                margin-right: 5.6pt
            }
    
            .c9 {
                padding-top: 0.1pt;
                padding-bottom: 0pt;
                line-height: 1.1500000000000001;
                text-align: left;
                margin-right: 4.7pt;
                height: 11pt
            }
    
            .c23 {
                padding-top: 5.5pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left;
                height: 11pt
            }
    
            .c29 {
                padding-top: 1.9pt;
                padding-bottom: 0pt;
                line-height: 1.5;
                text-align: left;
                margin-right: 275.2pt
            }
    
            .c10 {
                padding-top: 5.5pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: right;
                margin-right: 103.1pt
            }
    
            .c6 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left;
                margin-right: -7pt
            }
    
            .c21 {
                padding-top: 0.6pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left;
                height: 11pt
            }
    
            .c28 {
                padding-top: 0.1pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left;
                height: 11pt
            }
    
            .c4 {
                margin-left: 4.5pt;
                padding-top: 5.7pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left
            }
    
            .c0 {
                margin-left: 4.5pt;
                padding-top: 5.5pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left
            }
    
            .c15 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 0.06;
                text-align: left
            }
    
            .c22 {
                margin-left: 6.5pt;
                border-spacing: 0;
                border-collapse: collapse;
                margin-right: auto
            }
    
            .c1 {
                margin-left: 5pt;
                border-spacing: 0;
                border-collapse: collapse;
                margin-right: auto
            }
    
            .c18 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left
            }
    
            .c16 {
                background-color: #ffffff;
                max-width: 452pt;
                padding: 72pt 72pt 72pt 72pt
            }
    
            .c26 {
                text-decoration-skip-ink: none;
                -webkit-text-decoration-skip: none;
                text-decoration: underline
            }
    
            .c5 {
                height: 0pt
            }
    
            .c20 {
                margin-right: -0.8pt
            }
    
            .c13 {
                margin-left: 5pt
            }
    
            .c3 {
                height: 24.5pt
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
    
    <body class="c16 doc-content">
        <div>
            <p class="c15"><span
                    style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 602.00px; height: 72.00px;"><img
                        alt="" src="data:image/png;base64,${base64Image2}"
                        style="width: 602.00px; height: 72.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                        title=""></span></p>
        </div>
        <p class="c10"><span class="c2">C&oacute;rdoba,</span></p>
        <p class="c13 c29 title"><span class="c8">Sr. Ministro de Desarrollo Social Dr. Juan Carlos Massei</span></p>
        <p class="c18 c13 title"><span
                class="c26">S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D</span>
        </p>
        <p class="c13 c27"><span class="c2">Habiendo tomado conocimiento de lo solicitado por la entidad </span><span
                class="c8">${entity}</span><span class="c2">, CUIT , esta Direcci&oacute;n de
                Jurisdicci&oacute;n Coordinaci&oacute;n Salas Cuna del Ministerio de Desarrollo Social CERTIFICA que la sala
                ${cribroomName} </span><span class="c8">C&oacute;digo ${cribroomCode}</span><span class="c2">, sita en ${cribroomStreet} ${cribroomHouseNumber}
                de la Localidad de ${cribroomLocality}, Departamento ${cribroomDepartment}, de la Provincia de C&Oacute;RDOBA, se
                encuentra adherida al Programa Salas Cuna. Atento a ello, en el marco de lo dispuesto por la normativa
                vigente del Programa, se otorga el Visto Bueno a la solicitud, sugiriendo el Se&ntilde;or Secretario de
                Gesti&oacute;n Administrativa - en funci&oacute;n del destino de los fondos y salvo mejor criterio - el
                otorgamiento de un aporte econ&oacute;mico pagadero de forma mensual en concepto de ayuda directa no
                reintegrable por la suma total de </span><span class="c8">${totalSumStr} (
                $${totalSumFloat} ) </span><span class="c2">para el per&iacute;odo comprendido entre los meses de ${totalSumInitMonth} del ${totalSumInitYear}
                a ${totalSumEndMonth} del ${totalSumEndYear} seg&uacute;n detalle adjunto, cabe aclarar que los importes mensuales ser&aacute;n de por
                cada ni&ntilde;o asistente a la sala hasta un m&aacute;ximo de ${cribroomMaxCapacityStr} (${cribroomMaxCapacityInt}) ni&ntilde;os y ni&ntilde;as
                liquidables a favor de la instituci&oacute;n solicitante por el plazo anteriormente mencionado, ser&aacute;n
                establecidos en la Resoluci&oacute;n Ministerial N&deg; 0007/2023.</span></p>
        <p class="c13 c18"><span class="c25">DETALLE</span></p>
        <p class="c28"><span class="c19"></span></p><a id="t.6ea88f66dc398c1cd51f2d89dde631a80804542d"></a><a id="t.0"></a>
        <table class="c22">
            <tr class="c3">
                <td class="c14" colspan="1" rowspan="1">
                    <p class="c4"><span class="c2">C&Oacute;DIGO DE SALA</span></p>
                </td>
                <td class="c14" colspan="1" rowspan="1">
                    <p class="c4"><span class="c2">NOMBRE DE SALA</span></p>
                </td>
                <td class="c14" colspan="1" rowspan="1">
                    <p class="c4"><span class="c2">CANTIDAD DE NI&Ntilde;OS</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c14" colspan="1" rowspan="1">
                    <p class="c0"><span class="c2">${cribroomCode}</span></p>
                </td>
                <td class="c14" colspan="1" rowspan="1">
                    <p class="c0"><span class="c2">${cribroomName}</span></p>
                </td>
                <td class="c14" colspan="1" rowspan="1">
                    <p class="c0"><span class="c2">${cribroomMaxCapacityInt}</span></p>
                </td>
            </tr>
        </table>
        <p class="c9 c13"><span class="c2"></span></p><a id="t.91a0a19b464d3cd185af5b69ea358733aae9d02b"></a><a
            id="t.1"></a>
        <table class="c1">
            <tr class="c5">
                <td class="c12" colspan="1" rowspan="1">
                    <p class="c6"><span class="c2">SUBTOTAL PER&Iacute;ODO ${totalSumInitYear} (${totalSumInitMonth}-${firstSubTotalSumEndMonth})</span></p>
                </td>
            </tr>
            <tr class="c5">
                <td class="c12" colspan="1" rowspan="1">
                    <p class="c18"><span class="c2">$${firstSubTotalSumFloat}</span></p>
                </td>
            </tr>
        </table>
        <p class="c9"><span class="c2"></span></p><a id="t.692a5167b25ef1b580ed5794131d5251ced6d2ae"></a><a id="t.2"></a>
        <table class="c1">
            <tr class="c5">
                <td class="c12" colspan="1" rowspan="1">
                    <p class="c18 c20"><span class="c2">SUBTOTAL PER&Iacute;ODO  ${totalSumEndYear} (${SecSubTotalSumInitMonth}-${totalSumEndMonth})</span></p>
                </td>
            </tr>
            <tr class="c5">
                <td class="c12" colspan="1" rowspan="1">
                    <p class="c18"><span class="c2">$${SecSubTotalSumFloat}</span></p>
                </td>
            </tr>
        </table>
        <p class="c9"><span class="c2"></span></p><a id="t.235f7251ebcb23147da69e539a7ae814d2ba9224"></a><a id="t.3"></a>
        <table class="c1">
            <tr class="c5">
                <td class="c24" colspan="1" rowspan="1">
                    <p class="c18"><span class="c2">IMPORTE TOTAL</span></p>
                </td>
            </tr>
            <tr class="c5">
                <td class="c24" colspan="1" rowspan="1">
                    <p class="c18"><span class="c2">$${totalSumFloat}</span></p>
                </td>
            </tr>
        </table>
        <p class="c21"><span class="c11"></span></p>
        <p class="c7"><span class="c2">Hecho, REM&Iacute;TANSE a la </span><span>Subsecretar&iacute;a</span><span
                class="c2">&nbsp;de Administraci&oacute;n y Recursos Humanos a los fines de su intervenci&oacute;n.</span>
        </p>
        <p class="c17"><span class="c2">Sin otro particular, lo saludo atentamente</span></p>
        <p class="c9"><span class="c2"></span></p>
        <p class="c23"><span class="c2"></span></p>
        <div>
            <p class="c15"><span
                    style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 274.78px; height: 28.60px;"><img
                        alt="" src="data:image/png;base64,${base64Image1}"
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

// Export the downloadPDF function
export default downloadPDF;
