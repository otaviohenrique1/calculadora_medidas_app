import { ListGroup, ListGroupItem } from "reactstrap";

interface ListaModalExibirDataTypes {
  label: string;
  valor: string;
}

interface ListaModalExibirProps {
  data: ListaModalExibirDataTypes[];
}

export function ListaModalExibir(props: ListaModalExibirProps) {
  return (
    <ListGroup>
      {props.data.map((item, index) => {
        return (
          <ListGroupItem className="d-flex justify-content-between align-content-center flex-row" key={index}>
            <span className="fw-bold">{item.label}</span>
            <span>{item.valor}</span>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}