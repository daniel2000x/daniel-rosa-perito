import { useEffect, useRef, useState } from 'react'
import './AssistenteForense.css'

const PERGUNTAS = [
  'O que é cadeia de custódia digital?',
  'Como verificar a autenticidade de mensagens?',
  'O que são metadados de arquivos?',
]

const BOAS_VINDAS = 'Olá! Sou o Assistente Forense IA do site de Daniel Rosa. Posso explicar conceitos de perícia digital, evidências eletrônicas e computação forense. Como posso ajudar?'

export default function AssistenteForense() {
  const [aberto, setAberto] = useState(false)
  const [mensagens, setMensagens] = useState([{ role: 'assistant', content: BOAS_VINDAS }])
  const [pergunta, setPergunta] = useState('')
  const [carregando, setCarregando] = useState(false)
  const fim = useRef(null)
  const campo = useRef(null)

  useEffect(() => {
    if (aberto) {
      fim.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [mensagens, carregando, aberto])

  async function enviar(texto) {
    const conteudo = texto.trim()
    if (!conteudo || carregando || conteudo.length > 600) return

    const anteriores = mensagens
    setMensagens(lista => [...lista, { role: 'user', content: conteudo }])
    setPergunta('')
    setCarregando(true)

    try {
      const retorno = await fetch('/api/assistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: conteudo,
          history: anteriores.slice(1).slice(-8),
        }),
      })
      const dados = await retorno.json()
      if (!retorno.ok) throw new Error(dados.error || 'Erro ao consultar o assistente.')
      setMensagens(lista => [...lista, { role: 'assistant', content: dados.answer }])
    } catch (erro) {
      setMensagens(lista => [...lista, {
        role: 'assistant',
        content: erro.message || 'Não foi possível consultar a IA agora.',
      }])
    } finally {
      setCarregando(false)
      campo.current?.focus()
    }
  }

  return (
    <div className="dr-ai" aria-label="Assistente Forense IA">
      {aberto && (
        <section className="dr-ai-panel" aria-label="Conversa com o assistente virtual">
          <header className="dr-ai-header">
            <div className="dr-ai-avatar" aria-hidden="true">✦</div>
            <div className="dr-ai-heading">
              <strong>Assistente Forense IA</strong>
              <span>Perícia Digital • Daniel Rosa</span>
            </div>
            <button type="button" className="dr-ai-close" aria-label="Fechar chat" onClick={() => setAberto(false)}>×</button>
          </header>
          <div className="dr-ai-messages" role="log" aria-live="polite" aria-relevant="additions text">
            {mensagens.map((mensagem, indice) => (
              <div className={`dr-ai-message ${mensagem.role === 'user' ? 'dr-ai-user' : 'dr-ai-assistant'}`} key={indice}>
                {mensagem.content}
              </div>
            ))}
            {mensagens.length === 1 && (
              <div className="dr-ai-suggestions">
                {PERGUNTAS.map(item => (
                  <button key={item} type="button" onClick={() => enviar(item)}>{item}</button>
                ))}
              </div>
            )}
            {carregando && <div className="dr-ai-message dr-ai-assistant" role="status">Analisando sua pergunta…</div>}
            <div ref={fim} />
          </div>
          <form className="dr-ai-form" onSubmit={(e) => { e.preventDefault(); enviar(pergunta) }}>
            <label className="dr-ai-sr-only" htmlFor="dr-ai-input">Digite sua pergunta</label>
            <textarea
              id="dr-ai-input"
              ref={campo}
              rows="2"
              maxLength={600}
              placeholder="Sua dúvida sobre perícia digital..."
              value={pergunta}
              disabled={carregando}
              onChange={evento => setPergunta(evento.target.value)}
              onKeyDown={evento => {
                if (evento.key === 'Enter' && !evento.shiftKey) {
                  evento.preventDefault()
                  enviar(pergunta)
                }
              }}
            />
            <button type="submit" aria-label="Enviar pergunta" disabled={!pergunta.trim() || carregando}>Enviar</button>
          </form>
          <p className="dr-ai-note">IA educativa. Não envie dados sigilosos ou documentos processuais. Respostas não substituem exame pericial.</p>
        </section>
      )}
      <button
        type="button"
        className="dr-ai-fab"
        aria-label={aberto ? 'Fechar assistente de perícia digital' : 'Abrir assistente de perícia digital'}
        aria-expanded={aberto}
        onClick={() => setAberto(atual => !atual)}
      >
        <span aria-hidden="true">{aberto ? '×' : '✦'}</span>
        {!aberto && <strong>IA Forense</strong>}
      </button>
    </div>
  )
}
