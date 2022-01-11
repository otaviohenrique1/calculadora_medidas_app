import { FormikHelpers } from "formik";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Formulario } from "../../components/Formulario";
import { DataTypes, FormTypes } from "../../types/types";
import { Tabela } from "../../components/Tabela";
import { calcula_medida, formatador_final } from "../../utils/calculadora";

export function HomePage() {
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
      nome,
      campo_a: values.campoA,
      campo_b: values.campoB,
      campo_c: values.campoC,
      resultado: resultado.toFixed(2),
      expressao }]);
    formikHelpers.setValues({ nome, campoA: values.campoA, campoB: '', campoC: values.campoC });
  }

  return (
    <Container className="mb-5 mt-5">
      <Row>
        <Col md={12}>
          <h1 className="w-100 text-center">Calculadora de Medidas</h1>
        </Col>
        <Formulario onSubmit={onSubmit} />
        <Col md={12} className="mb-3 d-flex flex-column border-bottom pb-3 pt-3">
          <h5 className="fw-bold">Resultado:</h5>
          <h5>{dataResultadoExpressao}</h5>
        </Col>
        <Tabela data={dataLista} />
      </Row>
    </Container>
  );
}
