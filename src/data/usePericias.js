
import { useEffect, useState } from 'react'

import {
  periciasAtivas as dadosLocais,
} from './pericias'

export default function usePericias() {

  const [pericias, setPericias] =
    useState(dadosLocais)

  useEffect(() => {

    const url =
      import.meta.env.VITE_RADAR_PUBLIC_URL

    const chave =
      import.meta.env.VITE_RADAR_PUBLIC_KEY

    if (!url || !chave) return

    const controller = new AbortController()

    let carregando = false

    async function atualizarPericias() {

      if (carregando || document.hidden) return

      carregando = true

      try {

        const endereco = new URL(
          '/rest/v1/radar_mapa_nomeacoes',
          url
        )

        endereco.search = new URLSearchParams({
          select: 'estado,cidade,quantidade,varas',
          order: 'estado.asc,cidade.asc',
        }).toString()

        const resposta = await fetch(endereco, {
          headers: {
            apikey: chave,
          },
          signal: controller.signal,
          cache: 'no-store',
        })

        if (!resposta.ok) return

        const dados = await resposta.json()

        if (!Array.isArray(dados) || !dados.length) {
          return
        }

        const resultado = {}

        for (const item of dados) {

          if (!resultado[item.estado]) {

            resultado[item.estado] = {
              estado:
                dadosLocais[item.estado]?.estado ||
                item.estado,
              cidades: [],
            }

          }

          resultado[item.estado].cidades.push({
            nome: item.cidade,
            quantidade: item.quantidade,
            varas: item.varas || [],
          })

        }

        if (!controller.signal.aborted) {

          setPericias(anterior =>

            JSON.stringify(anterior) ===
            JSON.stringify(resultado)
              ? anterior
              : resultado

          )

        }

      } catch (erro) {

        if (!controller.signal.aborted) {
          console.error(
            'Erro ao sincronizar nomeações:',
            erro
          )
        }

      } finally {

        carregando = false

      }

    }

    atualizarPericias()

    const intervalo = setInterval(
      atualizarPericias,
      60000
    )

    document.addEventListener(
      'visibilitychange',
      atualizarPericias
    )

    return () => {

      controller.abort()

      clearInterval(intervalo)

      document.removeEventListener(
        'visibilitychange',
        atualizarPericias
      )

    }

  }, [])

  return pericias

}
