import React from 'react';
import { Button } from '@mantine/core';

type QuestionViewProps = {
    question: string;
    options: string[];
    answer: string;
    onAnswerSelected: (answer: string) => void;
};

export default function QuestionView({ question, options, answer, onAnswerSelected }: QuestionViewProps) {
    
    
    return (
        <div>
            <h2>{question}</h2>
            <ul>
                {options.map((option, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <Button onClick={() => onAnswerSelected(option)}>{option}</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}