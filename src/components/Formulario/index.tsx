import { Form, Formik, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { FormTypes, valoresIniciais } from "../../types/types";
import { CampoFormulario } from "../Campo";
import * as Yup from "yup";

const schemaValidacao = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  campoA: Yup.string().required("Campo vazio"),
  campoB: Yup.string().required("Campo vazio"),
  campoC: Yup.string().required("Campo vazio"),
});

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
            <CampoFormulario type="number" name="campoA" id="campoA" value={values.campoA}
              placeholder="Campo A" errors={errors.campoA} touched={touched.campoA} />
            <CampoFormulario type="number" name="campoB" id="campoB" value={values.campoB}
              placeholder="Campo B" errors={errors.campoB} touched={touched.campoB} />
            <CampoFormulario type="number" name="campoC" id="campoC" value={values.campoC}
              placeholder="Campo C" errors={errors.campoC} touched={touched.campoC} />
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

/*
import { Formik, Form, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import * as Yup from "yup";
import { Campo } from "../Campo";
import { FormTypes, valoresIniciais } from "../../types/types";

interface FormularioProps {
  onSubmit: ((values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) => void | Promise<any>) & ((values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) => void);
}

const schemaValidacao = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  campoA: Yup.string().required("Campo vazio"),
  campoB: Yup.string().required("Campo vazio"),
  campoC: Yup.string().required("Campo vazio"),
});

export function Formulario(props: FormularioProps) {
  return (
    <Col md={12} className="border-bottom border-top pb-3 pt-3">
      <Formik
        initialValues={valoresIniciais}
        onSubmit={props.onSubmit}
        validationSchema={schemaValidacao}
      >
        {({ touched, errors, values }) => (
          <Form>
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
                  <Button type="reset" color="danger">Limpar</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  );
}
*/