// Abrangência territorial das 24 regiões da Justiça do Trabalho (TST/CNJ).
// Em SP, a 2ª e a 15ª Região possuem jurisdições municipais diferentes.
export const trts = [
  { numero: 1, estados: ['RJ'], abrangencia: 'Rio de Janeiro', sede: 'Rio de Janeiro' },
  { numero: 2, estados: ['SP'], abrangencia: 'São Paulo — capital, região metropolitana e Baixada Santista', sede: 'São Paulo' },
  { numero: 3, estados: ['MG'], abrangencia: 'Minas Gerais', sede: 'Belo Horizonte' },
  { numero: 4, estados: ['RS'], abrangencia: 'Rio Grande do Sul', sede: 'Porto Alegre' },
  { numero: 5, estados: ['BA'], abrangencia: 'Bahia', sede: 'Salvador' },
  { numero: 6, estados: ['PE'], abrangencia: 'Pernambuco', sede: 'Recife' },
  { numero: 7, estados: ['CE'], abrangencia: 'Ceará', sede: 'Fortaleza' },
  { numero: 8, estados: ['PA', 'AP'], abrangencia: 'Pará e Amapá', sede: 'Belém' },
  { numero: 9, estados: ['PR'], abrangencia: 'Paraná', sede: 'Curitiba' },
  { numero: 10, estados: ['DF', 'TO'], abrangencia: 'Distrito Federal e Tocantins', sede: 'Brasília' },
  { numero: 11, estados: ['AM', 'RR'], abrangencia: 'Amazonas e Roraima', sede: 'Manaus' },
  { numero: 12, estados: ['SC'], abrangencia: 'Santa Catarina', sede: 'Florianópolis' },
  { numero: 13, estados: ['PB'], abrangencia: 'Paraíba', sede: 'João Pessoa' },
  { numero: 14, estados: ['RO', 'AC'], abrangencia: 'Rondônia e Acre', sede: 'Porto Velho' },
  { numero: 15, estados: ['SP'], abrangencia: 'São Paulo — interior e demais municípios sob sua jurisdição', sede: 'Campinas' },
  { numero: 16, estados: ['MA'], abrangencia: 'Maranhão', sede: 'São Luís' },
  { numero: 17, estados: ['ES'], abrangencia: 'Espírito Santo', sede: 'Vitória' },
  { numero: 18, estados: ['GO'], abrangencia: 'Goiás', sede: 'Goiânia' },
  { numero: 19, estados: ['AL'], abrangencia: 'Alagoas', sede: 'Maceió' },
  { numero: 20, estados: ['SE'], abrangencia: 'Sergipe', sede: 'Aracaju' },
  { numero: 21, estados: ['RN'], abrangencia: 'Rio Grande do Norte', sede: 'Natal' },
  { numero: 22, estados: ['PI'], abrangencia: 'Piauí', sede: 'Teresina' },
  { numero: 23, estados: ['MT'], abrangencia: 'Mato Grosso', sede: 'Cuiabá' },
  { numero: 24, estados: ['MS'], abrangencia: 'Mato Grosso do Sul', sede: 'Campo Grande' },
]

// Dados preparados para receber futuras nomeações trabalhistas.
// Exemplo de atualização após uma nomeação no TRT-20:
// 20: [{ cidade: 'Aracaju', vara: '1ª Vara do Trabalho', quantidade: 1 }],
export const nomeacoesTrabalhistas = {}
