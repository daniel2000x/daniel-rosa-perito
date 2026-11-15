/**
 * Endpoint server-side para Vercel. NÃO coloque a chave da API no React.
 * Configure OPENAI_API_KEY nas Environment Variables da Vercel.
 * Antes de publicar, configure limites de gasto e proteção contra abuso no provedor.
 */
export const maxDuration = 30

const INSTRUCOES = `Você é o Assistente Forense IA, assistente virtual educativo do site profissional de Daniel Rosa, perito judicial em Tecnologia da Informação.
Responda sempre em português brasileiro, com linguagem técnica acessível, cortês, objetiva e adequada a magistrados, servidores, advogados e público geral.
Escopo: perícia digital, computação forense, cadeia de custódia, hashing, metadados, autenticidade de documentos eletrônicos, logs, rastreabilidade, smartphones, armazenamento, evidências digitais, assinaturas e procedimentos periciais.
Explique limitações técnicas e a necessidade de examinar evidências concretas. Quando houver incerteza, diga claramente; não invente jurisprudência, normas, resultados de perícia, nomeações, qualificações ou fatos sobre Daniel Rosa.
Nunca se apresente como o próprio Daniel ou como perito humano. Você não substitui laudo, perícia efetiva, orientação jurídica nem decisão judicial.
Não solicite nem analise documentos sigilosos, credenciais, dados pessoais de terceiros ou conteúdo de processos judiciais. Se o usuário tentar compartilhar, oriente a não enviar.
Não ofereça instruções operacionais para acesso não autorizado, invasão de dispositivos, violação de privacidade ou ocultação de provas.
Para atendimento profissional, sugira utilizar a área Contato do site.
Prefira respostas curtas (de 1 a 3 parágrafos), sem listas longas, e faça uma pergunta de continuação quando útil.`

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

export async function POST(request) {
  const origem = request.headers.get('origin')
  if (origem && origem !== new URL(request.url).origin) {
    return json({ error: 'Origem não permitida.' }, 403)
  }
  if (!process.env.OPENAI_API_KEY) {
    return json({ error: 'Assistente ainda não configurado pelo administrador.' }, 503)
  }

  const tamanho = Number(request.headers.get('content-length') || 0)
  if (tamanho > 12000) return json({ error: 'Mensagem muito longa.' }, 413)

  let payload
  try {
    const bruto = await request.text()
    if (bruto.length > 12000) return json({ error: 'Mensagem muito longa.' }, 413)
    payload = JSON.parse(bruto)
  } catch {
    return json({ error: 'Requisição inválida.' }, 400)
  }

  const mensagem = typeof payload?.message === 'string' ? payload.message.trim() : ''
  if (!mensagem || mensagem.length > 600) {
    return json({ error: 'Digite uma pergunta com até 600 caracteres.' }, 400)
  }

  const historico = Array.isArray(payload.history)
    ? payload.history.slice(-8)
      .filter(item => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
      .map(item => ({ role: item.role, content: item.content.slice(0, 600) }))
    : []

  const controlador = new AbortController()
  const limite = setTimeout(() => controlador.abort(), 22000)

  try {
    const api = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      signal: controlador.signal,
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-6-luna',
        reasoning: { effort: 'none' },
        instructions: INSTRUCOES,
        input: [...historico, { role: 'user', content: mensagem }],
        max_output_tokens: 450,
        store: false,
      }),
    })

    if (!api.ok) {
      // Não exponha mensagens internas do provedor da API ao visitante.
      return json({ error: 'Não foi possível responder agora. Tente novamente.' }, 502)
    }

    const dados = await api.json()
    const resposta = (dados.output || [])
      .flatMap(item => Array.isArray(item.content) ? item.content : [])
      .filter(item => item.type === 'output_text' && typeof item.text === 'string')
      .map(item => item.text)
      .join('\n')
      .trim()

    if (!resposta) return json({ error: 'Nenhuma resposta disponível. Tente reformular sua pergunta.' }, 502)
    return json({ answer: resposta })
  } catch {
    return json({ error: 'Serviço temporariamente indisponível. Tente novamente.' }, 503)
  } finally {
    clearTimeout(limite)
  }
}

export function GET() {
  return json({ error: 'Método não permitido.' }, 405)
}
