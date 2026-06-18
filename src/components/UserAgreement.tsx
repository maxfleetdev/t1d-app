import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";

interface UserAgreementProps {
    onAgree: () => void;
}

export default function UserAgreement({onAgree}: UserAgreementProps) {
    const [opened, { close }] = useDisclosure(true);
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const NULL_MESSAGE = "Must enter your name";

    async function Submit() {
        if (name === "") {
            setError(NULL_MESSAGE);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/agree', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });

            if (!response.ok) {
                throw new Error('Failed to save agreement');
            }

            const data = await response.json();
            console.log("User saved with ID:", data.userId);
            
            // You might want to save this userId in useLocalStorage too, 
            // so you can attach it to their future quiz scores!

            close();
            onAgree(); 
        } catch (err) {
            console.error(err);
            setError("Network error. Please try again.");
        }
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
                    be used to replace professional medical advice.
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