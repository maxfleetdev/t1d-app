import { Button } from "@mantine/core"
import { Link } from "react-router"

interface NavigationButtonProps {
    to: string,
    buttonText: string
}

export function NavigationButton({to, buttonText}: NavigationButtonProps) {
    return (
        <Button 
            color="#2d4874"
            component={Link}
            to={to}
        >
            {buttonText}
        </Button>
    );
}

export default NavigationButton