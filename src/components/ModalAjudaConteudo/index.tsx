import { Row, Col } from "reactstrap";
import { ColumnProps } from "reactstrap/types/lib/Col";

export function ModalAjudaConteudo() {
  const lista = {
    campo_a: 'Campo A',
    campo_b: 'Campo B',
    campo_c: 'Campo C',
    resultado: 'Resultado',
  };
  
  const expressao = `${lista.resultado} = (${lista.campo_a} x ${lista.campo_b})/${lista.campo_c}`;

  return (
    <Row className="p-0 m-0 overflow-hidden">
      <Col md={12} className="p-0 m-0">
        <Row className="p-0 m-0">
          <Item md={3} texto={lista.campo_a} />
          <Linha md={6} />
          <Item md={3} texto={lista.campo_b} />
        </Row>
      </Col>
      <Col md={12} className="p-0 m-0">
        <Row className="p-0 m-0">
          <Item md={3} texto={lista.campo_c} />
          <Linha md={6} />
          <Item md={3} texto={lista.resultado} />
        </Row>
      </Col>
      <Item md={12} texto={expressao} />
    </Row>
  );
}

interface BaseProps {
  md: ColumnProps;
}

interface ItemProps extends BaseProps {
  texto: string;
}

function Item(props: ItemProps) {
  return (
    <Col md={props.md} className="p-0 m-0 d-flex align-items-center justify-content-center">
      <h6 className="m-0">{props.texto}</h6>
    </Col>
  );
}

function Linha(props: BaseProps) {
  return (
    <Col md={props.md} className="p-0 m-0">
      <hr className="border border-dark w-100" />
    </Col>
  );
}