import { useCallback, useEffect, useState } from 'react';
import {
  AppShell,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
  Select,
  Group,
  Button,
  TextInput,
  Divider,
} from '@mantine/core';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet'
import Pangani from './pangani';
import { Link } from "react-router-dom";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [lr, setLR] = useState("");
  const [feature, setFeature] = useState(null);
  const [data, setData] = useState(Pangani);

const handleData = () => {
    if(lr.trim() === ""){
        setData(Pangani);
     } else {
         let arr = [];
         for(let i=0; i<Pangani.features.length; i++){
             if(Pangani.features[i].properties.LR_NO.includes(lr)){
                 arr.push(Pangani.features[i]);
             }
         }
 
         let data2  = {
             "type": "FeatureCollection",
             "name": "pangani",
             "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
             "features": arr
         }
 
         setData(data2);
     }
}

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
    >
     <MapContainer center={[-1.268016323999973, 36.834168968000029]} style={{height: '100%', width: '100%'}} zoom={18}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
<GeoJSON data={data} style={(f) => {
    return {
        fillColor: "orange",
        fillOpacity: 1,
        opacity: 1
    }
}} onEachFeature={(f, l) => {
  l.bindPopup("<table><tr><td><strong>Owner</strong></td><td>"+f.properties.OWNER+"</td></tr><tr><td><strong>Type of Use</strong></td><td>"+f.properties.TYPE_OF_US+"</td></tr><tr><td><strong>LR_No</strong></td><td>"+f.properties.LR_NO+"</td></tr><tr><td><strong>Tenure</strong></td><td>"+f.properties.TENURE+"</td></tr><tr><td><strong>Area_HA</strong></td><td>"+f.properties.AREA_HA_.toFixed(2)+"</td></tr><tr><td><strong>Area_ACRES</strong></td><td>"+f.properties.AREA_ACRES.toFixed(2)+"</td></tr></table>");
  l.on("mouseover", function(e){
    e.target.setStyle({
      fillColor: "red",
    });
  });

  l.on("mouseout", function(e){
    e.target.setStyle({
      fillColor: "orange",
    });
  })
}} />

</MapContainer>
    </AppShell>
  );
}