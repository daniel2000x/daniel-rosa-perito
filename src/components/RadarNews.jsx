import { useEffect, useRef, useState } from 'react'
import './RadarNews.css'

const radarUrl = 'https://dr-radar-pericial.pages.dev'

const noticiaInicial = {
  id: 'lancamento-radar',
  titulo: 'Lançamento do DR Radar Pericial',
  resumo:
    'Desenvolvimento de um sistema próprio de inteligência e monitoramento nacional de publicações e possíveis nomeações judiciais.',
  tribunal: 'TECNOLOGIA PRÓPRIA',
  localidade: 'Brasil',
  publicado_em: '2026-11-25T12:00:00-03:00',
}

export function RadarIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="dr-radar-icon"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="17"
        stroke="currentColor" strokeWidth="1.5"
        opacity=".6" />

      <circle cx="20" cy="20" r="11"
        stroke="currentColor" strokeWidth="1.5"
        opacity=".6" />

      <circle cx="20" cy="20" r="5"
        stroke="currentColor" strokeWidth="1.5" />

      <g className="dr-radar-sweep">
        <path
          d="M20 20V3A17 17 0 0 1 34.72 11.5Z"
          fill="currentColor"
          opacity=".2"
        />

        <path
          d="M20 20 34.72 11.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      <circle cx="29" cy="25" r="2" fill="#34d399" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  )
}

