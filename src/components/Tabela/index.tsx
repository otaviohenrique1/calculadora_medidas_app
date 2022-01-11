import { useMemo, useState } from "react";
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, InputGroup, InputGroupText, Label, Pagination, PaginationItem, PaginationLink, Row, Table, UncontrolledButtonDropdown } from "reactstrap";
import styled from "styled-components";
import { BsFillGearFill } from "react-icons/bs";
import { FaSearch, FaSortDown, FaSortUp } from "react-icons/fa";
import { DataTypes } from "../../types/types";

interface TabelaProps {
  data: DataTypes[];
}

export function Tabela(props: TabelaProps) {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, setGlobalFilter,
    canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage,
    setPageSize, state: { pageIndex, pageSize, globalFilter }, } = useTable({
      columns: useMemo(() => [{
        Header: () => null,
        isVisible: false,
        id: 'medidas',
        hideHeader: false,
        columns: [
          { Header: 'Nome', accessor: 'nome' },
          { Header: 'Campo A', accessor: 'campo_a' },
          { Header: 'Campo B', accessor: 'campo_b' },
          { Header: 'Campo C', accessor: 'campo_c' },
          { Header: 'Resultado', accessor: 'resultado' },
          {
            Header: () => null,
            id: 'menu_item',
            Cell: (cell) => (
              <UncontrolledButtonDropdownEstilizado>
                <DropdownToggle caret className="caret-off d-flex justify-content-center align-items-center w-50 btn-success">
                  <BsFillGearFill size={20} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Exibir</DropdownItem>
                  <DropdownItem>Expressão</DropdownItem>
                  <DropdownItem>Excluir</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdownEstilizado>
            )
          },
        ],
      },], []), data: props.data, initialState: { pageIndex: 0 },
    }, useGlobalFilter, useSortBy, usePagination);

  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <Col md={12}>
      <Row>
        <Col md={6} className="d-flex justify-content-between align-items-center flex-row">
          <Form className="d-flex flex-row align-items-center" onSubmit={event => event.preventDefault()}>
            <InputBuscaArea>
              <InputGroupText className="campo-busca-label">
                <Label for="filter_table" className="mb-0 me-2 fw-bold form-label">Pesquisar</Label>
                <FaSearch />
              </InputGroupText>
              <Input type="text" id="filter_table" value={value || ""} placeholder="Busca" className="campo-busca"
                onChange={event => {
                  setValue(event.target.value);
                  onChange(event.target.value);
                }} />
            </InputBuscaArea>
          </Form>
        </Col>
        <Col md={12}>
          <Table {...getTableProps()} striped>
            <thead>
              {headerGroups.map(headerGroup => (
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
            <tbody {...getTableBodyProps()}>
              {(page.length === 0) ? (
                <tr className="bg-light">
                  <td colSpan={6} className="text-center h1 p-5 fw-bold">Lista Vazia</td>
                </tr>
              ) : (
                page.slice(0, pageSize).map((row, i) => {
                  prepareRow(row);
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
        </Col>
        {(page.length === 0) ? (null) : (
          <Col md={12} className="d-flex justify-content-end align-items-center flex-row mb-5">
            <p className="me-3 mb-0">Pagina {pageIndex + 1} de {pageOptions.length}</p>
            <PaginationEstilizado>
              <PaginationItem>
                <PaginationLink first onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous onClick={() => previousPage()} disabled={!canPreviousPage} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next onClick={() => nextPage()} disabled={!canNextPage} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
              </PaginationItem>
            </PaginationEstilizado>
            <div className="d-flex justify-content-end align-items-center flex-row ms-3">
              <p className="w-100 mb-0 me-2 text-end">Ir para a pagina</p>
              <Input className="rounded-pill text-center" type="number" defaultValue={pageIndex + 1}
                onChange={event => {
                  const pagina = event.target.value ? Number(event.target.value) - 1 : 0
                  gotoPage(pagina)
                }}
              />
            </div>
            <Form className="d-flex flex-row align-items-center ms-3" onSubmit={event => event.preventDefault()}>
              <Label for="page_select" className="mb-0 me-3 fw-bold form-label">Exibir</Label>
              <select className="form-select rounded-pill text-center" value={pageSize}
                onChange={event => { setPageSize(Number(event.target.value)) }}>
                {[10, 20, 30, 40, 50, 100].map((pageSize) => (<option value={pageSize} key={pageSize}>{pageSize}</option>))}
              </select>
            </Form>
          </Col>
        )}
      </Row>
    </Col>
  );
}

const InputBuscaArea = styled(InputGroup)`
  .campo-busca-label {
    border-end-start-radius: 50rem!important;
    border-start-start-radius: 50rem!important;
  }
  
  .campo-busca {
    border-end-end-radius: 50rem!important;
    border-start-end-radius: 50rem!important;
  }
`;

const UncontrolledButtonDropdownEstilizado = styled(UncontrolledButtonDropdown)`
  .caret-off::before {
    display: none;
  }

  .caret-off::after {
      display: none;
  }
  
  width: 100%;
`;

const PaginationEstilizado = styled(Pagination)`
  ul.pagination {
    margin-bottom: 0 !important;
  }
`;