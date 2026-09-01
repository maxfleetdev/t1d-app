import { useState } from 'react';
import QuestionView from "./QuestionView";
import type { QuizQuestion } from "./QuestionView";
import { Button } from '@mantine/core';

const questions: QuizQuestion[] = [
    {
        question: "1. What is the mmol/L of hypoglycemia?",
        options: ["5 mmol/L", "8 mmol/L", "4 mmol/L", "6 mmol/L"],
        answer: "4 mmol/L",
    },
    {
        question: "2. What is the recommended treatment of a hypo (>4 mmol/L)?",
        options: ["Chocolate cake", "Fast acting glucose", "Toast", "Mars bar"],
        answer: "Fast acting glucose",
    },
    {
        question: "2. What is the recommended treatment of a hypo (>4 mmol/L)?",
        options: ["Chocolate cake", "Fast acting glucose", "Toast", "Mars bar"],
        answer: "Fast acting glucose",
    },
    {
        question: "3. What is the typical mmol/L of hyperglycemia?",
        options: ["11 mmol/L", "7 mmol/L", "9 mmol/L", "6 mmol/L"],
        answer: "11 mmol/L",
    },
];

export default function QuizList() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [message, setMessage] = useState("");

    const currentQuestion = questions[currentQuestionIndex];

    /**
     * Sets the selected option as the State's current option
     * @returns null
     */
    function handleSubmitAnswer() {
        if (selectedOption == "") {
            setMessage("You must select an answer.")
            return;
        }
        // Only increase score if answer is correct
        if (currentQuestion.answer == selectedOption) {
            setCurrentScore(currentScore + 1);
        }

        // Submit answer and move to next question
        setIsSubmitted(true);
    }

    /**
     * Increments the question index to show the next question, and resets State variables
     * @returns null
     */
    function handleNextQuestion() {
        // Reset question variables
        setSelectedOption("");
        setMessage("");
        setIsSubmitted(false);

        // Increment question index, showing next question
        setCurrentQuestionIndex((index) => index + 1);
    }

    if (!currentQuestion) {
        return <p>Quiz complete. You answered {currentScore} of {questions.length} questions correct.</p>;
    }

    return (
        <div>
            <QuestionView 
                key={currentQuestionIndex} 
                {...currentQuestion} 
                onSelected={setSelectedOption} 
            />
            <div style={{marginTop: '50px'}}>
                <Button onClick={handleSubmitAnswer}>Submit</Button>
                <Button onClick={handleNextQuestion} disabled={!isSubmitted}>Next</Button>
            </div>
            <div>
                <p>{message}</p>
            </div>
        </div>
    );
}