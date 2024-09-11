export function validadorCpf(cpf:any) {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');

  // Verificar se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
      return false;
  }

  // Verificar se todos os dígitos são iguais (evitar CPFs como 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) {
      return false;
  }

  // Calcular o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

  // Verificar o primeiro dígito verificador
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
  }

  // Calcular o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

  // Verificar o segundo dígito verificador
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return false;
  }

  // Se todas as verificações passaram, o CPF é válido
  return true;
}

export function gerarCodigo(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
