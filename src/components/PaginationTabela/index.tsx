import { PaginationItem, PaginationLink, Pagination, Form, Label, Input } from "reactstrap";
import styled from "styled-components";

interface PaginationTabelaProps {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
}

export function PaginationTabela(props: PaginationTabelaProps) {
  return (
    <PaginationEstilizado>
      <PaginationItem>
        <PaginationLink first onClick={() => props.gotoPage(0)} disabled={!props.canPreviousPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous onClick={() => props.previousPage()} disabled={!props.canPreviousPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next onClick={() => props.nextPage()} disabled={!props.canNextPage} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last onClick={() => props.gotoPage(props.pageCount - 1)} disabled={!props.canNextPage} />
      </PaginationItem>
    </PaginationEstilizado>
  );
}

const PaginationEstilizado = styled(Pagination)`
  ul.pagination {
    margin-bottom: 0 !important;
  }
`;

interface ExibePaginaInicialFinalTabelaProps {
  pageIndex: number;
  pageOptions: number[];
}

export function ExibePaginaInicialFinalTabela(props: ExibePaginaInicialFinalTabelaProps) {
  return (
    <p className="me-3 mb-0">Pagina {props.pageIndex + 1} de {props.pageOptions.length}</p>
  );
}

interface ExibirQuantidadeItensTabelaProps {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export function ExibirQuantidadeItensTabela(props: ExibirQuantidadeItensTabelaProps) {
  return (
    <Form className="d-flex flex-row align-items-center ms-3" onSubmit={event => event.preventDefault()}>
      <Label for="page_select" className="mb-0 me-3 fw-bold form-label">Exibir</Label>
      <select className="form-select rounded-pill text-center" value={props.pageSize}
        onChange={event => { props.setPageSize(Number(event.target.value)) }}>
        {[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (<option value={pageSize} key={pageSize}>{pageSize}</option>))}
      </select>
    </Form>
  );
}

interface IrParaPaginaTabelaProps {
  pageIndex: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
}

export function IrParaPaginaTabela(props: IrParaPaginaTabelaProps) {
  return (
    <div className="d-flex justify-content-end align-items-center flex-row ms-3">
      <p className="w-100 mb-0 me-2 text-end">Ir para a pagina</p>
      <Input className="rounded-pill text-center" type="number" defaultValue={props.pageIndex + 1}
        onChange={event => {
          const pagina = event.target.value ? Number(event.target.value) - 1 : 0
          props.gotoPage(pagina)
        }}
      />
    </div>
  );
}
