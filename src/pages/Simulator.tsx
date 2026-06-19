import { Grid, ScrollAreaAutosize, Tabs } from "@mantine/core";
import { ChartDemo } from "../components/chart/ChartDemo";

export default function Simulator() {
  return (
    <Grid>
      <Grid.Col span={4}>
        <h2>Variables</h2>
        <Tabs variant="outline" defaultValue="insulin">
          <Tabs.List>
            <Tabs.Tab value="insulin">
              Insulin
            </Tabs.Tab>
            <Tabs.Tab value="food">
              Food
            </Tabs.Tab>
            <Tabs.Tab value="factors">
              Factors
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="insulin">
            Insulin tab content
          </Tabs.Panel>

          <Tabs.Panel value="food">
            Food tab content
          </Tabs.Panel>

          <Tabs.Panel value="factors">
            Factors tab content
          </Tabs.Panel>
        </Tabs>
      </Grid.Col>
      <Grid.Col span="auto">
        <h2>Simulator</h2>
        <ChartDemo/>
      </Grid.Col>
    </Grid>
  );
}