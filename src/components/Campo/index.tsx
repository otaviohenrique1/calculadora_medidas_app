import { Field } from "formik";
import { Col } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";

interface CampoProps {
  type: InputType;
  name: string;
  id: string;
  value: any;
  erro: any;
  placeholder: string;
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
      {props.erro}
    </Col>
  );
}