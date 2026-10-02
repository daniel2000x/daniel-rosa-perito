import { useEffect, useMemo, useState } from 'react'

import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps'

import { geoMercator } from 'd3-geo'

import {
  estadosSemCadastro,
  periciasAtivas,
} from '../data/pericias'


const geoUrl =
  'https://cdn.jsdelivr.net/gh/henriquemalvar/br-geojson@main/dist/estados.geojson'


function corrigirGeometria(geometry) {
  if (!geometry) {
    return geometry
  }

  if (geometry.type === 'Polygon') {
    return {
      ...geometry,

      coordinates: geometry.coordinates.map((ring) =>
        [...ring].reverse()
      ),
    }
  }

  if (geometry.type === 'MultiPolygon') {
    return {
      ...geometry,

      coordinates: geometry.coordinates.map((polygon) =>
        polygon.map((ring) =>
          [...ring].reverse()
        )
      ),
    }
  }

  return geometry
}


function prepararGeoJSONParaD3(data) {
  return {
    ...data,

    features: data.features.map((feature) => ({
      ...feature,

      geometry: corrigirGeometria(
        feature.geometry
      ),
    })),
  }
}


function BrazilMap({
  onEstadoChange,
  estadoSelecionado,
}) {
  const [geoData, setGeoData] = useState(null)
  const [erro, setErro] = useState(false)


  useEffect(() => {
    fetch(geoUrl)

      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Não foi possível carregar o mapa.'
          )
        }

        return response.json()
      })

      .then((data) => {
        const dataCorrigida =
          prepararGeoJSONParaD3(data)

        setGeoData(dataCorrigida)
      })

      .catch((error) => {
        console.error(
          'Erro ao carregar mapa:',
          error
        )

        setErro(true)
      })
  }, [])


  const projection = useMemo(() => {
    if (!geoData) {
      return null
    }

    return geoMercator().fitExtent(
      [
        [40, 30],
        [760, 570],
      ],

      geoData
    )
  }, [geoData])


  if (erro) {
    return (
      <div className="map-status">
        Não foi possível carregar o mapa do Brasil.
      </div>
    )
  }


  if (!geoData || !projection) {
    return (
      <div className="map-status">
        Carregando mapa do Brasil...
      </div>
    )
  }


  return (
    <div className="brazil-map">

      <ComposableMap
        width={800}
        height={600}
        projection={projection}
        aria-label="Mapa interativo do Brasil"
      >

        <Geographies geography={geoData}>

          {({ geographies }) =>
            geographies.map((geo) => {

              const sigla =
                geo.properties?.sigla

              const nome =
                geo.properties?.nome


              const semCadastro =
                estadosSemCadastro.includes(sigla)


              const possuiNomeacoes =
                Boolean(
                  periciasAtivas[sigla]?.cidades?.length
                )


              let statusClass =
                'state-registered'


              if (semCadastro) {
                statusClass =
                  'state-unregistered'
              }

              else if (possuiNomeacoes) {
                statusClass =
                  'state-active'
              }


              const selecionado =
                estadoSelecionado?.sigla === sigla


              return (
                <Geography
                  key={sigla || geo.rsmKey}

                  geography={geo}

                  className={
                    `brazil-state ${statusClass} ${
                      selecionado
                        ? 'state-selected'
                        : ''
                    }`
                  }

                  onMouseEnter={() => {
                    onEstadoChange({
                      sigla,
                      nome,
                    })
                  }}

                  onClick={() => {
                    onEstadoChange({
                      sigla,
                      nome,
                    })
                  }}

                  aria-label={nome}

                  tabIndex={0}
                />
              )
            })
          }

        </Geographies>

      </ComposableMap>


      <div className="map-legend">

        <div>
          <span className="legend-color active"></span>
          Nomeações recebidas
        </div>

        <div>
          <span className="legend-color registered"></span>
          Cadastrado para atuação
        </div>

        <div>
          <span className="legend-color unavailable"></span>
          Sem cadastro informado
        </div>

      </div>

    </div>
  )
}


export default BrazilMap