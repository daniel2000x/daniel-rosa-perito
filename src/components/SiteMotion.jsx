import { useEffect, useRef, useState } from 'react'
import './SiteMotion.css'

/** Barra discreta de leitura. Atualiza somente o estilo da barra, sem
 * provocar novos renders da pagina inteira a cada rolagem. */
function SiteMotion() {
  const barraRef = useRef(null)

  useEffect(() => {
    const barra = barraRef.current
    if (!barra) return undefined

    let frame = null

    function atualizar() {
      frame = null
      const documento = document.documentElement
      const percurso = Math.max(0, documento.scrollHeight - window.innerHeight)
      const progresso = percurso > 0
        ? Math.min(1, Math.max(0, window.scrollY / percurso))
        : 0
      barra.style.transform = `scaleX(${progresso})`
    }

    function agendar() {
      if (frame !== null) return
      frame = window.requestAnimationFrame(atualizar)
    }

    atualizar()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)

    return () => {
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="site-motion-progress" aria-hidden="true">
      <span ref={barraRef} className="site-motion-progress-fill" />
    </div>
  )
}

/** Contador ativado uma vez, quando o indicador aparece na tela.
 * O valor final fica disponivel imediatamente a leitores de tela. */
export function AnimatedCounter({ value }) {
  const numeroFinal = Number.isFinite(Number(value))
    ? Math.max(0, Math.round(Number(value)))
    : 0

  const [mostrado, setMostrado] = useState(0)
  const alvoRef = useRef(null)

  useEffect(() => {
    const alvo = alvoRef.current
    if (!alvo) return undefined

    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (movimentoReduzido || !('IntersectionObserver' in window) || numeroFinal === 0) {
      // Atualizacao de estado intencional apenas no fallback/acessibilidade.
      setMostrado(numeroFinal)
      return undefined
    }

    let frame = null
    let inicio = null
    let iniciado = false
    let observador

    function animar(instante) {
      if (inicio === null) inicio = instante
      const fracao = Math.min(1, (instante - inicio) / 1100)
      const suavizada = 1 - (1 - fracao) ** 3
      setMostrado(Math.round(numeroFinal * suavizada))

      if (fracao < 1) {
        frame = window.requestAnimationFrame(animar)
      } else {
        frame = null
        setMostrado(numeroFinal)
      }
    }

    observador = new IntersectionObserver((entradas) => {
      if (iniciado || !entradas.some((entrada) => entrada.isIntersecting)) return
      iniciado = true
      observador.disconnect()
      frame = window.requestAnimationFrame(animar)
    }, { threshold: 0.25 })

    observador.observe(alvo)

    return () => {
      observador.disconnect()
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [numeroFinal])

  return (
    <span ref={alvoRef} className="site-animated-counter">
      <span aria-hidden="true">{mostrado}</span>
      <span className="site-motion-sr-only">{numeroFinal}</span>
    </span>
  )
}

export default SiteMotion
