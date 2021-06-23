import * as React from 'react'
import { useState, useEffect } from 'react'
import ReactMapGL from 'react-map-gl'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibmxzdG9tIiwiYSI6ImNrcGJ0eDZ0bzExMmwydm9ma2lwc211cTEifQ.NEjWhFL7Cxzmf3ctFDxmMw'

export default function Map() {
    const [viewport, setViewport] = useState({
        latitude: 37.0902,
        longitude: -95.7129,
        zoom: 2
    })

    return (
        <ReactMapGL
            {...viewport}
            width='65vw'
            height='50vh'
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle='mapbox://styles/mapbox/light-v9'
        />
    )
}
