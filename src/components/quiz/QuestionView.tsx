import { Button } from '@mantine/core';
import { useState } from 'react';

export type QuestionViewProps = {
    question: string;
    options: string[];
    answer: string;
    onSelected: (option: string) => void;
};

export type QuizQuestion = Omit<QuestionViewProps, 'onSelected'>;

export default function QuestionView({ question, options, onSelected: onOptionSelected }: QuestionViewProps) {
    const [indexSelected, setIndexSelected] = useState(-1);
    
    function handleOptionSelected(option: string, index: number) {
        setIndexSelected(index);
        onOptionSelected(option);
    }
    
    return (
        <div>
            <h2>{question}</h2>
            <ul>
                {options.map((option, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <Button 
                            onClick={() => handleOptionSelected(option, index)}
                            variant={indexSelected == index ? 'filled': 'default'}>
                                {option}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}