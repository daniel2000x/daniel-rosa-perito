import { useState } from 'react'
import './ComoFuncionaPericia.css'

const etapas = [
  {
    numero: '01',
    titulo: 'Definição do objeto',
    curto: 'Entender o que precisa ser esclarecido.',
    descricao:
      'O trabalho começa pela compreensão do ponto técnico que precisa ser analisado no processo.',
    itens: [
      'Análise inicial do contexto e dos documentos',
      'Identificação das questões técnicas envolvidas',
      'Delimitação do objeto da perícia',
    ],
  },
  {
    numero: '02',
    titulo: 'Quesitos e planejamento',
    curto: 'Definir os pontos que serão examinados.',
    descricao:
      'Os quesitos e o objeto da perícia orientam o planejamento dos procedimentos técnicos.',
    itens: [
      'Análise dos quesitos apresentados',
      'Definição das verificações necessárias',
      'Planejamento da metodologia de trabalho',
    ],
  },
  {
    numero: '03',
    titulo: 'Evidências digitais',
    curto: 'Identificar e organizar os elementos técnicos.',
    descricao:
      'Arquivos, documentos, registros, sistemas e outros elementos digitais são identificados e organizados para análise.',
    itens: [
      'Identificação dos elementos relevantes',
      'Registro de características técnicas',
      'Cuidados com integridade e rastreabilidade',
    ],
  },
  {
    numero: '04',
    titulo: 'Análise técnica',
    curto: 'Realizar os exames necessários.',
    descricao:
      'São realizados os procedimentos técnicos compatíveis com o objeto da perícia e com os elementos disponíveis.',
    itens: [
      'Análise de arquivos e metadados',
      'Exame de logs, sistemas e registros',
      'Correlação entre informações técnicas',
    ],
  },
  {
    numero: '05',
    titulo: 'Interpretação',
    curto: 'Avaliar os resultados encontrados.',
    descricao:
      'Os resultados dos exames são avaliados tecnicamente e relacionados aos pontos que precisam ser esclarecidos.',
    itens: [
      'Avaliação da consistência dos dados',
      'Correlação dos achados técnicos',
      'Separação entre constatações e hipóteses',
    ],
  },
  {
    numero: '06',
    titulo: 'Laudo pericial',
    curto: 'Documentar os resultados e conclusões.',
    descricao:
      'Os procedimentos, resultados e conclusões são organizados em documento técnico claro e fundamentado.',
    itens: [
      'Descrição da metodologia utilizada',
      'Apresentação dos resultados',
      'Resposta técnica aos quesitos',
    ],
  },
  {
    numero: '07',
    titulo: 'Esclarecimentos',
    curto: 'Responder eventuais questionamentos.',
    descricao:
      'Após a apresentação do trabalho, podem existir pedidos de esclarecimentos ou complementações técnicas.',
    itens: [
      'Resposta a questionamentos técnicos',
      'Esclarecimento de pontos do laudo',
      'Complementação quando necessária',
    ],
  },
]

function ComoFuncionaPericia() {
  const [etapaAtiva, setEtapaAtiva] = useState(0)

  const etapa = etapas[etapaAtiva]

  return (
    <section className="processo-pericia" id="como-funciona">
      <div className="container">

        <div className="processo-heading">
          <span className="section-label">
            COMO FUNCIONA UMA PERÍCIA
          </span>

          <h2>
            Da análise inicial aos
            <span> esclarecimentos técnicos.</span>
          </h2>

          <p>
            Explore de forma simplificada algumas etapas que podem
            fazer parte de uma perícia judicial em Tecnologia da Informação.
          </p>
        </div>

        <div className="timeline-wrapper">

          <div className="timeline-line"></div>

          <div className="timeline">
            {etapas.map((item, index) => (
              <button
                type="button"
                key={item.numero}
                className={`timeline-step ${
                  etapaAtiva === index ? 'active' : ''
                }`}
                onClick={() => setEtapaAtiva(index)}
              >
                <span className="timeline-number">
                  {item.numero}
                </span>

                <strong>{item.titulo}</strong>

                <small>{item.curto}</small>
              </button>
            ))}
          </div>

        </div>

        <div className="timeline-result">

          <div className="timeline-result-number">
            {etapa.numero}
          </div>

          <div className="timeline-result-content">

            <span>
              ETAPA {etapa.numero} DE {String(etapas.length).padStart(2, '0')}
            </span>

            <h3>{etapa.titulo}</h3>

            <p>{etapa.descricao}</p>

            <div className="timeline-details">
              <strong>
                O que pode acontecer nesta etapa
              </strong>

              <ul>
                {etapa.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="timeline-progress">
              <div
                style={{
                  width: `${((etapaAtiva + 1) / etapas.length) * 100}%`,
                }}
              ></div>
            </div>

            <p className="timeline-disclaimer">
              O fluxo apresentado é ilustrativo. As etapas podem variar
              conforme o objeto da perícia, as determinações judiciais,
              os quesitos e os elementos técnicos disponíveis.
            </p>

          </div>

        </div>

      </div>
    </section>
  )
}

export default ComoFuncionaPericia
