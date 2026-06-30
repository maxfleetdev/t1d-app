import { Grid, Tabs } from "@mantine/core";
import { ChartDemo } from "../components/chart/ChartDemo";
import InsulinVariableView from "../components/simulator/InsulinVariableView";
import FoodVariableView from "../components/simulator/FoodVariableView";

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
            <InsulinVariableView/>
          </Tabs.Panel>

          <Tabs.Panel value="food">
            <FoodVariableView/>
          </Tabs.Panel>

          <Tabs.Panel value="factors">
            Other factors
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