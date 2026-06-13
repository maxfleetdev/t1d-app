import { ReferenceArea } from 'recharts';
import { LineChart } from '@mantine/charts';
import { data } from './data';

export function ChartDemo() {
return (
    <LineChart
        h={300}
        data={data}
        dataKey="time"
        tooltipAnimationDuration={100}
        dotProps={{
          fill: "var(--mantine-color-green-9)",
        }}
        series={[
            { name: 'Glucose', label: 'Blood glucose', color:'blue' },
        ]}
        curveType="monotone"
        unit="mmol/L"
        datatype='time'
    >
        <ReferenceArea
            y1={3}
            fillOpacity={0.15}
            strokeOpacity={0}
            fill="var(--mantine-color-red-5)"
        />
        <ReferenceArea
            y1={4}
            y2={3}
            fillOpacity={0.15}
            strokeOpacity={0}
            fill="var(--mantine-color-yellow-5)"
        />
        <ReferenceArea
            y1={10}
            y2={4}
            fillOpacity={0.15}
            strokeOpacity={0}
            fill="var(--mantine-color-green-4)"
        />
        <ReferenceArea
            y1={13.4}
            y2={10}
            fillOpacity={0.15}
            strokeOpacity={0}
            fill="var(--mantine-color-yellow-4)"
        />
        <ReferenceArea
            y2={13.4}
            fillOpacity={0.15}
            strokeOpacity={0}
            fill="var(--mantine-color-orange-4)"
        />
    </LineChart>
);
}