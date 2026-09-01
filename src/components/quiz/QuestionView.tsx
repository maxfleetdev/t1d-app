import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';

export type QuestionViewProps = {
    question: string;
    options: string[];
    answer: string;
    onSelected: (option: string) => void;
};

export type QuizQuestion = Omit<QuestionViewProps, 'onSelected'>;

export default function QuestionView({ question, options, onSelected: onOptionSelected }: QuestionViewProps) {
    const [indexSelected, setIndexSelected] = useState(-1);
    
    useEffect(() => {
        setIndexSelected(-1);
    }, [question, options]);

    function handleOptionSelected(option: string, index: number) {
        setIndexSelected(index);
        onOptionSelected(option);
    }
    
    return (
        <div>
            <h2>{question}</h2>
            <ul style={{listStyle: 'none', padding: '0px', margin: '0px'}}>
                {options.map((option, index) => (
                    <li key={index} style={{ marginBottom: '10px'}}>
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