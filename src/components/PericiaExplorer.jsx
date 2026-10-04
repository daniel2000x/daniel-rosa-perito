import { useState } from 'react'

const tiposPericia = [
  {
    id: 'computador',
    numero: '01',
    titulo: 'Computador ou notebook',
    resumo:
      'Análise de equipamentos, arquivos, registros, programas e outros elementos digitais relacionados ao caso.',
    itens: [
      'Arquivos e documentos armazenados',
      'Metadados e propriedades de arquivos',
      'Registros e vestígios digitais',
      'Sistemas e programas relacionados ao objeto da perícia',
    ],
  },
  {
    id: 'mensagens',
    numero: '02',
    titulo: 'Celular, WhatsApp e mensagens',
    resumo:
      'Análise técnica de comunicações eletrônicas e dos elementos digitais disponíveis no caso concreto.',
    itens: [
      'Mensagens e comunicações eletrônicas',
      'Arquivos, imagens e mídias relacionadas',
      'Informações e registros técnicos disponíveis',
      'Integridade, contexto e consistência da evidência',
    ],
  },
  {
    id: 'documentos',
    numero: '03',
    titulo: 'Documento ou arquivo digital',
    resumo:
      'Exame técnico de documentos eletrônicos, propriedades, datas, versões e outros elementos relevantes.',
    itens: [
      'Metadados do documento',
      'Datas e propriedades técnicas',
      'Integridade do arquivo',
      'Histórico, versões e características digitais',
    ],
  },
  {
    id: 'sistemas',
    numero: '04',
    titulo: 'Site, sistema ou software',
    resumo:
      'Avaliação técnica de aplicações, sistemas informatizados e registros produzidos por software.',
    itens: [
      'Funcionamento de sistemas',
      'Registros gerados pela aplicação',
      'Logs e eventos',
      'Comportamento técnico do ambiente',
    ],
  },
  {
    id: 'dados',
    numero: '05',
    titulo: 'Banco de dados e registros',
    resumo:
      'Análise de informações armazenadas, histórico de operações e consistência dos dados relacionados ao processo.',
    itens: [
      'Registros de banco de dados',
      'Histórico de operações',
      'Alterações e consistência das informações',
      'Correlação entre dados e eventos',
    ],
  },
  {
    id: 'incidente',
    numero: '06',
    titulo: 'Fraude, acesso indevido ou incidente digital',
    resumo:
      'Exame de registros relacionados a acessos, autenticações, eventos de segurança e possíveis incidentes digitais.',
    itens: [
      'Logs de acesso',
      'Endereços IP e autenticações',
      'Eventos de segurança',
      'Vestígios digitais relacionados ao incidente',
    ],
  },
  {
    id: 'assistencia',
    numero: '07',
    titulo: 'Assistência técnica para processo judicial',
    resumo:
      'Suporte técnico especializado para advogados, empresas e partes em processos envolvendo Tecnologia da Informação.',
    itens: [
      'Análise de documentos e evidências',
      'Elaboração de quesitos técnicos',
      'Análise de laudo pericial',
      'Elaboração de parecer técnico',
    ],
  },
  {
    id: 'duvida',
    numero: '08',
    titulo: 'Não sei qual perícia preciso',
    resumo:
      'Nem sempre é simples identificar inicialmente qual tipo de análise técnica pode ser necessária.',
    itens: [
      'Análise inicial da situação apresentada',
      'Identificação dos elementos digitais envolvidos',
      'Avaliação da possível área técnica relacionada',
      'Orientação sobre a análise do caso concreto',
    ],
  },
]

function PericiaExplorer() {
  const [selecionado, setSelecionado] = useState(tiposPericia[0])

  const mensagem = encodeURIComponent(
    `Olá Daniel, visitei seu site e gostaria de conversar sobre: ${selecionado.titulo}.`
  )

  const whatsappUrl = `https://wa.me/5579998657281?text=${mensagem}`

  return (
    <section className="pericia-explorer" id="explorar-pericia">
      <div className="container">
        <div className="pericia-explorer-heading">
          <span className="section-label">
            EXPLORADOR DE PERÍCIA DIGITAL
          </span>

          <h2>
            Qual tipo de perícia
            <span> você precisa?</span>
          </h2>

          <p>
            Selecione a situação que mais se aproxima do seu caso
            para conhecer algumas possibilidades de análise técnica.
          </p>
        </div>

        <div className="pericia-explorer-content">
          <div className="pericia-options">
            {tiposPericia.map((tipo) => (
              <button
                type="button"
                key={tipo.id}
                className={`pericia-option ${
                  selecionado.id === tipo.id ? 'active' : ''
                }`}
                onClick={() => setSelecionado(tipo)}
              >
                <span className="pericia-option-number">
                  {tipo.numero}
                </span>

                <span className="pericia-option-title">
                  {tipo.titulo}
                </span>
              </button>
            ))}
          </div>

          <div className="pericia-result">
            <span className="pericia-result-label">
              ÁREA SELECIONADA
            </span>

            <h3>{selecionado.titulo}</h3>

            <p className="pericia-result-description">
              {selecionado.resumo}
            </p>

            <div className="pericia-analysis">
              <strong>Possíveis análises</strong>

              <ul>
                {selecionado.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pericia-contact-button"
            >
              Falar sobre este caso
            </a>

            <p className="pericia-disclaimer">
              As informações apresentadas são gerais e não substituem
              a análise técnica do caso concreto.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PericiaExplorer
