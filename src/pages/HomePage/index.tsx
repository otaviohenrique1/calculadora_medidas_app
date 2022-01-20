import { FormikHelpers } from "formik";
import { useMemo, useState } from "react";
import { Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from "reactstrap";
import { DataTypes, FormTypes } from "../../types/types";
import { calcula_medida, formatador_final } from "../../utils/calculadora";
import styled from "styled-components";
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { BsFillGearFill } from "react-icons/bs";
import { CampoBuscaTabela } from "../../components/Campo";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Titulo } from "../../components/Titulo";
import { Resultado } from "../../components/Resultado";
import { ExibePaginaInicialFinalTabela, ExibirQuantidadeItensTabela, IrParaPaginaTabela, PaginationTabela } from "../../components/PaginationTabela";
import { ListaModalExibir } from "../../components/ListaModalExibir";
import { TabelaMedidas } from "../../components/Tabela";
import { Formulario } from "../../components/Formulario";
import { ModalAjudaConteudo } from "../../components/ModalAjudaConteudo";
const SwalModal = withReactContent(Swal);

export function HomePage() {
  const [dataResultadoExpressao, setResultadoExpressao] = useState<string>('');
  const [dataLista, setDataLista] = useState<DataTypes[]>([]);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, setGlobalFilter,
    canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage,
    setPageSize, state: { pageIndex, pageSize, globalFilter }, } = useTable({
      columns: useMemo(() => [{
        Header: () => null,
        isVisible: false,
        id: 'medidas',
        hideHeader: false,
        columns: [
          { Header: 'Nome', accessor: 'nome', id: 'nome' },
          { Header: 'Campo A', accessor: 'campo_a', id: 'campo_a' },
          { Header: 'Campo B', accessor: 'campo_b', id: 'campo_b' },
          { Header: 'Campo C', accessor: 'campo_c', id: 'campo_c' },
          { Header: 'Resultado', accessor: 'resultado', id: 'resultado' },
          {
            Header: () => null,
            id: 'menu_item',
            Cell: (cell) => {
              let nome = cell.row.values['nome'];
              let campo_a = parseFloat(cell.row.values['campo_a']);
              let campo_b = parseFloat(cell.row.values['campo_b']);
              let campo_c = parseFloat(cell.row.values['campo_c']);
              let resultado = calcula_medida({ campo_a, campo_b, campo_c });
              let expressao = formatador_final({ nome, campo_b, resultado });

              let listaDataModal = [
                { label: 'Nome:', valor: nome },
                { label: 'Campo A:', valor: campo_a },
                { label: 'Campo B:', valor: campo_b },
                { label: 'Campo C:', valor: campo_c },
                { label: 'Resultado:', valor: resultado },
                { label: 'Expressao:', valor: expressao }
              ];

              return (
                <UncontrolledButtonDropdownEstilizado>
                  <DropdownToggle caret className="caret-off d-flex justify-content-center align-items-center w-50 btn-success">
                    <BsFillGearFill size={20} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => {
                        SwalModal.fire({
                          title: <h3>Exibir</h3>,
                          buttonsStyling: false,
                          confirmButtonText: 'Fechar',
                          customClass: { confirmButton: 'btn btn-primary' },
                          html: <ListaModalExibir data={listaDataModal} />,
                        });
                      }}
                    >Exibir</DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        SwalModal.fire({
                          title: <h3>Expressão</h3>,
                          buttonsStyling: false,
                          confirmButtonText: 'Fechar',
                          customClass: { confirmButton: 'btn btn-primary' },
                          html: <h6>{expressao}</h6>,
                        });
                      }}
                    >Expressão</DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        SwalModal.fire({
                          title: <h3>Excluir</h3>,
                          buttonsStyling: false,
                          confirmButtonText: 'Sim',
                          showCancelButton: true,
                          cancelButtonText: 'Não',
                          customClass: {
                            confirmButton: 'btn btn-primary me-1',
                            cancelButton: 'btn btn-danger',
                          },
                        }).then(() => {
                          let id = cell.row.index;
                          dataLista.splice(id, 1);
                          setDataLista([...dataLista]);
                        });
                      }}
                    >Excluir</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdownEstilizado>
              );
            }
          },
        ],
      },], [dataLista]), data: dataLista, initialState: { pageIndex: 0 },
    }, useGlobalFilter, useSortBy, usePagination);

  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200);

  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    // { nome: 'Tiger', campo_a: 119, campo_b: 200, campo_c: 1, resultado: 2, expressao: 'Tiger -> 1 -> 1.68 -> 2' }
    let nome = values.nome;
    let resultado = calcula_medida({
      campo_a: parseFloat(values.campo_a),
      campo_b: parseFloat(values.campo_b),
      campo_c: parseFloat(values.campo_c)
    });
    let expressao = formatador_final({ nome, campo_b: parseFloat(values.campo_b), resultado });
    setResultadoExpressao(expressao);
    setDataLista([...dataLista, {
      nome,
      campo_a: values.campo_a,
      campo_b: values.campo_b,
      campo_c: values.campo_c,
      resultado: resultado.toFixed(2),
      expressao
    }]);
    formikHelpers.setValues({ nome, campo_a: values.campo_a, campo_b: '', campo_c: values.campo_c });
  }

  function onReset() {
    setResultadoExpressao('');
  }

  function abreAjuda() {
    SwalModal.fire({
      title: <h3>Ajuda</h3>,
      buttonsStyling: false,
      confirmButtonText: 'Fechar',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      html: <ModalAjudaConteudo />,
    })
  }

  return (
    <Container className="mb-5 mt-5">
      <Row>
        <Col md={12}>
          <Titulo
            texto='Calculadora de Medidas'
          />
        </Col>
        <Col md={12} className="border-bottom border-top pb-3 pt-3">
          <Formulario
            onSubmit={onSubmit}
            onReset={onReset}
            abreAjuda={abreAjuda}
          />
        </Col>
        <Col md={12} className="mb-3 border-bottom pb-3 pt-3">
          <Resultado
            valor={dataResultadoExpressao}
          />
        </Col>
        <Col md={12}>
          <Row>
            <Col md={6} className="d-flex justify-content-between align-items-center flex-row">
              <CampoBuscaTabela
                onChange={event => {
                  setValue(event.target.value);
                  onChange(event.target.value);
                }}
                value={value}
              />
            </Col>
            <Col md={12}>
              <TabelaMedidas
                getTableProps={getTableProps}
                headerGroups={headerGroups}
                getTableBodyProps={getTableBodyProps}
                page={page}
                pageSize={pageSize}
                prepareRow={prepareRow}
                colSpan={6}
              />
            </Col>
            {(page.length === 0) ? (null) : (
              <Col md={12} className="d-flex justify-content-end align-items-center flex-row mb-5">
                <ExibePaginaInicialFinalTabela
                  pageIndex={pageIndex}
                  pageOptions={pageOptions}
                />
                <PaginationTabela
                  gotoPage={gotoPage}
                  canPreviousPage={canPreviousPage}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  canNextPage={canNextPage}
                  pageCount={pageCount}
                />
                <IrParaPaginaTabela
                  pageIndex={pageIndex}
                  gotoPage={gotoPage}
                />
                <ExibirQuantidadeItensTabela
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const UncontrolledButtonDropdownEstilizado = styled(UncontrolledButtonDropdown)`
  .caret-off::before {
    display: none;
  }

  .caret-off::after {
      display: none;
  }
  
  width: 100%;
`;
