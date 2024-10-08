"use client"
import { useRef } from 'react'
import { MapPin } from 'lucide-react';
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, Popup, useMap } from 'react-leaflet'
import { ResponsiveBar, BarDatum } from '@nivo/bar'
import { ResponsiveLine, Serie } from '@nivo/line'
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { ResponsiveChoropleth } from '@nivo/geo'
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import barData from './bar_data.json'
import circleData from './circle_data.json'
import lineData from './line_data.json'
import leafletData from './leaflet_data.json'
import mapData from './map_data.json'
import features from './med.geo.json'
import 'leaflet/dist/leaflet.css';


interface RecoveryByMonthBarProps {
  data: BarDatum[]
}

interface CircleNode {
  name: string;
  color: string;
  children?: CircleNode[];
}

interface RecoveryByPortCirclePackProps {
  data: CircleNode;
}

interface HistoricalFundUseLineProps {
  data: Serie[]
}

interface MediterraneanGeoMapProps {
  features: Feature[];
  data: { id: string; value: number }[];
}


const RecoveryByMonthBar = ({ data }: RecoveryByMonthBarProps) => (
  <ResponsiveBar
      data={data}
      keys={[
          'Fishing For Litter',
          'Prevention',
          'Beach',
          'Diving'
      ]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'paired' }}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      fill={[
          {
              match: {
                  id: 'fries'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'sandwich'
              },
              id: 'lines'
          }
      ]}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  1.6
              ]
          ]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'month',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'kilos',
          legendPosition: 'middle',
          legendOffset: -55,
          truncateTickAt: 0
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  1.6
              ]
          ]
      }}
      legends={[
          {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
  />
)

const RecoveryByPortCirclePack = ({ data }: RecoveryByPortCirclePackProps) => (
  <ResponsiveCirclePacking
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      // height="700px"
      id="name"
      value="loc"
      colors={{ scheme: 'paired' }}
      childColor={{
          from: 'color',
          modifiers: [
              [
                  'brighter',
                  0.4
              ]
          ]
      }}
      padding={4}
      enableLabels={true}
      labelsFilter={n=>2===n.node.depth}
      labelsSkipRadius={10}
      labelTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  2
              ]
          ]
      }}
      borderWidth={1}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.5
              ]
          ]
      }}
      defs={[
          {
              id: 'lines',
              type: 'patternLines',
              background: 'none',
              color: 'inherit',
              rotation: -45,
              lineWidth: 5,
              spacing: 8
          }
      ]}
      fill={[
          {
              match: {
                  depth: 1
              },
              id: 'lines'
          }
      ]}
  />
)

const HistoricalFundUseLine = ({ data }: HistoricalFundUseLineProps) => (
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
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          legend: 'year',
          legendOffset: 40,
          legendPosition: 'middle',
          truncateTickAt: 0
      }}
      axisLeft={{
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          legend: 'amount',
          legendOffset: -50,
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

const LeafletMap = () => {
  const mapRef = useRef(null)
  return (
    <MapContainer className='h-full z-0' center={[38.32217739504656, 23.952204640936014]} zoom={7} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {leafletData.map(location => {
        const customIcon = new Icon({
          iconUrl: 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="${location.color}"><circle cx="5" cy="5" r="5"></circle></svg>`),
          iconSize: [16, 16], 
          // iconAnchor: [5, 5], // Point of the icon which will correspond to marker's location
          // popupAnchor: [0, -5] // Point from which the popup should open relative to the iconAnchor
        });
        return (
          <Marker key={location.name} position={[location.latitude, location.longitude]} icon={customIcon}>
            <Tooltip>
              <div>
                <div>{location.name}</div>
                <div className='flex gap-1 items-center'>
                <div className='h-3 w-3' style={{ backgroundColor: `${location.color}` }}></div>
                  <div>{location.category}: {location.kg}kg</div>
                </div>
              </div>  
            </Tooltip>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

const LeafletLegend = () => {
  const legendData = [
    { color: '#a6cee3', label: 'Fishing for Litter' },
    { color: '#1f78b4', label: 'Prevention' },
    { color: '#33a02c', label: 'Diving' },
    { color: '#b2df8a', label: 'Beach' },
  ];

  return (
    <div className='absolute bottom-0 left-0 z-10 bg-white p-10' >
      {legendData.map((item, index) => (
        <div key={index} className='flex gap-1 mb-1'>
          <div className='h-5 w-5' style={{ backgroundColor: `${item.color }`}}></div>
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
};


export default function Home() {
  return (
    <main className='h-screen w-screen'>
      <article className='h-[400px] w-full my-32 px-16'>
        <RecoveryByMonthBar data={barData} />
      </article>
      <article className='h-[800px] w-[800px] m-auto'>
        <RecoveryByPortCirclePack data={circleData} />
      </article>
      <article className='h-[400px] w-full my-32 px-16'>
        <HistoricalFundUseLine data={lineData} />
      </article>
      <article className='h-[800px] w-[1200px] m-auto relative'>
        <LeafletMap />
        <LeafletLegend />
      </article>

      {/* <article className='h-[800px] w-[800px]'>
        <MediterraneanGeoMap 
          features={features.features as Feature<Geometry, GeoJsonProperties>[]}
          data={mapData}
        />
      </article> */}
    </main>
  );
}
