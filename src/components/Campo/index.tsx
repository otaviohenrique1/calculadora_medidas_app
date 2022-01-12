import { Field } from "formik";
import { Col } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
import { MensagemErro } from "../Mensagem";

interface CampoProps {
  type: InputType;
  name: string;
  id: string;
  value: string | number | readonly string[] | undefined;
  // erro: any;
  placeholder: string;
  errors: any;
  touched: any;
}

export function Campo(props: CampoProps) {
  return (
    <Col md={3} className="mb-2 d-flex flex-column">
      <Field
        className="form-control"
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
      />
      {/* {props.erro} */}
      {props.errors && props.touched ? <MensagemErro mensagemErro={`${props.errors}`} /> : null}
    </Col>
  );
}