import { Button } from "@mantine/core";
import { RabbitIcon } from "@phosphor-icons/react";

export default function Simulator() {
  return (
    <Button 
      color="yellow" 
      leftSection={<RabbitIcon/>}
    >
        Simulator
    </Button>
  );
}