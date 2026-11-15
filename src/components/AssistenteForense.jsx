import { useEffect, useRef, useState } from 'react'
import './AssistenteForense.css'

// Versão gratuita: não chama APIs externas nem envia mensagens a servidores.
// Respostas técnicas pré-programadas; não é uma IA generativa.
const ASSUNTOS = [
  {
    titulo: 'Cadeia de custódia digital',
    termos: ['cadeia de custodia', 'custodia', 'preservacao de evidencia', 'preservar prova'],
    resposta: 'A cadeia de custódia documenta como uma evidência foi identificada, coletada, acondicionada, transferida, examinada e preservada. Em perícia digital, é importante registrar responsáveis, datas, métodos, ferramentas e controles de integridade. Uma cadeia de custódia bem documentada contribui para a rastreabilidade, mas não substitui a análise técnica do material.'
  },
  {
    titulo: 'Hash e integridade de arquivos',
    termos: ['hash', 'sha-256', 'sha256', 'md5', 'integridade', 'checksum'],
    resposta: 'Um hash criptográfico, como SHA-256, produz um resumo digital de um conjunto de dados. Comparar os valores calculados em momentos diferentes ajuda a verificar se o conteúdo permaneceu igual. Isso, isoladamente, não prova autoria, veracidade do conteúdo ou o contexto em que o arquivo foi criado.'
  },
  {
    titulo: 'Metadados e arquivos digitais',
    termos: ['metadados', 'exif', 'data de criacao', 'data de modificacao', 'propriedades de arquivo'],
    resposta: 'Metadados são informações associadas a arquivos, como datas, formato, dimensões, aplicativo e, em alguns casos, dados de localização. Alguns campos podem ser alterados por programas ou processos automáticos. Por isso, sua interpretação exige análise do arquivo original, do sistema e do contexto da coleta.'
  },
  {
    titulo: 'Autenticidade de mensagens',
    termos: ['autenticidade de mensagens', 'mensagem verdadeira', 'mensagens falsas', 'conversa falsa', 'falsificacao de conversa', 'mensagem adulterada'],
    resposta: 'A autenticidade de uma conversa não deve ser concluída apenas pela aparência de uma imagem. A análise pode considerar dados obtidos de forma autorizada, registros disponíveis, contexto, integridade e eventuais inconsistências. A conclusão depende do material efetivamente examinado e das limitações de acesso.'
  },
  {
    titulo: 'WhatsApp e aplicativos de mensagens',
    termos: ['whatsapp', 'telegram', 'mensagens de aplicativo', 'conversa de aplicativo', 'chat de celular'],
    resposta: 'Uma perícia envolvendo WhatsApp ou outro mensageiro pode avaliar conversas, arquivos, registros disponíveis e o contexto de obtenção, conforme a autorização e as condições técnicas. Prints isolados podem ser insuficientes para confirmar autenticidade. A possibilidade de exame depende do dispositivo, das permissões, dos dados disponíveis e do objetivo pericial.'
  },
  {
    titulo: 'Prints e capturas de tela',
    termos: ['print', 'screenshot', 'captura de tela', 'imagem de conversa', 'foto da conversa'],
    resposta: 'Uma captura de tela registra uma representação visual, mas pode omitir contexto e, em algumas situações, ser editada. Para avaliar confiabilidade, o perito pode considerar o arquivo original, metadados, registros correlatos, cadeia de custódia e outras evidências disponíveis.'
  },
  {
    titulo: 'Recuperação de arquivos e mensagens',
    termos: ['recuperar', 'recuperacao', 'apagada', 'apagado', 'excluida', 'excluido', 'deletada', 'deletado'],
    resposta: 'A recuperação de dados excluídos nem sempre é possível. O resultado depende do tipo de armazenamento, criptografia, sobrescrita, cópias de segurança e estado do dispositivo. Não é correto prometer recuperar uma mensagem ou arquivo sem antes avaliar as condições técnicas e a autorização para o exame.'
  },
  {
    titulo: 'Perícia em celulares',
    termos: ['celular', 'smartphone', 'iphone', 'android', 'telefone movel', 'dispositivo movel'],
    resposta: 'Em celulares, a perícia pode envolver identificação do aparelho, preservação, coleta autorizada e análise de dados disponíveis. Bloqueios, criptografia, versão do sistema e estado do equipamento podem limitar o exame. A metodologia deve evitar alterações desnecessárias e manter registro dos procedimentos.'
  },
  {
    titulo: 'Perícia em computadores e armazenamento',
    termos: ['computador', 'notebook', 'hd', 'ssd', 'pendrive', 'disco rigido', 'armazenamento'],
    resposta: 'Em computadores e mídias de armazenamento, a análise pode investigar arquivos, registros do sistema, eventos e vestígios digitais relevantes. Quando tecnicamente adequado, utiliza-se aquisição forense e verificação de integridade, com documentação dos procedimentos e respeito ao escopo autorizado.'
  },
  {
    titulo: 'Assinatura eletrônica e digital',
    termos: ['assinatura digital', 'assinatura eletronica', 'certificado digital', 'icp brasil', 'documento assinado'],
    resposta: 'Assinatura eletrônica é um conceito amplo de manifestação de autoria ou concordância em meio eletrônico. A assinatura digital usa técnicas criptográficas para verificar integridade e vínculos com chaves e certificados. A avaliação de validade ou autoria concreta exige examinar o documento, o processo de assinatura e os elementos disponíveis.'
  },
  {
    titulo: 'Logs e registros de sistemas',
    termos: ['logs', 'log de acesso', 'registro de acesso', 'ip', 'endereco ip', 'rastreamento', 'rastreabilidade'],
    resposta: 'Logs registram eventos como acessos, erros, autenticações ou operações em sistemas. Sua análise depende da origem, integridade, horário, fuso, retenção e contexto. Um endereço IP ou um evento isolado normalmente não é suficiente para identificar uma pessoa com segurança.'
  },
  {
    titulo: 'Biometria, selfie e prova de vida',
    termos: ['biometria', 'selfie', 'prova de vida', 'reconhecimento facial', 'face id'],
    resposta: 'Sistemas de biometria e prova de vida podem gerar registros sobre capturas e verificações, mas suas conclusões dependem da tecnologia empregada e dos dados preservados. Em perícia, podem ser examinados procedimentos, rastros técnicos, limites do sistema e possíveis inconsistências, sem presumir identidade apenas por um resultado automatizado.'
  },
  {
    titulo: 'Blockchain e transações',
    termos: ['blockchain', 'criptomoeda', 'bitcoin', 'carteira digital', 'transacao digital'],
    resposta: 'Em redes blockchain públicas, transações podem ser verificadas por identificadores, horários aproximados e endereços. Contudo, um endereço não identifica, por si só, uma pessoa. A atribuição de autoria e a interpretação de uma transação dependem de informações adicionais e de uma análise contextual.'
  },
  {
    titulo: 'Incidentes de segurança digital',
    termos: ['incidente', 'invasao', 'ataque cibernetico', 'malware', 'ransomware', 'fraude digital', 'ciberseguranca'],
    resposta: 'A investigação de um incidente digital busca identificar eventos, vestígios, impactos e possíveis causas, preservando registros de forma adequada. Os procedimentos devem ser autorizados e documentados. Hipóteses precisam ser confrontadas com evidências, evitando afirmar autoria ou origem sem suporte técnico.'
  },
  {
    titulo: 'Quesitos, laudos e perícia judicial',
    termos: ['quesitos', 'laudo', 'perito judicial', 'pericia judicial', 'assistente tecnico', 'nomeacao', 'processo judicial'],
    resposta: 'Na perícia judicial, os quesitos orientam questões técnicas a serem respondidas dentro do objeto determinado. O laudo deve apresentar métodos, materiais examinados, limitações, fundamentação e conclusões proporcionais às evidências. Para assuntos específicos de um processo, procure o profissional responsável e os canais formais adequados.'
  },
  {
    titulo: 'Atuação e contato profissional',
    termos: ['contato', 'contratar', 'orcamento', 'atendimento', 'falar com daniel', 'daniel rosa', 'atuacao', 'cadastro', 'estados'],
    resposta: 'Para conhecer a atuação profissional de Daniel Rosa, consulte as seções “Atuação” e “Atuação Nacional” deste site. Para solicitar contato profissional, utilize a seção “Contato”. Este guia oferece informações educativas e não realiza atendimentos periciais individuais.'
  },
]

