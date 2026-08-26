import { useState } from 'react';
import QuestionView from "./QuestionView";
import type { QuizQuestion } from "./QuestionView";
import { Button } from '@mantine/core';

const questions: QuizQuestion[] = [
    {
        question: "What is the capital of France?",
        options: ["Moscow", "Madrid", "Paris", "Rome"],
        answer: "Paris",
    },
    {
        question: "What is the capital of Germany?",
        options: ["Berlin", "London", "Lebanon", "Tokyo"],
        answer: "Berlin",
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

    return(
        <div>
            <QuestionView {...currentQuestion} onSelected={setSelectedOption} />
            <Button onClick={handleSubmitAnswer}>Submit</Button>
            <Button onClick={handleNextQuestion} disabled={!isSubmitted}>Next</Button>
            <div>
                <p>{message}</p>
            </div>
        </div>
    );
}