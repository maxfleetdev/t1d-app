import { Button } from "@mantine/core";
import { RabbitIcon } from "@phosphor-icons/react";

export default function Home() {
  return (
    <Button 
      color="green" 

      leftSection={<RabbitIcon/>}
    >
        Home Test Button
    </Button>
  );
}