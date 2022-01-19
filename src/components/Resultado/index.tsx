interface ResultadoProps {
  valor: string | number;
}

export function Resultado(props: ResultadoProps) {
  return (
    <div className="d-flex flex-column">
      <h5 className="fw-bold">Resultado:</h5>
      <h5>{props.valor}</h5>
    </div>
  );
}