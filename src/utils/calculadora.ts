export function formata_calculo(lista_valores: any[]) {
  return lista_valores.join(' -> ');
}

interface FormatadorFinalTypes {
  nome: string;
  campo_b: number;
  resultado: number;
}

export function formatador_final({ nome, campo_b, resultado }: FormatadorFinalTypes) {
  let lista_valores = [];
  lista_valores[0] = nome;
  lista_valores[1] = campo_b.toString();
  lista_valores[2] = resultado.toFixed(2);
  lista_valores[3] = Math.round(resultado).toFixed(2);
  return formata_calculo(lista_valores);
}

interface CalculaMedidaTypes {
  campo_a: number;
  campo_b: number;
  campo_c: number;
}

export function calcula_medida({ campo_a, campo_b, campo_c }: CalculaMedidaTypes) {
  // a-c
  // b-x
  // x = (c*b)/a
  let resultado = ((campo_c * campo_b) / campo_a);
  return resultado;
}

export function perimetro_circulo(valor: number) {
  return (2 * Math.PI * valor);
}

interface TeoremaDePitagorasTypes {
  hipotenusa: number;
  catetoA: number;
  catetoB: number;
}

export function teorema_de_pitagoras({ hipotenusa, catetoA, catetoB }: TeoremaDePitagorasTypes) {
  let texto = '';
  let resultado = 0;
  let titulo = '';
  if (hipotenusa === 0) {
    titulo = 'Hipotenusa';
    resultado = Math.sqrt((Math.pow(catetoA, 2) + Math.pow(catetoB, 2)));
    texto = formata_calculo([titulo, resultado]);
  } else if (catetoA === 0) {
    titulo = 'Cateto A';
    resultado = Math.sqrt((Math.pow(hipotenusa, 2) - Math.pow(catetoB, 2)))
    texto = formata_calculo([titulo, resultado]);
  } else if (catetoB === 0) {
    titulo = 'Cateto B';
    resultado = Math.sqrt((Math.pow(hipotenusa, 2) - Math.pow(catetoA, 2)))
    texto = formata_calculo([titulo, resultado]);
  }
  return texto;
}

/*
  --Exemplo--
  Nome => Tiger
  Campo A => 119
  Campo B => 1
  Campo C => 200
  Resultado => Tiger -> 1 -> 1.68 -> 2
  163 - b
  200 - x
  x = (200*b)/163
  a - b
  c - x
  x = (c*b)/a
*/