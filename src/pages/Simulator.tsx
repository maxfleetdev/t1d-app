import { Grid, NumberInput, Stack, Tabs } from "@mantine/core";
import { useState } from "react";
import { ChartDemo } from "../components/chart/ChartDemo";
import InsulinVariableView from "../components/simulator/InsulinVariableView";
import FoodVariableView from "../components/simulator/FoodVariableView";
import { simulateGlucose } from "../components/simulator/simulateGlucose";
import type { SimulationProfile } from "../components/simulator/SimulationProfile";

export default function Simulator() {
  const [initialGlucose, setInitialGlucose] = useState(6);
  const [bolusUnits, setBolusUnits] = useState(1);
  const [bolusOffsetMinutes, setBolusOffsetMinutes] = useState(0);
  const [foodCarbs, setFoodCarbs] = useState(40);
  const [foodOffsetMinutes, setFoodOffsetMinutes] = useState(0);
  const [glycemicIndex, setGlycemicIndex] = useState<"fast" | "medium" | "slow">("medium");

  const simulationProfile: SimulationProfile = {
    profile: {
      basalRate: 0.8,
      insulinToCarbRatio: 10,
      insulinSensitivity: 2.5,
      insulinActionTime: 4,
    },
    initialState: { glucose: initialGlucose, cob: 0, iob: 0 },
    simulatorEvents: [
      { eventType: "food", glycemicIndex, foodCarbs, offsetMinutes: foodOffsetMinutes },
      { eventType: "insulin", units: bolusUnits, offsetMinutes: bolusOffsetMinutes },
    ],
  };

  return (
    <Grid>
      <Grid.Col span={4}>
        <h2>Variables</h2>
        <Stack gap="sm" mb="md">
          <NumberInput
            label="Starting glucose"
            description="Starting blood glucose in mmol/L"
            value={initialGlucose}
            onChange={(value) => setInitialGlucose(Number(value) || 0)}
            min={2}
            max={30}
            decimalScale={1}
          />
        </Stack>
        <Tabs variant="outline" defaultValue="insulin">
          <Tabs.List>
            <Tabs.Tab value="insulin">
              Insulin
            </Tabs.Tab>
            <Tabs.Tab value="food">
              Food
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="insulin">
            <InsulinVariableView
              bolusUnits={bolusUnits}
              bolusOffsetMinutes={bolusOffsetMinutes}
              onBolusUnitsChange={setBolusUnits}
              onBolusOffsetChange={setBolusOffsetMinutes}
            />
          </Tabs.Panel>

          <Tabs.Panel value="food">
            <FoodVariableView
              glycemicIndex={glycemicIndex}
              foodCarbs={foodCarbs}
              foodOffsetMinutes={foodOffsetMinutes}
              onGlycemicIndexChange={setGlycemicIndex}
              onFoodCarbsChange={setFoodCarbs}
              onFoodOffsetChange={setFoodOffsetMinutes}
            />
          </Tabs.Panel>
        </Tabs>
      </Grid.Col>

      <Grid.Col span="auto">
        <h2>Glucose Simulator</h2>
        <ChartDemo data={simulateGlucose(simulationProfile)} />
      </Grid.Col>
    </Grid>
  );
}