const PERGUNTAS = [
  'O que é cadeia de custódia digital?',
  'Como verificar a autenticidade de mensagens?',
  'O que são metadados de arquivos?',
  'É possível recuperar mensagens apagadas?',
]

const BOAS_VINDAS = 'Olá! Sou o Guia Forense, assistente interativo gratuito do site de Daniel Rosa. Posso apresentar explicações preparadas sobre perícia digital e evidências eletrônicas. Não sou uma IA generativa. Sobre qual assunto você gostaria de saber mais?'

function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim()
}

function responder(pergunta) {
  const entrada = normalizar(pergunta)
  if (/\b(invadir|hackear|espionar|roubar senha|acesso sem autorizacao)\b/.test(entrada)) {
    return 'Não posso orientar acesso não autorizado a contas, dispositivos ou informações. Posso explicar métodos legais de preservação e análise de evidências digitais.'
  }
  if (entrada.includes('assuntos') || entrada.includes('opcoes') || entrada.includes('menu')) {
    return `Posso explicar os seguintes temas:\n\n${ASSUNTOS.map(item => `• ${item.titulo}`).join('\n')}\n\nDigite o assunto que deseja conhecer.`
  }

  const opcoes = ASSUNTOS.map((assunto, indice) => ({
    indice,
    pontos: assunto.termos.reduce((total, termo) => {
      const chave = normalizar(termo)
      return total + (entrada.includes(chave) ? 1 + chave.split(' ').length : 0)
    }, 0),
  })).sort((a, b) => b.pontos - a.pontos)

  if (opcoes[0].pontos > 0) return ASSUNTOS[opcoes[0].indice].resposta

  return 'Ainda não tenho uma resposta preparada para essa pergunta. Posso explicar cadeia de custódia, hash, metadados, WhatsApp, capturas de tela, recuperação de dados, celulares, assinaturas digitais, logs e outros assuntos. Digite “assuntos” para ver a lista completa. Para analisar um caso concreto, procure atendimento profissional.'
}

