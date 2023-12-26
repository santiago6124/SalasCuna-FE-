import { MenuItem } from '@mui/material';
// // import * as XLSX from 'xlsx';
// import * as XLSX from 'xlsx-js-style';

// import { config } from '../config';
import * as React from 'react';
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

// import { cribroom_request, child_request, phone_request } from "../../../api/salasCuna.api";
 

function getExcelData(apiRef) {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  return data;
}

async function handleExport(apiRef, selectedCribroomId, authTokens) {

  // try {
    
  //   var cribroomResponse = await cribroom_request(authTokens.authTokens, 'get', 0, {}, selectedCribroomId);

  //   console.log('cribroomResponse: ', cribroomResponse);

  //   cribroomResponse = cribroomResponse['data'];

  // } catch (error) {
  //   console.error("An error occurred (cribroom request):", error);
  // }

  // try {
  
  //   var childResponse = await child_request(authTokens.authTokens, 'get', 0, {}, selectedCribroomId, `&cribroom_id=${selectedCribroomId}`);
  //   console.log('childResponse: ', childResponse);

  //   childResponse = childResponse['data'];

  // } catch (error) {
  //   console.error("An error occurred (child request):", error);
  // }

  console.log('selectedCribroomId: ', selectedCribroomId);
  console.log('authTokens: ', authTokens);

  const data = getExcelData(apiRef);

  // const rows = data.map((row) => {
  //   const mRow = {};
  //   for (const key of config.keys) {
  //     mRow[key] = row[key];
  //   }
  //   return mRow;
  // });
  console.log('rows: ', data);

//   const monthNames = [
//     'Enero', 'Febrero', 'Marzo', 'Abril',
//     'Mayo', 'Junio', 'Julio', 'Agosto',
//     'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
//   ];
//   const currentDate = new Date();

//   const [
//     currentMonthNumber,
//     currentMonthName,
//     currentYear,
//     currentDayMonthYear
//   ] = [
//     currentDate.getMonth(),
//     monthNames[currentDate.getMonth()],
//     currentDate.getFullYear(),
//     currentDate.toLocaleDateString('en-GB')
//   ];


//   for (const item of selectedCribroomId) {
    
//     try {
//       var cribroomResponse = await cribroom_request(authTokens.access, 'get', 1, {}, item);
//       console.log('cribroomResponse: ', cribroomResponse);
//     } catch (error) {
//       console.error("An error occurred (cribroom request):", error);
//     }
    
//     try {
//       var childResponse = await child_request(authTokens.access, 'get', 1, {}, undefined, `&cribroom_id=${item}`);
//       console.log('childResponse: ', childResponse);
//     } catch (error) {
//       console.error("An error occurred (child request):", error);
//     }

//     var [
//       cribroomChildrenNoModificationQuantity,
//       cribroomChildrenEnrollmentQuantity,
//       cribroomChildrenDisenrollmentQuantity,
//     ] = [
//       0,
//       0,
//       0,
//     ];

//     const [
//       cribroomCode,
//       cribroomName,
//       cribroomEntity,
//       cribroomLocality,
//       cribroomChildrenActualCapacity,
//       cribroomChildrenMaxCapacity,
//       provinceOfCordoba_statement,
//       padronOfChildren_statement,
//       networkOfCribroom_statement,
//       main_statement,
//     ] = [
//       cribroomResponse.data.code,
//       cribroomResponse.data.name,
//       cribroomResponse.data.entity,
//       `Localidad de ${cribroomResponse.data.locality.locality}`,
//       cribroomResponse.data.actualCapacity,
//       cribroomResponse.data.max_capacity,
//       `Provincia de Cordoba`,
//       `PADRON DE NIÑOS Y NIÑAS`,
//       `RED DE SALAS CUNA - PROVINCIA DE CORDOBA`,
//       `Quien suscribe, como representante legal de la institución de que se trata, manifiesta con carácter de DECLARACIÓN JURADA que la presente nómina corresponde a los niños y niñas que han asistido a la Sala Cuna durante el MES DE ${currentMonthName} de ${currentYear}, solicitando la asignación económica que el programa de que se trata asigna a los mismos  en concepto de ayuda directa, firmando al pie para constancia y fe.-`
//     ];

//     var rowValuesDict = {
//       '9':[
//         'ID',
//         'SALA CUNA',
//         'APELLIDO',
//         'NOMBRE',
//         'IDENTIFICACION',
//         'TIPO IDENTIFICACION',
//         'FECHA DE NACIMIENTO',
//         'EDAD',
//         'SEXO',
//         'CALLE',
//         'NUMERO',
//         'BARRIO',
//         'LOCALIDAD',
//         'TELEFONOS',
//         // 'CARACTERISTICA TELEFONICA',
//         // 'TELEFONO',
//         'APELLIDO TUTOR',
//         'NOMBRE TUTOR',
//         'IDENTIFICACION TUTOR',
//         'TURNO',
//         'ESTADO',
//         'MODIFICACION',
//         'ALTA',
//         'BAJA',
//       ],
//     }

//     var index = 10
//     for (const child of childResponse.data){
//       try {
//         var phoneResponse = await phone_request(authTokens.access, 'get', 0, {}, undefined, `&guardian=${child.guardian.id}`);
//         console.log('phoneResponse: ', phoneResponse);

//         var phonesStr = phoneResponse.data.length > 0 ? "" : "No documentado"
//         for (const phone of phoneResponse.data) {
//           phonesStr += `${phone.phone_name} (${phone.phone_Feature})${phone.phone_number}${phoneResponse.data.length > 1 ? ", " : "" }`;
//         }
//       } catch (error) {
//         console.error("An error occurred (phone request):", error);
//       }

//       rowValuesDict[index] = [
//         child.id,
//         cribroomCode,
//         child.last_name,
//         child.first_name,
//         child.identification,
//         child.ident_type.type,
//         child.birthdate,
//         child.age,
//         child.gender.gender,
//         child.street,
//         child.house_number,
//         child.neighborhood.neighborhood,
//         child.locality.locality,
//         phonesStr,
//         child.guardian.last_name,
//         child.guardian.first_name,
//         child.guardian.identification,
//         child.shift.name,
//         child.is_active === true ? 'Activo' : 'Inactivo',
//         child.modification,
//         child.registration_date,
//         child.disenroll_date,
//       ];
//       index += 1;

//       child.modification === 'Alta' ? cribroomChildrenEnrollmentQuantity++ : child.modification === 'Baja' ?  cribroomChildrenDisenrollmentQuantity++ : cribroomChildrenNoModificationQuantity++;
//     }

//     // Create a new workbook
//     const workbook = XLSX.utils.book_new();
//     // Create a new worksheet
//     const worksheet = XLSX.utils.aoa_to_sheet([]); // An empty worksheet

//     [ worksheet['A1'], worksheet['B1'], worksheet['N1'], 
//     worksheet['A2'], worksheet['O2'],
//     worksheet['A3'], worksheet['B3'], worksheet['O3'], worksheet['P3'],
//     worksheet['A4'], worksheet['B4'], worksheet['I4'], worksheet['O4'], worksheet['P4'],
//     worksheet['A5'], worksheet['I5'], worksheet['O5'], worksheet['P5'],
//     worksheet['A6'], worksheet['O6'], worksheet['P6'],
//     worksheet['A7'], worksheet['O7'], worksheet['P7']] = [
//       {v: 'Sala Cuna:', t: 's'}, {v: cribroomName, t: 's'}, {v: currentDayMonthYear, t: 's'},
//       {v: cribroomName, t: 's'}, {v: `${cribroomCode}-${currentYear}`, t: 's'},
//       {v: 'Mes', t: 's'}, {v: currentMonthNumber, t: 'n'}, {v: 'Capacidad maxima:', t: 's'}, {v: cribroomChildrenMaxCapacity, t: 'n'},
//       {v: 'Año', t: 's'}, {v: currentYear, t: 'n'}, {v: padronOfChildren_statement, t:'s'}, {v: 'CANTIDAD DE NIÑOS', t: 's'}, {v: cribroomChildrenActualCapacity, t: 'n'},
//       {v: provinceOfCordoba_statement, t: 's'}, {v: networkOfCribroom_statement, t: 's'}, {v: 'Sin modificar', t: 's'}, {v: cribroomChildrenNoModificationQuantity, t: 'n'},
//       {v: cribroomLocality, t: 's'}, {v: 'Altas', t: 's'}, {v: cribroomChildrenEnrollmentQuantity, t: 'n'},
//       {v: cribroomEntity, t: 's'}, {v: 'Bajas', t: 's'}, {v: cribroomChildrenDisenrollmentQuantity, t: 'n'}
//     ];

//     // Populate the worksheet with values from rowValuesDict
//     let startRow = 10; // Starting row to add values
//     for (const rowNum in rowValuesDict) {
//       if (rowValuesDict.hasOwnProperty(rowNum)) {
//         const rowData = rowValuesDict[rowNum];
//         XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: `A${startRow}` });
//         startRow++;
//       }
//     }

//     startRow++;
//     // worksheet[`A${startRow}`] = {v: main_statement, t:'s'};
//     // const rowData = rowValuesDict[rowNum];
//     XLSX.utils.sheet_add_aoa(worksheet, [[main_statement]], { origin: `A${startRow}` });
    
//     // Define a style
//     let style = { font: { name: 'Calibri', sz: 10 }, cell: {wch:5},alignment: { wrapText: true } };

//     // Apply styles to all cells
//     for (let cell in worksheet) {
//       if (cell[0] !== '!') worksheet[cell].s = style;
//       // if ((cell[1] + cell[2] ) === '10') {
//       //   worksheet[cell].s.font.bold = true;
//       //   worksheet[cell].s.fill = { fgColor: { rgb: "#e0e0e0"}};
//       // }
//     }

//     // worksheet['I4'].s.alignment.wrapText = false;
//     // worksheet['I5'].s.alignment.wrapText = false;

//     console.log('worksheet: ', worksheet);
//     // Add the worksheet to the workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Padron');
//     XLSX.writeFile(workbook, `${cribroomName} ${cribroomCode} - ${currentDayMonthYear}.xlsx`, { compression: true });
//   }
  
}

export function ExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  const { selectedPayOut, authTokens  } = props;

  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef, selectedPayOut, authTokens);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Descargar Nota de Pago
    </MenuItem>
  );
}
