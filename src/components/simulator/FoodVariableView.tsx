import { Select, NumberInput } from "@mantine/core";

type FoodVariableViewProps = {
    glycemicIndex: "fast" | "medium" | "slow";
    foodCarbs: number;
    foodOffsetMinutes: number;
    onGlycemicIndexChange: (value: "fast" | "medium" | "slow") => void;
    onFoodCarbsChange: (value: number) => void;
    onFoodOffsetChange: (value: number) => void;
};

export default function FoodVariableView({
    glycemicIndex,
    foodCarbs,
    foodOffsetMinutes,
    onGlycemicIndexChange,
    onFoodCarbsChange,
    onFoodOffsetChange,
}: FoodVariableViewProps) {
    return (
        <>
            <h3>Food</h3>
            <Select
                label="Glycemic Index"
                data={[{ value: "fast", label: "Fast" }, { value: "medium", label: "Medium" }, { value: "slow", label: "Slow" }]}
                value={glycemicIndex}
                onChange={(value) => {
                    if (value === "fast" || value === "medium" || value === "slow") {
                        onGlycemicIndexChange(value);
                    }
                }}
            />
            <NumberInput
                label="Meal carbohydrates (grams)"
                description="Number of carbohydrates in grams"
                placeholder="20"
                value={foodCarbs}
                onChange={(value) => onFoodCarbsChange(Number(value) || 0)}
                min={0}
            />
            <NumberInput
                label="Meal time"
                description="Minutes from the start of the simulation"
                value={foodOffsetMinutes}
                onChange={(value) => onFoodOffsetChange(Number(value) || 0)}
                min={0}
                max={240}
                step={15}
            />
        </>
    );
}