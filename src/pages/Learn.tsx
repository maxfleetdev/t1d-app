import { Button } from "@mantine/core";
import { RabbitIcon } from "@phosphor-icons/react";

export default function Learn() {
  return (
    <Button 
      color="blue" 
      leftSection={<RabbitIcon/>}
    >
        Learn
    </Button>
  );
}