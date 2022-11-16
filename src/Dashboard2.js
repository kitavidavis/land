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
import { useParams, Link } from "react-router-dom";

export default function Dashboard2() {
  const { lr } = useParams();
  const theme = useMantineTheme();
  const [feature, setFeature] = useState(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    if(lr !== null){
        let arr = [];
        for (let i=0; i<Pangani.features.length; i++){
            if(Pangani.features[i].properties.LR_NO === lr){
                arr.push(Pangani.features[i]);
            }
        }

          setData(arr);
    }
  }, []);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 400, lg: 400 }}>
            <Group mb={30} position='left'>
            <Button variant='subtle' component={Link} to="/" >Go Back</Button>
            </Group>
            {feature !== null ? (
                <>
            <Text>{`LR Number: ${lr}`}</Text>
                </>
            ) : (
                <Text>No dataset found</Text>
            )}
          </Aside>
        </MediaQuery>
      }
    >
     <MapContainer center={[-1.268016323999973, 36.834168968000029]} style={{height: '100%', width: '100%'}} zoom={18}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
<GeoJSON  data={data} style={(f) => {
    return {
        fillColor: "orange",
        fillOpacity: 1,
        opacity: 1
    }
}} />

</MapContainer>
    </AppShell>
  );
}