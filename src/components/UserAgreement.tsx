import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function UserAgreement() {
    const [opened, { open, close }] = useDisclosure(true);
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const NULL_MESSAGE = "Must enter your name";

    function Submit() {
        if (name === "") {
            setError(NULL_MESSAGE);
            return;
        }
        close()
        // API create row
    }

    function InputChanged(value: string) {
        setName(value);
        if (value === "") {
            setError(NULL_MESSAGE);
        }
        else {
            setError("");
        }
    }

    // Check if current session has user agreed, store in cookie/cache
    return (
    <>
        <Button onClick={open}>Press Me</Button>
        <Modal 
            opened={opened}
            onClose={close}
            size="xl" 
            title="User Agreement" 
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            withCloseButton={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
        >
            <Group>
                <Text>
                    This application is not a medical tool, and is not intended to
                    be used to replace proffessional medical advice.
                </Text>
                <TextInput
                    placeholder="John Smith"
                    label="Your name"
                    leftSection={<UserIcon/>}
                    value={name}
                    onChange={(e) => InputChanged(e.currentTarget.value)}
                    required
                    error={error}
                />
            </Group>
            <Group justify="flex-end">
                <Button 
                    onClick={Submit}
                    color="blue"
                    disabled={name === ""}
                >
                    I agree
                </Button>
            </Group>
        </Modal>
    </>
    );
}