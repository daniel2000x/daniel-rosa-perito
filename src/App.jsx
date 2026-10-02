import { useState } from 'react'

import './App.css'
import fotoDaniel from './assets/daniel-rosa.png'
import BrazilMap from './components/BrazilMap'


import {
  estadosSemCadastro,
  periciasAtivas,
} from './data/pericias'
function App() {
  const [estadoSelecionado, setEstadoSelecionado] =
    useState(null)

  const siglaSelecionada =
    estadoSelecionado?.sigla

  const possuiCadastro =
    siglaSelecionada
      ? !estadosSemCadastro.includes(
          siglaSelecionada
        )
      : false

  const dadosPericias =
    siglaSelecionada
      ? periciasAtivas[siglaSelecionada]
      : null

  const cidadesAtivas =
    dadosPericias?.cidades || []

const totalNomeacoes =
  cidadesAtivas.reduce(
    (total, cidade) =>
      total + cidade.quantidade,
    0
  )
  
  return (
    <div className="site">

      {/* CABEÇALHO */}
      <header className="header">
        <div className="container header-content">

          <a href="#inicio" className="logo">
            <div className="logo-icon">DR</div>

            <div className="logo-text">
              <strong>Daniel Rosa</strong>
              <span>Perito Judicial em TI</span>
            </div>
          </a>

          <nav className="menu">
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#atuacao">Atuação</a>
            <a href="#cobertura">Atuação Nacional</a>
            <a href="#contato">Contato</a>
          </nav>

          <a
  href="https://wa.me/5579998657281?text=Olá%20Daniel,%20entrei%20em%20contato%20através%20do%20seu%20site."
  target="_blank"
  rel="noopener noreferrer"
  className="button-secondary"
>
  Entrar em contato
</a>

        </div>
      </header>


      <main>

        {/* PRIMEIRA TELA */}
        <section className="hero" id="inicio">

          <div className="container hero-content">

            <div className="hero-text">

              <span className="hero-label">
                PERÍCIA JUDICIAL • TECNOLOGIA DA INFORMAÇÃO
              </span>

              <h1>
                Perícia técnica com
                <span> precisão, método e objetividade.</span>
              </h1>

              <p>
                Atuação profissional em perícias judiciais relacionadas à
                Tecnologia da Informação, com atendimento em âmbito nacional.
              </p>

              <div className="hero-buttons">

                <a href="#atuacao" className="button-primary">
                  Conhecer minha atuação
                </a>

                <a href="#contato" className="button-secondary">
                  Entrar em contato
                </a>

              </div>


              <div className="hero-info">

                <div>
                  <strong>Atuação Nacional</strong>
                  <span>Ampla cobertura no Brasil</span>
                </div>

                <div>
                  <strong>Tecnologia da Informação</strong>
                  <span>Conhecimento técnico especializado</span>
                </div>

                <div>
                  <strong>Perícia Judicial</strong>
                  <span>Análise técnica e imparcial</span>
                </div>

              </div>

            </div>


           <div className="hero-visual">

  <div className="hero-photo-card">

    <img
      src={fotoDaniel}
      alt="Daniel Rosa - Perito Judicial em Tecnologia da Informação"
      className="hero-photo"
    />

    <div className="hero-photo-overlay">

      <span>
        PERITO JUDICIAL
      </span>

      <h2>
        Daniel Rosa
      </h2>

      <p>
        Tecnologia da Informação
      </p>

    </div>

  </div>

</div>

          </div>

        </section>


        {/* SOBRE */}
        <section className="about" id="sobre">

          <div className="container about-content">

            <div className="about-heading">

              <span className="section-label">
                SOBRE O PROFISSIONAL
              </span>

              <h2>
                Tecnologia aplicada à
                <span> prova pericial.</span>
              </h2>

            </div>


            <div className="about-text">

              <p>
                Daniel Rosa atua como Perito Judicial na área de Tecnologia da
                Informação, prestando suporte técnico especializado em demandas
                que envolvem sistemas, dados, ambientes computacionais e outros
                elementos relacionados à tecnologia.
              </p>

              <p>
                O trabalho pericial é conduzido com foco em objetividade,
                fundamentação técnica e clareza, buscando apresentar ao Juízo
                elementos técnicos compreensíveis e adequadamente documentados.
              </p>

            </div>


            <div className="about-cards">

              <div className="about-card">

                <span>01</span>

                <h3>
                  Atuação Judicial
                </h3>

                <p>
                  Trabalho técnico voltado à produção e análise de elementos
                  periciais em processos judiciais.
                </p>

              </div>


              <div className="about-card">

                <span>02</span>

                <h3>
                  Tecnologia da Informação
                </h3>

                <p>
                  Conhecimento técnico aplicado à análise de sistemas,
                  dados e ambientes computacionais.
                </p>

              </div>


              <div className="about-card">

                <span>03</span>

                <h3>
                  Atuação Nacional
                </h3>

                <p>
                  Cadastro profissional para atuação pericial em diferentes
                  estados brasileiros.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ATUAÇÃO PERICIAL */}
<section className="services" id="atuacao">
  <div className="container">

   <div className="services-heading">
  <span className="section-label">
    ÁREAS DE ATUAÇÃO PERICIAL
  </span>

  <h2>
    Perícia Judicial em
    <span> Tecnologia da Informação.</span>
  </h2>

  <p>
    Atuação técnica em demandas judiciais que envolvem
    sistemas, documentos eletrônicos, assinaturas digitais,
    dados, registros computacionais e demais elementos
    relacionados à Tecnologia da Informação.
  </p>
</div>

    <div className="services-grid">

  <article className="service-card">
    <span className="service-number">01</span>

    <h3>
      Assinaturas Eletrônicas e Digitais
    </h3>

    <p>
      Análise técnica de assinaturas eletrônicas e digitais,
      certificados digitais, mecanismos de autenticação,
      integridade documental e elementos técnicos relacionados
      à validação de documentos eletrônicos.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">02</span>

    <h3>
      Documentos e Arquivos Digitais
    </h3>

    <p>
      Análise de documentos eletrônicos, arquivos digitais,
      propriedades técnicas, metadados, datas, versões e
      demais elementos relevantes ao objeto da perícia.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">03</span>

    <h3>
      Sistemas e Softwares
    </h3>

    <p>
      Avaliação técnica de sistemas de informação, aplicações,
      funcionalidades, registros produzidos por software e
      comportamento de ambientes computacionais.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">04</span>

    <h3>
      Logs e Registros de Sistemas
    </h3>

    <p>
      Análise de logs, registros de acesso, eventos,
      autenticações e informações técnicas produzidas
      por sistemas e infraestruturas computacionais.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">05</span>

    <h3>
      Evidências Digitais
    </h3>

    <p>
      Análise técnica de elementos digitais relacionados
      ao processo judicial, observando integridade,
      rastreabilidade e consistência das informações examinadas.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">06</span>

    <h3>
      E-mails e Comunicações Eletrônicas
    </h3>

    <p>
      Exame técnico de mensagens eletrônicas, cabeçalhos,
      registros associados e outros elementos digitais
      pertinentes à demanda judicial.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">07</span>

    <h3>
      Bancos de Dados e Registros
    </h3>

    <p>
      Análise de informações armazenadas em bancos de dados,
      registros de sistemas, histórico de operações e
      consistência dos dados relacionados à perícia.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">08</span>

    <h3>
      Autenticidade e Integridade Digital
    </h3>

    <p>
      Avaliação técnica de integridade de arquivos,
      mecanismos de verificação, hashes, registros e
      outros elementos utilizados na análise de autenticidade.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">09</span>

    <h3>
      Acessos e Identificação Digital
    </h3>

    <p>
      Análise de registros de acesso, usuários, autenticações,
      endereços IP e demais elementos técnicos relacionados
      à identificação de operações em ambientes digitais.
    </p>
  </article>


  <article className="service-card">
    <span className="service-number">10</span>

    <h3>
      Quesitos e Laudo Pericial
    </h3>

    <p>
      Análise dos quesitos formulados pelas partes e pelo Juízo,
      execução dos exames técnicos e elaboração de laudo pericial
      objetivo, documentado e fundamentado.
    </p>
  </article>

</div>

  </div>
</section>

        {/* ATUAÇÃO NACIONAL */}
        <section className="coverage" id="cobertura">
          <div className="container">

            <div className="coverage-heading">
              <span className="section-label">
                ATUAÇÃO NACIONAL
              </span>

              <h2>
                Presença profissional
                <span> em todo o Brasil.</span>
              </h2>

              <p>
                Visualização dos estados de atuação e das localidades
                com perícias atualmente em andamento.
              </p>
            </div>

            <div className="coverage-content">

              <div className="map-card">
 <BrazilMap
  onEstadoChange={setEstadoSelecionado}
  estadoSelecionado={estadoSelecionado}
/>
</div>

              <div className="map-info">

  {!estadoSelecionado && (
    <>
      <span>MAPA INTERATIVO</span>

      <h3>
        Atuação pericial nacional
      </h3>

      <p>
        Passe o mouse sobre um estado para visualizar
        informações sobre cadastro profissional e
        perícias atualmente em andamento.
      </p>
    </>
  )}


  {estadoSelecionado && (
    <>
      <span>
        {estadoSelecionado.sigla}
      </span>

      <h3>
        {estadoSelecionado.nome}
      </h3>
        {possuiCadastro && totalNomeacoes > 0 && (
  <div className="state-total">

    <span>
      TOTAL DE NOMEAÇÕES
    </span>

    <strong>
      {totalNomeacoes}
    </strong>

    <p>
      {totalNomeacoes === 1
        ? 'nomeação ativas'
        : 'nomeações ativas'
      }
    </p>

  </div>
)}

      {possuiCadastro ? (
        <div className="registration-status registered">
          <strong>
            ✓ Cadastrado para atuação
          </strong>

          <p>
            Cadastro profissional para atuação
            pericial neste estado.
          </p>
        </div>
      ) : (
        <div className="registration-status unavailable">
          <strong>
            Cadastro não informado
          </strong>

          <p>
            Atualmente este estado não consta
            entre os locais de cadastro profissional.
          </p>
        </div>
      )}


      {possuiCadastro && (
        <div className="active-cases">

          <span className="active-cases-title">
            PERÍCIAS EM ANDAMENTO
          </span>


          {cidadesAtivas.length > 0 ? (

            <div className="cities-list">

              {cidadesAtivas.map((cidade) => (

                <div
                  className="city-item"
                  key={cidade.nome}
                >

                 <div className="city-content">

  <strong className="city-name">
    {cidade.nome}
  </strong>

  <span className="city-count">
  {cidade.quantidade === 1
    ? 'Nomeado em 1 perícia'
    : `Nomeado em ${cidade.quantidade} perícias`
  }
</span>

  {cidade.varas && cidade.varas.length > 0 && (
    <div className="court-list">

      {cidade.varas.map((vara) => (
        <span
          className="court-item"
          key={vara}
        >
          {vara}
        </span>
      ))}

    </div>
  )}

</div>

                  <strong className="city-number">
                    {cidade.quantidade}
                  </strong>

                </div>

              ))}

            </div>

          ) : (

            <p className="no-active-cases">
              Nenhuma perícia ativa cadastrada
              neste estado no momento.
            </p>

          )}

        </div>
      )}

    </>
  )}

</div>

            </div>

          </div>
        </section>

       {/* CONTATO */}
<section className="contact" id="contato">

  <div className="container contact-content">

    <div className="contact-text">

      <span className="section-label">
        CONTATO PROFISSIONAL
      </span>

      <h2>
        Entre em contato para
        <span> assuntos profissionais.</span>
      </h2>

      <p>
        Para informações relacionadas à atuação pericial,
        nomeações, disponibilidade profissional ou demais
        assuntos relacionados à Tecnologia da Informação.
      </p>


      <div className="contact-details">

        {/* E-MAIL */}
        <a
          href="mailto:danielrosa_1@hotmail.com"
          className="contact-detail"
        >
          <span>E-MAIL</span>

          <strong>
            danielrosa_1@hotmail.com
          </strong>
        </a>


        {/* WHATSAPP */}
        <a
          href="https://wa.me/5579998657281?text=Olá%20Daniel,%20entrei%20em%20contato%20através%20do%20seu%20site."
          target="_blank"
          rel="noopener noreferrer"
          className="contact-detail"
        >
          <span>WHATSAPP</span>

          <strong>
            +55 79 99865-7281
          </strong>
        </a>


        {/* LINKEDIN */}
        <a
          href="https://www.linkedin.com/in/daniel-rosa-ti/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-detail"
        >
          <span>LINKEDIN</span>

          <strong>
            linkedin.com/in/daniel-rosa-ti
          </strong>
        </a>


        {/* ATUAÇÃO */}
        <div className="contact-detail">
          <span>ATUAÇÃO</span>

          <strong>
            Atendimento em âmbito nacional
          </strong>
        </div>

      </div>

    </div>


    <div className="contact-card">

      <span>
        PERITO JUDICIAL
      </span>

      <h3>
        Daniel Rosa
      </h3>

      <p>
        Tecnologia da Informação
      </p>

      <div className="contact-divider"></div>

      <p className="contact-description">
        Atuação técnica, objetiva e fundamentada
        em perícias judiciais relacionadas à
        Tecnologia da Informação.
      </p>


      <div className="contact-actions">

        <a
          href="https://wa.me/5579998657281?text=Olá%20Daniel,%20entrei%20em%20contato%20através%20do%20seu%20site."
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button whatsapp-button"
        >
          Falar pelo WhatsApp
        </a>

        <a
          href="mailto:danielrosa_1@hotmail.com"
          className="contact-button secondary-contact-button"
        >
          Enviar e-mail
        </a>

        <a
          href="https://www.linkedin.com/in/daniel-rosa-ti/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-button"
        >
          Ver perfil no LinkedIn
        </a>

      </div>

    </div>

  </div>

</section>

      </main>

      <footer className="footer">

  <div className="container footer-content">

    <div className="footer-brand">

      <div className="logo-icon">
        DR
      </div>

      <div>
        <strong>
          Daniel Rosa
        </strong>

        <span>
          Perito Judicial em Tecnologia da Informação
        </span>
      </div>

    </div>


    <div className="footer-text">
      <p>
        © {new Date().getFullYear()} Daniel Rosa.
        Todos os direitos reservados.
      </p>
    </div>

  </div>

</footer>

    </div>
  )
}

export default App