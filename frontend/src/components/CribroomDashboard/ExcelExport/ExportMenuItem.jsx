import { MenuItem } from '@mui/material';
import * as XLSX from 'xlsx';
import { config } from '../config';
import * as React from 'react';
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

import { cribroom_request, child_request, phone_request } from "../../../api/salasCuna.api";
 

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

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const currentDate = new Date();

  const [
    currentMonthNumber,
    currentMonthName,
    currentYear,
    currentDayMonthYear
  ] = [
    currentDate.getMonth(),
    monthNames[currentDate.getMonth()],
    currentDate.getFullYear(),
    currentDate.toLocaleDateString('en-GB')
  ];


  for (const item of selectedCribroomId) {
    
    try {
      var cribroomResponse = await cribroom_request(authTokens.access, 'get', 1, {}, item);
      console.log('cribroomResponse: ', cribroomResponse);
    } catch (error) {
      console.error("An error occurred (cribroom request):", error);
    }
    
    try {
      var childResponse = await child_request(authTokens.access, 'get', 1, {}, undefined, `&cribroom_id=${item}`);
      console.log('childResponse: ', childResponse);
    } catch (error) {
      console.error("An error occurred (child request):", error);
    }

    const [
      cribroomCode,
      cribroomName,
      cribroomEntity,
      cribroomLocality,
      cribroomChildrenActualCapacity,
      cribroomChildrenNoModificationQuantity,
      cribroomChildrenEnrollmentQuantity,
      cribroomChildrenDisenrollmentQuantity,
      cribroomChildrenMaxCapacity,
      provinceOfCordoba_statement,
      padronOfChildren_statement,
      networkOfCribroom_statement,
      main_statement,
    ] = [
      cribroomResponse.data.code,
      cribroomResponse.data.name,
      cribroomResponse.data.entity,
      `Localidad de ${cribroomResponse.data.locality.locality}`,
      cribroomResponse.data.actualCapacity,
      'calcular sin modificar en backend',
      'calcular altas en backend',
      'calcular bajas en backend',
      cribroomResponse.data.max_capacity,
      `Provincia de Cordoba`,
      `PADRON DE NIÑOS Y NIÑAS`,
      `RED DE SALAS CUNA - PROVINCIA DE CORDOBA`,
      `Quien suscribe, como representante legal de la institución de que se trata, manifiesta con carácter de DECLARACIÓN JURADA que la presente nómina corresponde a los niños y niñas que han asistido a la Sala Cuna durante el MES DE ${currentMonthName} de ${currentYear}, solicitando la asignación económica que el programa de que se trata asigna a los mismos  en concepto de ayuda directa, firmando al pie para constancia y fe.-`
    ];

    var rowValuesDict = {
      '1': ['Sala Cuna:', cribroomCode, '', '', '', '', '', '', '', '', '', '', '', currentDayMonthYear],
      '2': [cribroomName, '', '', '', '', '', '', '', '', '', '', '', '', '', `${cribroomCode}-${currentYear}`],
      '3': ['Mes', currentMonthNumber, '', '', '', '', '', '', '', '', '', '', '', '', 'Capacidad maxima:', cribroomChildrenMaxCapacity],
      '4': ['Año', currentYear, '', '', '', '', '', '', '', padronOfChildren_statement, '', '', '', '', 'CANTIDAD DE NIÑOS', cribroomChildrenActualCapacity],
      '5': [provinceOfCordoba_statement, '', '', '', '', '', '', '', networkOfCribroom_statement, '', '', '', '', '', 'Sin modificar', cribroomChildrenNoModificationQuantity ],
      '6': [cribroomLocality, '', '', '', '', '', '', '', '', '', '', '', '', '', 'Altas', cribroomChildrenEnrollmentQuantity ],
      '7': [cribroomEntity, '', '', '', '', '', '', '', '', '', '', '', '', '', 'Bajas', cribroomChildrenDisenrollmentQuantity ],
      '8': [''],
      '9':[
        'ID',
        'SALA CUNA',
        'APELLIDO',
        'NOMBRE',
        'IDENTIFICACION',
        'TIPO IDENTIFICACION',
        'FECHA DE NACIMIENTO',
        'EDAD',
        'SEXO',
        'CALLE',
        'NUMERO',
        'BARRIO',
        'LOCALIDAD',
        'TELEFONOS',
        // 'CARACTERISTICA TELEFONICA',
        // 'TELEFONO',
        'APELLIDO TUTOR',
        'NOMBRE TUTOR',
        'IDENTIFICACION TUTOR',
        'TURNO',
        'ESTADO',
        'MODIFICACION',
      ],
    }

    var index = 10
    for (const child of childResponse.data){
      try {
        var phoneResponse = await phone_request(authTokens.access, 'get', 0, {}, undefined, `&guardian=${child.guardian.id}`);
        console.log('phoneResponse: ', phoneResponse);

        var phonesStr = phoneResponse.data.length > 0 ? "" : "No documentado"
        for (const phone of phoneResponse.data) {
          phonesStr += `${phone.phone_name} (${phone.phone_Feature})${phone.phone_number}${phoneResponse.data.length > 1 ? ", " : "" }`;
        }
      } catch (error) {
        console.error("An error occurred (phone request):", error);
      }

      rowValuesDict[index] = [
        child.id,
        cribroomCode,
        child.last_name,
        child.first_name,
        child.identification,
        child.ident_type.type,
        child.birthdate,
        child.age,
        child.gender.gender,
        child.street,
        child.house_number,
        child.neighborhood.neighborhood,
        child.locality.locality,
        phonesStr,
        child.guardian.last_name,
        child.guardian.first_name,
        child.guardian.identification,
        child.shift.name,
        child.is_active === true ? 'Activo' : 'Inactivo',
        'calcular modificacion en backend',
      ];
      index += 1;
    }

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Create a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([]); // An empty worksheet
    // Populate the worksheet with values from rowValuesDict
    let startRow = 1; // Starting row to add values
    for (const rowNum in rowValuesDict) {
      if (rowValuesDict.hasOwnProperty(rowNum)) {
        const rowData = rowValuesDict[rowNum];
        XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: `A${startRow}` });
        startRow++;
      }
    }
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Padron');
    XLSX.writeFile(workbook, `${cribroomName} ${cribroomCode} - ${currentDayMonthYear}.xlsx`, { compression: true });
  }
  
}

export function ExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const { hideMenu } = props;

  const { selectedCribroomId, authTokens  } = props;

  return (
    <MenuItem
      onClick={() => {
        handleExport(apiRef, selectedCribroomId, authTokens);
        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Descargar Padron
    </MenuItem>
  );
}
