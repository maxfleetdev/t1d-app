import { Grid } from '@mantine/core';
import { Outlet } from 'react-router';
import ModuleList from '../components/learning/ModuleList';

export default function Learn() {
  return (
    <Grid p="md">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <ModuleList />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 9 }}>
        <Outlet />
      </Grid.Col>
    </Grid>
  );
}
