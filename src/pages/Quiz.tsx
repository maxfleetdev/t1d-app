import { Button } from "@mantine/core";
import { RabbitIcon } from "@phosphor-icons/react";

export default function Quiz() {
  return (
    <Button 
      color="red" 
      leftSection={<RabbitIcon/>}
    >
        Quiz
    </Button>
  );
}