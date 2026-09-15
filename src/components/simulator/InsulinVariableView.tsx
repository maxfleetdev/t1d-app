import { NumberInput } from "@mantine/core";

type InsulinVariableViewProps = {
    bolusUnits: number;
    bolusOffsetMinutes: number;
    onBolusUnitsChange: (value: number) => void;
    onBolusOffsetChange: (value: number) => void;
};

export default function InsulinVariableView({
    bolusUnits,
    bolusOffsetMinutes,
    onBolusUnitsChange,
    onBolusOffsetChange,
}: InsulinVariableViewProps) {
    return (
        <>
            <h3>Bolus</h3>
            <NumberInput
                label="Bolus units"
                description="Number of bolus (quick-acting) insulin units given"
                placeholder="1"
                value={bolusUnits}
                onChange={(value) => onBolusUnitsChange(Number(value) || 0)}
                min={0}
            />
            <NumberInput
                label="Bolus time"
                description="The offset time taken before a meal"
                placeholder="15"
                value={bolusOffsetMinutes}
                onChange={(value) => onBolusOffsetChange(Number(value) || 0)}
                min={0}
                max={240}
                step={15}
            />
        </>
    );
}