import { Alert } from "reactstrap";

interface MensagemErroProps {
  mensagemErro: string;
}

export function MensagemErro(props: MensagemErroProps) {
  return (
    <Alert color="danger" className="mt-1">{props.mensagemErro}</Alert>
  );
}