export function RadarLink() {
  return (
    <a
      className="dr-radar-link"
      href={radarUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="DR Radar Pericial — acesso pessoal exclusivo"
    >
      <RadarIcon />

      <span>DR Radar</span>

      <svg
        className="dr-lock-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="5" y="10" width="14"
          height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    </a>
  )
}

function moverCarrossel(elemento, direcao) {

  if (!elemento) return

  const limite =
    elemento.scrollWidth - elemento.clientWidth

  if (limite <= 4) return

  const reduzirMovimento = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  const comportamento =
    reduzirMovimento ? 'auto' : 'smooth'

  if (
    direcao > 0 &&
    elemento.scrollLeft >= limite - 4
  ) {
    elemento.scrollTo({
      left: 0,
      behavior: comportamento,
    })
    return
  }

  if (
    direcao < 0 &&
    elemento.scrollLeft <= 4
  ) {
    elemento.scrollTo({
      left: limite,
      behavior: comportamento,
    })
    return
  }

  const card = elemento.querySelector('article')

  const distancia = card
    ? card.getBoundingClientRect().width + 16
    : elemento.clientWidth

  elemento.scrollBy({
    left: direcao * distancia,
    behavior: comportamento,
  })

}

export default function RadarNews() {

  const [noticias, setNoticias] = useState([])
  const [falha, setFalha] = useState(false)
  const [pausado, setPausado] = useState(false)

  const trilha = useRef(null)
  const secao = useRef(null)

  // ATUALIZACAO AUTOMATICA DAS NOTICIAS

  useEffect(() => {

    const url = import.meta.env.VITE_RADAR_PUBLIC_URL
    const chave = import.meta.env.VITE_RADAR_PUBLIC_KEY

    if (!url || !chave) return

    const controller = new AbortController()

    let carregando = false

    async function carregarNoticias() {

      if (carregando || document.hidden) return

      carregando = true

      try {

        const endereco = new URL(
          '/rest/v1/radar_noticias_publicas',
          url
        )

        endereco.search = new URLSearchParams({
          select:
            'id,titulo,resumo,tribunal,localidade,publicado_em',
          order: 'publicado_em.desc,id.desc',
          limit: '20',
        }).toString()

        const resposta = await fetch(endereco, {
          headers: {
            apikey: chave,
          },
          signal: controller.signal,
          cache: 'no-store',
        })

        if (!resposta.ok) {
          throw new Error('Feed indisponivel')
        }

        const dados = await resposta.json()

        if (!Array.isArray(dados)) {
          throw new Error('Feed invalido')
        }

        if (!controller.signal.aborted) {

          setNoticias(
            dados.filter(n =>
              n &&
              typeof n.titulo === 'string' &&
              typeof n.resumo === 'string' &&
              Number.isFinite(Date.parse(n.publicado_em))
            )
          )

          setFalha(false)

        }

      } catch {

        if (!controller.signal.aborted) {
          setFalha(true)
        }

      } finally {

        carregando = false

      }

    }

    carregarNoticias()

    const intervalo = window.setInterval(
      carregarNoticias,
      60000
    )

    document.addEventListener(
      'visibilitychange',
      carregarNoticias
    )

    return () => {

      controller.abort()

      window.clearInterval(intervalo)

      document.removeEventListener(
        'visibilitychange',
        carregarNoticias
      )

    }

  }, [])


  // MOVIMENTO AUTOMATICO DO CARROSSEL

  useEffect(() => {

    if (pausado) return

    const intervalo = window.setInterval(() => {

      const elemento = trilha.current
      const area = secao.current

      if (!elemento || !area || document.hidden) return

      if (
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
      ) return

     if (
  area.contains(document.activeElement) &&
  document.activeElement?.matches(':focus-visible')
) return

      const posicao = elemento.getBoundingClientRect()

      if (
        posicao.bottom <= 0 ||
        posicao.top >= window.innerHeight
      ) return

      moverCarrossel(elemento, 1)

    }, 3000)

    return () => window.clearInterval(intervalo)

  }, [pausado])


  const itens = [...noticias, noticiaInicial]

  function navegar(direcao) {
    moverCarrossel(trilha.current, direcao)
  }

  return (

    <section
      className="dr-news"
      id="noticias"
      ref={secao}
      aria-labelledby="dr-news-title"
    >

      <div className="container">

        <div className="dr-news-header">

          <div>

            <span className="section-label">
              TRAJETÓRIA PROFISSIONAL
            </span>

            <h2 id="dr-news-title">
              Atualizações da
              <span> atuação pericial.</span>
            </h2>

            <p>
              Acompanhe novas nomeações confirmadas,
              avanços tecnológicos e novidades da
              atuação profissional.
            </p>

          </div>

          {itens.length > 1 && (

            <div className="dr-news-controls">

              <button
                type="button"
                onClick={() => navegar(-1)}
                aria-label="Notícias anteriores"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => setPausado(p => !p)}
                aria-label={
                  pausado
                    ? 'Retomar animação'
                    : 'Pausar animação'
                }
                title={
                  pausado
                    ? 'Retomar animação'
                    : 'Pausar animação'
                }
              >
                {pausado ? '▶' : 'Ⅱ'}
              </button>

              <button
                type="button"
                onClick={() => navegar(1)}
                aria-label="Próximas notícias"
              >
                ›
              </button>

            </div>

          )}

        </div>

        {falha && (
          <p className="dr-news-status">
            Não foi possível atualizar as notícias
            neste momento.
          </p>
        )}

        <div
          className="dr-news-track"
          ref={trilha}
          tabIndex={0}
          aria-label="Notícias profissionais"
        >

          {itens.map(noticia => (

            <article
              className="dr-news-card"
              key={noticia.id}
            >

              <div className="dr-news-meta">

                <span className="dr-news-tag">
                  {noticia.tribunal || 'ATUAÇÃO PERICIAL'}
                </span>

                <time dateTime={noticia.publicado_em}>
                  {new Intl.DateTimeFormat('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                  }).format(
                    new Date(noticia.publicado_em)
                  )}
                </time>

              </div>

              <h3>{noticia.titulo}</h3>

              <p>{noticia.resumo}</p>

              {noticia.localidade && (
                <span className="dr-news-place">
                  {noticia.localidade}
                </span>
              )}

            </article>

          ))}

        </div>

        <div className="dr-private-banner">

          <div className="dr-private-icon">
            <RadarIcon />
          </div>

          <div className="dr-private-content">

            <span className="dr-private-label">
              TECNOLOGIA DE DESENVOLVIMENTO PRÓPRIO
            </span>

            <h3>DR Radar Pericial</h3>

            <p>
              Ambiente de uso pessoal e exclusivo
              de Daniel Rosa, desenvolvido para
              monitorar publicações e identificar
              possíveis nomeações judiciais nos
              tribunais brasileiros em que possui
              cadastro pericial.
            </p>

            <span className="dr-private-status">
              Acesso administrativo restrito.
              Não disponível para consultas públicas.
            </span>

          </div>

          <RadarLink />

        </div>

      </div>

    </section>

  )

}