export default function AssistenteForense() {
  const [aberto, setAberto] = useState(false)
  const [mensagens, setMensagens] = useState([{ role: 'assistant', content: BOAS_VINDAS }])
  const [pergunta, setPergunta] = useState('')
  const fim = useRef(null)
  const campo = useRef(null)

  useEffect(() => {
    if (aberto) fim.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [mensagens, aberto])

  function enviar(texto) {
    const conteudo = texto.trim()
    if (!conteudo || conteudo.length > 600) return
    setMensagens(lista => [
      ...lista,
      { role: 'user', content: conteudo },
      { role: 'assistant', content: responder(conteudo) },
    ])
    setPergunta('')
    campo.current?.focus()
  }

  return (
    <div className="dr-ai" aria-label="Guia Forense interativo">
      {aberto && (
        <section className="dr-ai-panel" aria-label="Conversa com o guia de perícia digital">
          <header className="dr-ai-header">
            <div className="dr-ai-avatar" aria-hidden="true">✦</div>
            <div className="dr-ai-heading">
              <strong>Guia Forense Interativo</strong>
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
                <button type="button" onClick={() => enviar('assuntos')}>Ver todos os assuntos</button>
              </div>
            )}
            <div ref={fim} />
          </div>
          <form className="dr-ai-form" onSubmit={evento => { evento.preventDefault(); enviar(pergunta) }}>
            <label className="dr-ai-sr-only" htmlFor="dr-ai-input">Digite sua pergunta</label>
            <textarea
              id="dr-ai-input"
              ref={campo}
              rows={2}
              maxLength={600}
              placeholder="Sua dúvida sobre perícia digital..."
              value={pergunta}
              onChange={evento => setPergunta(evento.target.value)}
              onKeyDown={evento => {
                if (evento.key === 'Enter' && !evento.shiftKey) {
                  evento.preventDefault()
                  enviar(pergunta)
                }
              }}
            />
            <button type="submit" aria-label="Enviar pergunta" disabled={!pergunta.trim()}>Enviar</button>
          </form>
          <p className="dr-ai-note">Guia educativo com respostas pré-programadas. Não é IA generativa. Não envie dados pessoais, sigilosos ou de processos. Não substitui perícia técnica.</p>
        </section>
      )}
      <button
        type="button"
        className="dr-ai-fab"
        aria-label={aberto ? 'Fechar guia de perícia digital' : 'Abrir guia de perícia digital'}
        aria-expanded={aberto}
        onClick={() => setAberto(atual => !atual)}
      >
        <span aria-hidden="true">{aberto ? '×' : '✦'}</span>
        {!aberto && <strong>Guia Forense</strong>}
      </button>
    </div>
  )
}
