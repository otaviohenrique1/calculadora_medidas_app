import { Formik, Form, FormikHelpers } from "formik";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import * as Yup from "yup";
import { Campo } from "../Campo";
import { MensagemErro } from "../Mensagem";
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
              <Campo
                type="text" name="nome" id="nome" value={values.nome} placeholder="Nome"
                erro={errors.nome && touched.nome ? <MensagemErro mensagemErro={errors.nome} /> : null}
              />
              <Campo
                type="number" name="campoA" id="campoA" value={values.campoA} placeholder="Campo A"
                erro={errors.campoA && touched.campoA ? <MensagemErro mensagemErro={errors.campoA} /> : null}
              />
              <Campo
                type="number" name="campoB" id="campoB" value={values.campoB} placeholder="Campo B"
                erro={errors.campoB && touched.campoB ? <MensagemErro mensagemErro={errors.campoB} /> : null}
              />
              <Campo
                type="number" name="campoC" id="campoC" value={values.campoC} placeholder="Campo C"
                erro={errors.campoC && touched.campoC ? <MensagemErro mensagemErro={errors.campoC} /> : null}
              />
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