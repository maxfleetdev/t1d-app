import { NumberInput } from "@mantine/core";

export default function InsulinVariableView() {
    return (
        <>
            <h3>Bolus</h3>
            <NumberInput
                label="Bolus units"
                description="Number of bolus (quick-acting) insulin units given"
                placeholder="1"
                startValue={1}
                min={0}
            />
            <NumberInput
                label="Offset bolus time"
                description="The offset time taken before a meal"
                placeholder="15"
                startValue={15}
                min={0}
            />
        </>
    );
}