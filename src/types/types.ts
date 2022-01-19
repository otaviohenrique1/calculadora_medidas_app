export interface FormTypes {
  nome: string;
  campo_a: string;
  campo_b: string;
  campo_c: string;
}

export interface DataTypes extends FormTypes {
  resultado: string;
  expressao: string;
}
