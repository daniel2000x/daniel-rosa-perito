import { useState } from 'react'
import './DashboardPericia.css'

const tiposAnalise = {
  documentos: {
    titulo: 'Documentos e Arquivos',
    descricao:
      'Análise técnica de arquivos e documentos digitais para identificação de propriedades, alterações e elementos relevantes.',
    icone: '01',
    itens: [
      'Metadados e propriedades do arquivo',
      'Datas de criação e modificação',
      'Integridade e hash do arquivo',
      'Versões e possíveis alterações',
      'Autenticidade documental',
    ],
  },

  whatsapp: {
    titulo: 'Mensagens e Comunicações',
    descricao:
      'Exame técnico de conversas, mensagens e demais elementos digitais apresentados como prova.',
    icone: '02',
    itens: [
      'Análise cronológica das mensagens',
      'Arquivos e mídias relacionados',
      'Consistência das informações',
      'Elementos técnicos disponíveis',
      'Preservação da evidência digital',
    ],
  },

  sistemas: {
    titulo: 'Sistemas e Logs',
    descricao:
      'Avaliação de registros produzidos por sistemas, aplicações e infraestruturas computacionais.',
    icone: '03',
    itens: [
      'Logs de acesso',
      'Registros de autenticação',
      'Histórico de operações',
      'Endereços IP',
      'Eventos e registros do sistema',
    ],
  },

  email: {
    titulo: 'E-mails',
    descricao:
      'Análise técnica de mensagens eletrônicas e das informações associadas ao seu envio e recebimento.',
    icone: '04',
    itens: [
      'Cabeçalhos da mensagem',
      'Remetente e destinatário',
      'Servidores envolvidos',
      'Datas e registros técnicos',
      'Anexos e elementos relacionados',
    ],
  },

  computador: {
    titulo: 'Computadores e Dispositivos',
    descricao:
      'Análise de vestígios e informações digitais existentes em equipamentos relacionados ao objeto da perícia.',
    icone: '05',
    itens: [
      'Arquivos e diretórios',
      'Registros do sistema',
      'Histórico de utilização',
      'Vestígios digitais',
      'Informações técnicas do dispositivo',
    ],
  },

  blockchain: {
    titulo: 'Blockchain',
    descricao:
      'Análise de registros distribuídos, transações e outros vestígios técnicos relacionados a ativos digitais.',
    icone: '06',
    itens: [
      'Hashes de transações',
      'Endereços digitais',
      'Histórico de movimentações',
      'Registros em blockchain',
      'Rastreabilidade técnica',
    ],
  },
}

function DashboardPericia() {
  const [tipoSelecionado, setTipoSelecionado] =
    useState('documentos')

  const analise = tiposAnalise[tipoSelecionado]

  return (
    <section
      className="dashboard-pericia"
      id="painel-pericial"
    >
      <div className="container">

        <div className="dashboard-heading">
          <span className="section-label">
            PAINEL DA PERÍCIA DIGITAL
          </span>

          <h2>
            Explore uma
            <span> análise pericial.</span>
          </h2>

          <p>
            Selecione um tipo de evidência digital para
            visualizar alguns dos elementos que podem ser
            examinados durante uma perícia em Tecnologia
            da Informação.
          </p>
        </div>

        <div className="dashboard-layout">

          <div className="dashboard-menu">

            <span className="dashboard-menu-label">
              SELECIONE A EVIDÊNCIA
            </span>

            {Object.entries(tiposAnalise).map(
              ([chave, item]) => (
                <button
                  key={chave}
                  type="button"
                  className={`dashboard-option ${
                    tipoSelecionado === chave
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setTipoSelecionado(chave)
                  }
                >
                  <span className="dashboard-option-number">
                    {item.icone}
                  </span>

                  <span>{item.titulo}</span>
                </button>
              )
            )}

          </div>

          <div className="dashboard-panel">

                <div
  key={tipoSelecionado}
  className="dashboard-panel-content"
></div>
            <div className="dashboard-panel-top">

              <div>
                <span className="dashboard-status">
                  ● ANÁLISE SELECIONADA
                </span>

                <h3>{analise.titulo}</h3>

                <p>{analise.descricao}</p>
              </div>

              <div className="dashboard-code">
                {analise.icone}
              </div>

            </div>

            <div className="dashboard-divider" />

            <span className="dashboard-analysis-title">
              ELEMENTOS QUE PODEM SER ANALISADOS
            </span>

            <div className="dashboard-analysis-grid">

              {analise.itens.map((item, index) => (
                <div
                  className="dashboard-analysis-item"
                  key={item}
                >
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <p>{item}</p>
                </div>
              ))}

            </div>

            <div className="dashboard-process">

              <span className="dashboard-analysis-title">
                FLUXO DA ANÁLISE PERICIAL
              </span>

              <div className="dashboard-steps">

                <div>
                  <strong>01</strong>
                  <span>Preservação</span>
                </div>

                <span className="step-line" />

                <div>
                  <strong>02</strong>
                  <span>Coleta</span>
                </div>

                <span className="step-line" />

                <div>
                  <strong>03</strong>
                  <span>Análise</span>
                </div>

                <span className="step-line" />

                <div>
                  <strong>04</strong>
                  <span>Laudo</span>
                </div>

              </div>

            </div>

            <div className="dashboard-footer">

              <p>
                Cada perícia possui características próprias.
                Os exames dependem do objeto pericial e dos
                elementos disponíveis no processo.
              </p>

              <a
                href="#contato"
                className="dashboard-contact-button"
              >
                Falar com um perito
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default DashboardPericia