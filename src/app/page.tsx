"use client"
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveChoropleth } from '@nivo/geo'
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import lineData from './line_data.json'
import features from './features.geo.json'
import mapData from './map_data.json'

interface HistoricalFundUseProps {
  data: { id: string; data: { x: string; y: number }[] }[];
}

interface MediterraneanGeoMapProps {
  features: Feature[];
  data: { id: string; value: number }[];
}

const HistoricalFundUse = ({ data }: HistoricalFundUseProps) => (
  <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'year',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'amount',
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0
      }}
      enableGridX={false}
      enableGridY={false}
      // gridYValues={[2000, 3000, 4000]}
      colors={{ scheme: 'paired' }}
      pointSize={7}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={10}
      pointBorderColor={{ from: 'serieColor' }}
      // pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)


const MediterraneanGeoMap = ({ features, data }: MediterraneanGeoMapProps) => (
  <ResponsiveChoropleth
      data={data}
      features={features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="nivo"
      domain={[ 0, 1000000 ]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={400}
      projectionTranslation={[ 0.5, 0.5 ]}
      projectionRotation={[ 0, 0, 0 ]}
      enableGraticule={false}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
      // defs={[
      //     {
      //         id: 'dots',
      //         type: 'patternDots',
      //         background: 'inherit',
      //         color: '#38bcb2',
      //         size: 4,
      //         padding: 1,
      //         stagger: true
      //     },
      //     {
      //         id: 'lines',
      //         type: 'patternLines',
      //         background: 'inherit',
      //         color: '#eed312',
      //         rotation: -45,
      //         lineWidth: 6,
      //         spacing: 10
      //     },
      //     {
      //         id: 'gradient',
      //         type: 'linearGradient',
      //         colors: [
      //             {
      //                 offset: 0,
      //                 color: '#000'
      //             },
      //             {
      //                 offset: 100,
      //                 color: 'inherit'
      //             }
      //         ]
      //     }
      // ]}
      // fill={[
      //     {
      //         match: {
      //             id: 'CAN'
      //         },
      //         id: 'dots'
      //     },
      //     {
      //         match: {
      //             id: 'CHN'
      //         },
      //         id: 'lines'
      //     },
      //     {
      //         match: {
      //             id: 'ATA'
      //         },
      //         id: 'gradient'
      //     }
      // ]}
      legends={[
          {
              anchor: 'bottom-left',
              direction: 'column',
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemTextColor: '#444444',
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000000',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)


export default function Home() {
  return (
    <main className='h-screen'>
      <HistoricalFundUse data={lineData} />
      <MediterraneanGeoMap 
        features={features.features as Feature<Geometry, GeoJsonProperties>[]}
        data={mapData}
      />
    </main>
  );
}
