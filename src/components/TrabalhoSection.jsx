import { useEffect, useMemo, useState } from 'react'
import { geoMercator } from 'd3-geo'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { nomeacoesTrabalhistas, trts } from '../data/trts'
import './TrabalhoSection.css'

const geoUrl = 'https://cdn.jsdelivr.net/gh/henriquemalvar/br-geojson@main/dist/estados.geojson'

function corrigirGeometria(geometry) {
  if (!geometry) return geometry
  if (geometry.type === 'Polygon') {
    return { ...geometry, coordinates: geometry.coordinates.map((ring) => [...ring].reverse()) }
  }
  if (geometry.type === 'MultiPolygon') {
    return {
      ...geometry,
      coordinates: geometry.coordinates.map((polygon) =>
        polygon.map((ring) => [...ring].reverse()),
      ),
    }
  }
  return geometry
}

function TrabalhoSection() {
  // Efeito de entrada progressiva aplicado também às seções já existentes.
  // Os elementos só ficam ocultos depois que a observação é inicializada.
  useEffect(() => {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const elementos = document.querySelectorAll([
      '.hero-text', '.hero-visual',
      '.pericia-explorer-heading', '.pericia-options', '.pericia-result',
      '.about-heading', '.about-text', '.about-card',
      '.processo-heading', '.timeline-wrapper', '.timeline-result',
      '.services-heading', '.technical-assistance-highlight', '.service-card',
      '.coverage-heading', '.coverage-dashboard-stats', '.map-card', '.map-info',
      '.labor-heading-copy', '.labor-headline-stat', '.labor-map-card',
      '.labor-detail-card', '.labor-directory',
      '.contact-text', '.contact-card',
    ].join(', '))

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible')
          observador.unobserve(entrada.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' })

    elementos.forEach((elemento, indice) => {
      elemento.style.setProperty('--reveal-delay', `${(indice % 4) * 65}ms`)
      elemento.classList.add('scroll-reveal')
      observador.observe(elemento)
    })

    return () => {
      observador.disconnect()
      elementos.forEach((elemento) => {
        elemento.classList.remove('scroll-reveal', 'is-visible')
        elemento.style.removeProperty('--reveal-delay')
      })
    }
  }, [])
  const [regiaoAtiva, setRegiaoAtiva] = useState(20)
  const [estadoEmFoco, setEstadoEmFoco] = useState(null)
  const [geoData, setGeoData] = useState(null)
  const [mapaIndisponivel, setMapaIndisponivel] = useState(false)

  useEffect(() => {
    let ativo = true
    fetch(geoUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Falha ao carregar a geografia do Brasil')
        return response.json()
      })
      .then((data) => {
        if (!ativo) return
        setGeoData({
          ...data,
          features: data.features.map((feature) => ({
            ...feature,
            geometry: corrigirGeometria(feature.geometry),
          })),
        })
      })
      .catch(() => {
        if (ativo) setMapaIndisponivel(true)
      })
    return () => { ativo = false }
  }, [])

  const projection = useMemo(() => {
    if (!geoData) return null
    return geoMercator().fitExtent([[40, 30], [760, 570]], geoData)
  }, [geoData])

  const regiaoSelecionada = trts.find((trt) => trt.numero === regiaoAtiva) || trts[0]
  const nomeacoesDaRegiao = nomeacoesTrabalhistas[regiaoAtiva] || []
  const totalNomeacoesTrabalhistas = Object.values(nomeacoesTrabalhistas)
    .flat()
    .reduce((soma, item) => soma + (Number(item.quantidade) || 0), 0)
  const totalDaRegiao = nomeacoesDaRegiao
    .reduce((soma, item) => soma + (Number(item.quantidade) || 0), 0)

  function selecionarEstado(sigla) {
    const regioes = trts.filter((trt) => trt.estados.includes(sigla))
    if (!regioes.length) return
    // Em São Paulo, um segundo clique permite alternar TRT-2 e TRT-15.
    const outraRegiao = regioes.find((trt) => trt.numero !== regiaoAtiva)
    setRegiaoAtiva((outraRegiao || regioes[0]).numero)
  }

  const regioesEmFoco = estadoEmFoco
    ? trts.filter((trt) => trt.estados.includes(estadoEmFoco))
    : []

  return (
    <section className="labor-section" id="justica-trabalho" aria-labelledby="labor-titulo">
      <div className="container">
        <div className="labor-heading">
          <div className="labor-heading-copy">
            <span className="labor-eyebrow">JUSTIÇA DO TRABALHO · ATUAÇÃO NACIONAL</span>
            <h2 id="labor-titulo">24 regiões. <span>Uma atuação preparada para todo o Brasil.</span></h2>
            <p>
              Cadastro profissional informado nos 24 Tribunais Regionais do Trabalho,
              da 1ª à 24ª Região, com disponibilidade para futuras nomeações em
              perícias de Tecnologia da Informação.
            </p>
          </div>
          <div className="labor-headline-stat" aria-label="Cadastrado nos 24 TRTs">
            <strong>24<span>/24</span></strong>
            <span>TRTs com cadastro profissional</span>
            <small>Disponível para nomeações</small>
          </div>
        </div>

        <div className="labor-workspace">
          <div className="labor-map-card">
            <div className="labor-card-heading">
              <span>EXPLORADOR DE REGIÕES</span>
              <h3>Mapa da Justiça do Trabalho</h3>
              <p>Selecione um estado ou escolha uma das 24 regiões na lista abaixo.</p>
            </div>

            {mapaIndisponivel ? (
              <div className="labor-map-loading" role="status">
                Mapa indisponível no momento. Utilize a lista de regiões abaixo.
              </div>
            ) : geoData && projection ? (
              <div className="labor-map" aria-label="Mapa interativo das regiões da Justiça do Trabalho">
                <ComposableMap width={800} height={600} projection={projection}>
                  <Geographies geography={geoData}>
                    {({ geographies }) => geographies.map((geo) => {
                      const sigla = geo.properties?.sigla
                      const nome = geo.properties?.nome || sigla
                      const selecionado = regiaoSelecionada.estados.includes(sigla)
                      return (
                        <Geography
                          key={sigla || geo.rsmKey}
                          geography={geo}
                          className={`labor-state${selecionado ? ' is-selected' : ''}${estadoEmFoco === sigla ? ' is-hovered' : ''}`}
                          aria-label={`${nome}: ${trts.filter((t) => t.estados.includes(sigla)).map((t) => `TRT-${t.numero}`).join(' e ')}`}
                          role="button"
                          tabIndex={0}
                          onClick={() => selecionarEstado(sigla)}
                          onMouseEnter={() => setEstadoEmFoco(sigla)}
                          onMouseLeave={() => setEstadoEmFoco(null)}
                          onFocus={() => setEstadoEmFoco(sigla)}
                          onBlur={() => setEstadoEmFoco(null)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              selecionarEstado(sigla)
                            }
                          }}
                        />
                      )
                    })}
                  </Geographies>
                </ComposableMap>
              </div>
            ) : (
              <div className="labor-map-loading" role="status">Carregando mapa do Brasil...</div>
            )}

            <div className="labor-map-footer" aria-live="polite">
              <span className="labor-legend-dot" aria-hidden="true" />
              <span>
                {estadoEmFoco && regioesEmFoco.length
                  ? `${estadoEmFoco} · ${regioesEmFoco.map((trt) => `TRT-${trt.numero}`).join(' e ')}`
                  : `Em destaque: TRT-${regiaoAtiva} · ${regiaoSelecionada.estados.join(' / ')}`}
              </span>
            </div>
            <p className="labor-map-note">
              Mapa por estado. Em São Paulo, as áreas dos TRTs 2 e 15 possuem
              limites municipais distintos, não desenhados neste mapa.
            </p>
          </div>

          <aside className="labor-detail-card" aria-live="polite">
            <div className="labor-detail-top">
              <span className="labor-detail-label">REGIÃO SELECIONADA</span>
              <span className="labor-status-pill"><i aria-hidden="true" /> CADASTRADO</span>
            </div>
            <div className="labor-detail-number">TRT-{regiaoSelecionada.numero}</div>
            <h3>{regiaoSelecionada.abrangencia}</h3>
            <dl className="labor-detail-meta">
              <div><dt>Estados / DF</dt><dd>{regiaoSelecionada.estados.join(' · ')}</dd></div>
              <div><dt>Sede do tribunal</dt><dd>{regiaoSelecionada.sede}</dd></div>
              <div><dt>Situação</dt><dd>Disponível para nomeações</dd></div>
            </dl>
            <div className="labor-appointment">
              <div className="labor-appointment-heading">
                <span>NOMEAÇÕES NO TRT-{regiaoAtiva}</span>
                <strong>{totalDaRegiao}</strong>
              </div>
              {nomeacoesDaRegiao.length > 0 ? (
                <ul className="labor-case-list">
                  {nomeacoesDaRegiao.map((item, index) => (
                    <li key={`${item.cidade}-${item.vara}-${index}`}>
                      <strong>{item.cidade}</strong>
                      <span>{item.vara ? `${item.vara} · ` : ''}{item.quantidade} {item.quantidade === 1 ? 'nomeação' : 'nomeações'}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Ainda não houve nomeações nesta região. Este espaço será atualizado quando ocorrer a primeira.</p>
              )}
            </div>
            <div className="labor-national-count">
              <span>Total de nomeações na Justiça do Trabalho</span>
              <strong>{totalNomeacoesTrabalhistas}</strong>
            </div>
          </aside>
        </div>

        <div className="labor-directory">
          <div className="labor-directory-heading">
            <div>
              <span className="labor-eyebrow">CONSULTA POR TRIBUNAL</span>
              <h3>As 24 regiões e seus estados</h3>
            </div>
            <p>Toque em uma região para destacar seu território e conferir os dados do cadastro.</p>
          </div>
          <div className="labor-directory-grid" role="group" aria-label="Selecionar Tribunal Regional do Trabalho">
            {trts.map((trt) => (
              <button
                type="button"
                className={`labor-region-button${regiaoAtiva === trt.numero ? ' active' : ''}`}
                key={trt.numero}
                aria-pressed={regiaoAtiva === trt.numero}
                onClick={() => { setRegiaoAtiva(trt.numero); setEstadoEmFoco(null) }}
                title={trt.abrangencia}
              >
                <span>TRT-{trt.numero}</span>
                <strong>{trt.estados.join(' / ')}</strong>
              </button>
            ))}
          </div>
          <p className="labor-directory-footnote">
            Os cadastros profissionais não representam nomeações recebidas.
            {totalNomeacoesTrabalhistas === 0
              ? ' Até o momento, nenhuma nomeação trabalhista foi registrada.'
              : ` Nomeações registradas na Justiça do Trabalho: ${totalNomeacoesTrabalhistas}.`}
          </p>
        </div>
      </div>
    </section>
  )
}

export default TrabalhoSection
