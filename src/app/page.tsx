"use client"
import { ResponsiveGeoMap } from '@nivo/geo'
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import features from './features.geo.json'

interface MediterraneanGeoMapProps {
  features: Feature[];
}

const MediterraneanGeoMap = ({ features }: MediterraneanGeoMapProps) => (
  <ResponsiveGeoMap
      features={features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      projectionTranslation={[ 0.5, 0.5 ]}
      projectionRotation={[ 0, 0, 0 ]}
      fillColor="#eeeeee"
      borderWidth={0.5}
      borderColor="#333333"
      enableGraticule={false}
      graticuleLineColor="#666666"
  />
)

export default function Home() {
  return (
    <main className='h-screen'>
      <MediterraneanGeoMap features={features.features as Feature<Geometry, GeoJsonProperties>[]}/>
    </main>
  );
}
