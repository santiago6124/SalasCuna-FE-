import { GridToolbarExportContainer } from '@mui/x-data-grid';
import { ExportMenuItem } from './ExportMenuItem';
import * as React from 'react';

export function ExportButton(props) {

  const { selectedPayOut, authTokens } = props;

  return (
    <GridToolbarExportContainer {...props}>
      <ExportMenuItem
      selectedPayOut={selectedPayOut}
      authTokens={authTokens}
      />
    </GridToolbarExportContainer>
  );
}
