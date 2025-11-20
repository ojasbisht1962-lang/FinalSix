import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../QuestionCard';
import Loader from '../Loader';
import API_CONFIG from '../../config/api';

const QuizPage = () => {
    console.log("🔥 QuizPage component loaded!");
    
    const [classLevel, setClassLevel] = useState(null);
    const [stream, setStream] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    console.log("🔥 QuizPage state:", { classLevel, stream, questions: questions.length });

    useEffect(() => {
        const fetchQuestions = async () => {
            console.log("=== QUIZ DEBUG ===");
            console.log("classLevel:", classLevel);
            console.log("stream:", stream);
            console.log("Should fetch questions?", classLevel && (classLevel === 'below-10' || stream));
            
            setLoading(true);
            const params = { class_level: classLevel };
            if (classLevel === '10th-pass' && stream) {
                params.stream = stream;
            }
            const url = API_CONFIG.getUrlWithParams(API_CONFIG.ENDPOINTS.QUIZ_QUESTIONS, params);
            console.log("API URL:", url);
            
            try {
                console.log("Making API request...");
                const response = await axios.get(url);
                console.log("API Response:", response.data);
                console.log("Questions received:", response.data.questions);
                console.log("Questions length:", response.data.questions ? response.data.questions.length : 0);
                setQuestions(response.data.questions);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setLoading(false);
            }
        };

        console.log("useEffect triggered. classLevel:", classLevel, "stream:", stream);
        if (classLevel && (classLevel === 'below-10' || stream)) {
            fetchQuestions();
        }
    }, [classLevel, stream]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!answers[currentQuestion.id]) {
            setError('Please select an option before proceeding.');
            return;
        }
        setError('');
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handleSubmitQuiz = async () => {
        const lastQuestion = questions[currentQuestionIndex];
        if (!answers[lastQuestion.id]) {
            setError('Please select an option before submitting.');
            return;
        }

        try {
            const payload = {
                user_id: userId,
                class_level: classLevel,
                stream: stream,
                answers: Object.entries(answers).map(([question_id, answer]) => ({ question_id, answer })),
            };
            await axios.post(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.SUBMIT_ANSWERS), payload);
            navigate(`/suggestions?user_id=${userId}`);
        } catch (error) {
            console.error("Failed to submit answers:", error);
            alert("Failed to submit answers. Please try again.");
        }
    };

    const progressPercentage = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader />
                <p className="mt-4 text-gray-700">Loading your questions...</p>
            </div>
        );
    }

    if (!classLevel) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Are you Class 10th pass?</h2>
                    <div className="space-x-4">
                        <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700" onClick={() => {
                            console.log("🔥 Clicked YES - 10th pass");
                            setClassLevel('10th-pass');
                        }}>Yes</button>
                        <button className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700" onClick={() => {
                            console.log("🔥 Clicked NO - below 10");
                            setClassLevel('below-10');
                        }}>No</button>
                    </div>
                </div>
            </div>
        );
    }

    if (classLevel === '10th-pass' && !stream) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Please select your stream:</h2>
                    <div className="space-x-4">
                        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => setStream('science')}>Science</button>
                        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => setStream('commerce')}>Commerce</button>
                        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => setStream('arts')}>Arts</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 max-w-2xl">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                {questions.length > 0 && (
                    <>
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <span>{Math.round(progressPercentage)}% Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question Section */}
                        <div className="text-center mb-8">
                            {/* BIG DEBUG BANNER */}
                            <div style={{
                                backgroundColor: 'red',
                                color: 'white',
                                padding: '20px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                textAlign: 'left'
                            }}>
                                <h2>🔥 DEBUG INFO 🔥</h2>
                                <p><strong>Questions Array Length:</strong> {questions.length}</p>
                                <p><strong>Current Index:</strong> {currentQuestionIndex}</p>
                                <p><strong>Current Question Object:</strong></p>
                                <pre>{JSON.stringify(questions[currentQuestionIndex], null, 2)}</pre>
                            </div>
                            
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
                                {questions[currentQuestionIndex]?.text || "❌ QUESTION TEXT NOT FOUND"}
                            </h3>
                            <p className="text-gray-500">Select the option that best applies to you.</p>
                        </div>

                        {/* Question Options */}
                        <QuestionCard
                            question={questions[currentQuestionIndex]}
                            selectedAnswer={answers[questions[currentQuestionIndex].id]}
                            onAnswerChange={handleAnswerChange}
                        />

                        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                        
                        {/* Navigation Button */}
                        <div className="mt-8 text-center">
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    onClick={handleNextQuestion}
                                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmitQuiz}
                                    className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition-all"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </>
                )}
                {questions.length > 0 && currentQuestionIndex === questions.length && (
                    <div className="text-center mt-8 text-xl font-semibold text-gray-700">
                        Quiz complete!
                    </div>
                )}
                {questions.length === 0 && !loading && (
                     <div className="text-center mt-8 text-xl font-semibold text-gray-700">
                        No questions available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;