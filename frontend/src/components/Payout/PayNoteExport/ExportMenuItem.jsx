import { MenuItem } from '@mui/material';

import * as React from 'react';
import {
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

import { cribroom_request, payNoteHeaders_request } from "../../../api/salasCuna.api";
import DownloadPayNotePDF from './DownloadPayNotePDF.jsx';


function getRowsData(apiRef) {
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

async function handleExport(apiRef, selectedPayOut, authTokens) {

  const payNoteHeaders_response = await payNoteHeaders_request(authTokens.access);

  console.log('payNoteHeaders_response: ', payNoteHeaders_response);


  console.log('selectedPayOut: ', selectedPayOut);
  console.log('authTokens: ', authTokens);

  // const data = getRowsData(apiRef);

  const month_names = {
    '01': 'ENERO',
    '02': 'FEBRERO',
    '03': 'MARZO',
    '04': 'ABRIL',
    '05': 'MAYO',
    '06': 'JUNIO',
    '07': 'JULIO',
    '08': 'AGOSTO',
    '09': 'SEPTIEMBRE',
    '10': 'OCTUBRE',
    '11': 'NOVIEMBRE',
    '12': 'DICIEMBRE',
  }

  for (const item of selectedPayOut) {
    
    try {
      var cribroomResponse = await cribroom_request(
          authTokens.access,
         'get',
          0,
          {}, undefined,
        `&locality__department__zone__id=${item.zone.id}&paynote=1&month=${item.date.split("-")[1]}&year=${item.date.split("-")[0]}`
      );

      console.log('cribroomResponse: ', cribroomResponse.data);

      DownloadPayNotePDF(cribroomResponse.data, item.date.split("-")[0], month_names[item.date.split("-")[1]], item.zone.name, payNoteHeaders_response.data[0] );

    } catch (error) {
      console.error("An error occurred (cribroom request):", error);
    }

  }
  
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
