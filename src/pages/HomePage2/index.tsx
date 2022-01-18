import { Formik, Form as FormFormik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Pagination, PaginationItem, PaginationLink, Row, Table, UncontrolledButtonDropdown } from "reactstrap";
import { FormTypes, valoresIniciais } from "../../types/types";
import { calcula_medida, formatador_final } from "../../utils/calculadora";
import styled from "styled-components";
import { BsFillGearFill } from "react-icons/bs";
import { Campo } from "../../components/Campo";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const SwalModal = withReactContent(Swal);

export interface DataTypes {
  id: string,
  nome: string;
  campo_a: string;
  campo_b: string;
  campo_c: string;
  resultado: string;
  expressao: string;
}

const schemaValidacao = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  campoA: Yup.string().required("Campo vazio"),
  campoB: Yup.string().required("Campo vazio"),
  campoC: Yup.string().required("Campo vazio"),
});

export function HomePage2() {
  const [dataResultadoExpressao, setResultadoExpressao] = useState<string>('');
  const [dataLista, setDataLista] = useState<DataTypes[]>([]);

  function onSubmit(values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) {
    // { nome: 'Tiger', campo_a: 119, campo_b: 200, campo_c: 1, resultado: 2, expressao: 'Tiger -> 1 -> 1.68 -> 2' }
    let nome = values.nome;
    let resultado = calcula_medida({
      campo_a: parseFloat(values.campoA),
      campo_b: parseFloat(values.campoB),
      campo_c: parseFloat(values.campoC)
    });
    let expressao = formatador_final({ nome, campo_b: parseFloat(values.campoB), resultado });
    setResultadoExpressao(expressao);
    setDataLista([...dataLista, {
      id: `${Math.floor(Math.random() * 10000000)}`,
      nome,
      campo_a: values.campoA,
      campo_b: values.campoB,
      campo_c: values.campoC,
      resultado: resultado.toFixed(2),
      expressao
    }]);
    formikHelpers.setValues({ nome, campoA: values.campoA, campoB: '', campoC: values.campoC });
  }

  function onReset() {
    setResultadoExpressao('');
  }

  return (
    <Container className="mb-5 mt-5">
      <Row>
        <Col md={12}>
          <h1 className="w-100 text-center">Calculadora de Medidas</h1>
        </Col>
        <Col md={12} className="border-bottom border-top pb-3 pt-3">
          <Formik
            initialValues={valoresIniciais}
            onSubmit={onSubmit}
            validationSchema={schemaValidacao}
          >
            {({ touched, errors, values }) => (
              <FormFormik>
                <Row>
                  <Campo type="text" name="nome" id="nome" value={values.nome}
                    placeholder="Nome" errors={errors.nome} touched={touched.nome} />
                  <Campo type="number" name="campoA" id="campoA" value={values.campoA}
                    placeholder="Campo A" errors={errors.campoA} touched={touched.campoA} />
                  <Campo type="number" name="campoB" id="campoB" value={values.campoB}
                    placeholder="Campo B" errors={errors.campoB} touched={touched.campoB} />
                  <Campo type="number" name="campoC" id="campoC" value={values.campoC}
                    placeholder="Campo C" errors={errors.campoC} touched={touched.campoC} />
                  <Col md={12} className="d-flex justify-content-end">
                    <ButtonGroup>
                      <Button type="submit" color="primary">Calcular</Button>
                      <Button type="reset" color="danger" onClick={onReset}>Limpar</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </FormFormik>
            )}
          </Formik>
        </Col>
        <Col md={12} className="mb-3 d-flex flex-column border-bottom pb-3 pt-3">
          <h5 className="fw-bold">Resultado:</h5>
          <h5>{dataResultadoExpressao}</h5>
        </Col>
        <Col md={12}>
          <Tabela dataLista={dataLista} />
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

interface TabelaProps {
  dataLista: DataTypes[];
}

function Tabela(props: TabelaProps) {
  const [data, setData] = useState<DataTypes[]>([]);

  useEffect(() => {
    setData(props.dataLista);
  }, [props.dataLista]);

  return <Table striped>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Campo A</th>
        <th>Campo B</th>
        <th>Campo C</th>
        <th>Resultado</th>
        <th>#</th>
        {/* <th><span>{column.isSorted ? column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : ''}</span></th> */}
      </tr>
    </thead>
    <tbody>
      {(data.length === 0) ? (
        <tr className="bg-light">
          <td colSpan={6} className="text-center h1 p-5 fw-bold">Lista Vazia</td>
        </tr>
      ) : (
        data
          // .slice(0, 10)
          .map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>{item.campo_a}</td>
                <td>{item.campo_b}</td>
                <td>{item.campo_c}</td>
                <td>{item.resultado}</td>
                <td><UncontrolledButtonDropdownEstilizado>
                  <DropdownToggle caret className="caret-off d-flex justify-content-center align-items-center w-50 btn-success">
                    <BsFillGearFill size={20} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => modalExibir(item)} >Exibir</DropdownItem>
                    <DropdownItem onClick={() => modalExpressao(item)} >Expressão</DropdownItem>
                    <DropdownItem onClick={() => modalExcluir(item)} >Excluir</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdownEstilizado></td>
              </tr>
            );
          })
      )}
    </tbody>
  </Table>;

  async function modalExibir(item: DataTypes) {
    await SwalModal.fire({
      title: <h3>Exibir</h3>,
      confirmButtonText: 'Fechar',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      html: <div>
        <ul>
          <li>Nome: {item.nome}</li>
          <li>Campo A: {item.campo_a}</li>
          <li>Campo B: {item.campo_b}</li>
          <li>Campo C: {item.campo_c}</li>
          <li>Resultado: {item.resultado}</li>
          <li>Expressao: {item.expressao}</li>
        </ul>
      </div>,
    }).then(() => { });
  }

  async function modalExpressao(item: DataTypes){
    await SwalModal.fire({
      title: <h3>Expressão</h3>,
      confirmButtonText: 'Fechar',
      buttonsStyling: false,
      html: <h6>{item.expressao}</h6>,
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    });
  }

  async function modalExcluir(item: DataTypes) {
    await SwalModal.fire({
      title: <h3>Excluir</h3>,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary me-1',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Sim',
      showCancelButton: true,
      cancelButtonText: 'Não',
    }).then(() => {
      let novaLista = data.filter((itemFiltrado) => itemFiltrado.id !== item.id);
      setData(novaLista);
    });
  }
}

interface PaginationComponentProps {
  // 
}

export function PaginationComponent(props: PaginationComponentProps) {
  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink
          first
          href="#"
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          previous
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          3
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          4
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          5
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          next
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          last
        />
      </PaginationItem>
    </Pagination>
  );
}

// const useSortableData = (items, config = null) => {
//   const [sortConfig, setSortConfig] = React.useState(config);
  
//   const sortedItems = React.useMemo(() => {
//     let sortableItems = [...items];
//     if (sortConfig !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [items, sortConfig]);

//   const requestSort = key => {
//     let direction = 'ascending';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   }

//   return { items: sortedItems, requestSort };
// }