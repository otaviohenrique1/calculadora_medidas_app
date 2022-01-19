import { FaSortDown, FaSortUp } from "react-icons/fa";
import { HeaderGroup, Row, TableBodyPropGetter, TableBodyProps, TablePropGetter, TableProps } from "react-table";
import { Table } from "reactstrap";
import { DataTypes } from "../../types/types";

interface TabelaMedidasProps extends ItemVazioProps {
  getTableProps: (propGetter?: TablePropGetter<DataTypes> | undefined) => TableProps;
  headerGroups: HeaderGroup<DataTypes>[];
  getTableBodyProps: (propGetter?: TableBodyPropGetter<DataTypes> | undefined) => TableBodyProps;
  page: Row<DataTypes>[];
  pageSize: number;
  prepareRow: (row: Row<DataTypes>) => void;
}

export function TabelaMedidas(props: TabelaMedidasProps) {
  return (
    <Table {...props.getTableProps()} striped>
      <thead>
        {props.headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>{column.isSorted ? column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...props.getTableBodyProps()}>
        {(props.page.length === 0) ? (
          <ItemVazio colSpan={props.colSpan} />
        ) : (
          props.page.slice(0, props.pageSize).map((row, i) => {
            props.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })
        )}
      </tbody>
    </Table>
  );
}

interface ItemVazioProps {
  colSpan: number;
}

function ItemVazio(props: ItemVazioProps) {
  return (
    <tr className="bg-light">
      <td colSpan={props.colSpan} className="text-center h1 p-5 fw-bold">Lista Vazia</td>
    </tr>
  );
}
