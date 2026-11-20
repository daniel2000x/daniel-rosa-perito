import { useEffect, useRef, useState } from 'react'
import './ServicosCarouselControls.css'

/**
 * Navegação para os 14 cartões existentes em App.jsx.
 * Mantém todos os textos originais; o CSS transforma .services-grid em carrossel.
 * Deve ser inserido imediatamente ANTES da div .services-grid.
 */
function ServicosCarouselControls() {
  const trackRef = useRef(null)
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [total, setTotal] = useState(14)
  const [visiveis, setVisiveis] = useState(3)
  const [ultimoIndice, setUltimoIndice] = useState(11)

  useEffect(() => {
    const track = document.querySelector('#atuacao .services-grid')
    if (!track) return undefined

    trackRef.current = track
    let frame = null

    function atualizar() {
      const cards = Array.from(track.children)
      const quantidade = cards.length
      if (!quantidade) return

      const passo = quantidade > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : cards[0].getBoundingClientRect().width
      const visiveisAgora = Math.min(
        quantidade,
        Math.max(1, Math.round(track.clientWidth / (passo || 1))),
      )
      const limite = Math.max(0, quantidade - visiveisAgora)
      const primeiro = cards[0].offsetLeft
      const indice = cards.reduce((melhor, card, atual) => {
        const distanciaAtual = Math.abs(card.offsetLeft - primeiro - track.scrollLeft)
        const distanciaMelhor = Math.abs(cards[melhor].offsetLeft - primeiro - track.scrollLeft)
        return distanciaAtual < distanciaMelhor ? atual : melhor
      }, 0)

      setIndiceAtual(Math.min(indice, limite))
      setTotal(quantidade)
      setVisiveis(visiveisAgora)
      setUltimoIndice(limite)
    }

    function programarAtualizacao() {
      if (frame !== null) return
      frame = window.requestAnimationFrame(() => {
        frame = null
        atualizar()
      })
    }

    atualizar()
    track.addEventListener('scroll', programarAtualizacao, { passive: true })
    window.addEventListener('resize', programarAtualizacao)
    const observador = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(programarAtualizacao)
    observador?.observe(track)

    return () => {
      track.removeEventListener('scroll', programarAtualizacao)
      window.removeEventListener('resize', programarAtualizacao)
      observador?.disconnect()
      if (frame !== null) window.cancelAnimationFrame(frame)
      trackRef.current = null
    }
  }, [])

  function navegar(direcao) {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children)
    const destino = Math.min(ultimoIndice, Math.max(0, indiceAtual + direcao))
    if (!cards[destino]) return

    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({
      left: Math.max(0, cards[destino].offsetLeft - cards[0].offsetLeft),
      behavior: reduzirMovimento ? 'instant' : 'smooth',
    })
  }

  const fim = Math.min(indiceAtual + visiveis, total)

  return (
    <div className="servicos-carousel-controls" aria-label="Navegação das áreas de atuação">
      <div className="servicos-carousel-instruction">
        <span className="servicos-carousel-kicker">ESPECIALIDADES</span>
        <span className="servicos-carousel-hint">Explore as áreas pelas setas ou deslize os cartões</span>
      </div>

      <div className="servicos-carousel-actions">
        <span className="servicos-carousel-counter" aria-live="polite" aria-atomic="true">
          <strong>{String(indiceAtual + 1).padStart(2, '0')}</strong>
          <span>–</span>
          <strong>{String(fim).padStart(2, '0')}</strong>
          <span className="servicos-carousel-counter-total">/ {String(total).padStart(2, '0')}</span>
        </span>
        <button
          type="button"
          className="servicos-carousel-arrow"
          aria-label="Ver áreas anteriores"
          onClick={() => navegar(-1)}
          disabled={indiceAtual === 0}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m14.5 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="servicos-carousel-arrow"
          aria-label="Ver próximas áreas"
          onClick={() => navegar(1)}
          disabled={indiceAtual >= ultimoIndice}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9.5 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div
        className="servicos-carousel-progress"
        role="progressbar"
        aria-label="Progresso na lista de áreas de atuação"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={fim}
      >
        <span style={{ width: `${(fim / Math.max(total, 1)) * 100}%` }} />
      </div>
    </div>
  )
}

export default ServicosCarouselControls
