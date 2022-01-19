interface TituloProps {
  texto: string;
}

export function Titulo(props: TituloProps) {
  return <h1 className="w-100 text-center">{props.texto}</h1>;
}