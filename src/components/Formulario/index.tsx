import { Form, Formik, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { FormTypes } from "../../types/types";
import { CampoFormulario } from "../Campo";
import * as Yup from "yup";

const schemaValidacao = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  campoA: Yup.string().required("Campo vazio"),
  campoB: Yup.string().required("Campo vazio"),
  campoC: Yup.string().required("Campo vazio"),
});

const valoresIniciais: FormTypes = {
  nome: "",
  campo_a: "",
  campo_b: "",
  campo_c: ""
};

interface FormularioProps {
  onSubmit: (values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) => void;
  onReset: () => void;
  abreAjuda: () => void;
}

export function Formulario(props: FormularioProps) {
  return (
    <Formik
      initialValues={valoresIniciais}
      onSubmit={props.onSubmit}
      validationSchema={schemaValidacao}
    >
      {({ touched, errors, values }) => (
        <Form>
          <Row>
            <CampoFormulario type="text" name="nome" id="nome" value={values.nome}
              placeholder="Nome" errors={errors.nome} touched={touched.nome} />
            <CampoFormulario type="number" name="campoA" id="campoA" value={values.campo_a}
              placeholder="Campo A" errors={errors.campo_a} touched={touched.campo_a} />
            <CampoFormulario type="number" name="campoB" id="campoB" value={values.campo_b}
              placeholder="Campo B" errors={errors.campo_b} touched={touched.campo_b} />
            <CampoFormulario type="number" name="campoC" id="campoC" value={values.campo_c}
              placeholder="Campo C" errors={errors.campo_c} touched={touched.campo_c} />
            <Col md={12} className="d-flex justify-content-end">
              <ButtonGroup>
                <Button type="submit" color="primary">Calcular</Button>
                <Button type="reset" color="danger" onClick={props.onReset}>Limpar</Button>
                <Button type="button" color="success" onClick={props.abreAjuda}>Ajuda</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}
