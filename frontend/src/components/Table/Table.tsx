import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import MuiTable from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
};

export const Table = <Entry extends { id: string }>({ data, columns }: TableProps<Entry>) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={column.title + index} sx={{ fontWeight: 'bold', padding: '10px', textAlign: 'left' }}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, entryIndex) => (
            <TableRow key={entry?.id || entryIndex}>
              {columns.map(({ Cell, field, title }, columnIndex) => (
                <TableCell key={title + columnIndex} sx={{ padding: '10px', textAlign: 'left' }}>
                  {Cell ? <Cell entry={entry} /> : entry[field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};