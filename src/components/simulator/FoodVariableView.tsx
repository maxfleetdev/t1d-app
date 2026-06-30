import { Select, NumberInput } from "@mantine/core";

export default function FoodVariableView() {
    return (
        <>
            <h3>Food</h3>
            <Select
                label="Glycemic Index"
                data={["Fast (1.0)", "Medium (0.5)", "Slow (0.1)"]}
                placeholder="Pick a value"
            />
            <NumberInput
                label="Meal carbohydrates (grams)"
                description="Number of carbohydrates in grams"
                placeholder="20"
                startValue={20}
                min={0}
            />
        </>
    );
}