import QuestionView from "../components/quiz/QuestionView";

export default function Quiz() {
  // 1. List of questions
  // 2. User answers
  // 3. Cache each question-answer index locally (e.g. Question ID:1, Answer ID:4)
  // 4. Once complete, submit answers to database with user's ID and quiz results
  return (
    <div>
      <QuestionView
        question="What is the capital of France?"
        options={["Berlin", "Madrid", "Paris", "Rome"]}
        answer="Paris"
        onAnswerSelected={(answer) => console.log("Selected answer:", answer)}
      />
    </div>
  );
}