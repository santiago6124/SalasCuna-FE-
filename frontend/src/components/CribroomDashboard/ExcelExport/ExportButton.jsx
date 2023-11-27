import { GridToolbarExportContainer } from '@mui/x-data-grid';
import { ExportMenuItem } from './ExportMenuItem';
import * as React from 'react';

export function ExportButton(props) {

  const { selectedCribroomId, authTokens } = props;

  return (
    <GridToolbarExportContainer {...props}>
      <ExportMenuItem
      selectedCribroomId={selectedCribroomId}
      authTokens={authTokens}
      />
    </GridToolbarExportContainer>
  );
}
