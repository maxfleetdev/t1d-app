import { ReferenceArea, ReferenceDot } from 'recharts';
import { LineChart } from '@mantine/charts';
import { ForkKnife, PersonSimpleRun, Syringe } from '@phosphor-icons/react';
import type { GlucosePoint, SimulationEventMarker } from '../simulator/simulateGlucose';

type ChartDemoProps = {
    data: GlucosePoint[];
};

function EventMarker({ event, index }: { event: SimulationEventMarker; index: number }) {
    const Icon = event.type === 'food' ? ForkKnife : event.type === 'insulin' ? Syringe : PersonSimpleRun;
    const color = event.type === 'food'
        ? 'var(--mantine-color-orange-4)'
        : event.type === 'insulin' ? 'var(--mantine-color-blue-4)' : 'var(--mantine-color-green-4)';

    return (
        <g transform={`translate(${index * 26 - 13}, -34)`}>
            <title>{event.label}</title>
            <circle cx="13" cy="13" r="11" fill="var(--mantine-color-dark-7)" stroke={color} strokeWidth="2" />
            <foreignObject x="4" y="4" width="18" height="18">
                <Icon size={18} color={color} weight="bold" />
            </foreignObject>
        </g>
    );
}

export function ChartDemo({ data }: ChartDemoProps) {
    return (
        <LineChart
            h="calc(90vh - 150px)"
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
            {data.flatMap((point) => (point.events ?? []).map((event, index) => (
                <ReferenceDot
                    key={`${point.time}-${event.type}-${index}`}
                    x={point.time}
                    y={point.Glucose}
                    r={0}
                    label={<EventMarker event={event} index={index} />}
                />
            )))}
        </LineChart>
    );
}