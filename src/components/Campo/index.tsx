import { Field } from "formik";
import { FaSearch } from "react-icons/fa";
import { Col, Form, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import styled from "styled-components";
import { MensagemErro } from "../Mensagem";

interface CampoFormularioProps {
  type: "text" | "number";
  name: string;
  id: string;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  errors: any;
  touched: any;
}

export function CampoFormulario(props: CampoFormularioProps) {
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

interface CampoBuscaTabelaProps {
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function CampoBuscaTabela(props: CampoBuscaTabelaProps) {
  return (
    <Form className="d-flex flex-row align-items-center" onSubmit={event => event.preventDefault()}>
      <InputBuscaArea>
        <InputGroupText className="campo-busca-label">
          <Label for="filter_table" className="mb-0 me-2 fw-bold form-label">Pesquisar</Label>
          <FaSearch />
        </InputGroupText>
        <Input type="text" id="filter_table" value={props.value || ""} placeholder="Busca" className="campo-busca"
          onChange={props.onChange} />
      </InputBuscaArea>
    </Form>
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
