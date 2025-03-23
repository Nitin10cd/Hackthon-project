import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./Interview.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

const Question = () => {
    const API_URL = "http://localhost:3000/api/interview/askQuestion";
    const QUESTION_URL = "http://localhost:3000/api/interview/topicWiseInterviewPrep";
    const VALIDATION_URL = "http://localhost:3000/api/interview/validateAnswer";
    const REPORT_URL = "http://localhost:3000/api/interview/makeReport";

    const [noOfQuestions, setNoOfQuestions] = useState(15);
    const [questionArray, setQuestionArray] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [feedbackArray, setFeedbackArray] = useState([]);
    const [test, setTest] = useState([
        {
            "question": "What are the core subjects for a well-rounded education, and why?",
            "answer": "A well-rounded education includes subjects like math, science, and literature to develop critical thinking and problem-solving skills.",
            "feedback": "Good response. Could include more examples."
        },
        {
            "question": "How do you handle pressure in the workplace?",
            "answer": "I stay calm, prioritize tasks, and break them into manageable steps.",
            "feedback": "Nice approach. Could elaborate with a real example."
        },
        {
            "question": "Tell me about a time you solved a difficult problem.",
            "answer": "I optimized a slow database query, reducing response time from 5s to 1s.",
            "feedback": "Strong technical answer. Explain more about the impact."
        },
        {
            "question": "What motivates you to work hard?",
            "answer": "The opportunity to learn and make an impact drives me.",
            "feedback": "Good, but add a personal story."
        },
        {
            "question": "How do you approach learning new technologies?",
            "answer": "I start with official documentation, build small projects, and seek mentorship.",
            "feedback": "Great approach. Mention a tech you recently learned."
        },
        {
            "question": "What’s your experience with MongoDB?",
            "answer": "I have built several applications using MongoDB with Mongoose ORM.",
            "feedback": "Nice. Can you mention an indexing strategy you used?"
        },
        {
            "question": "How do you ensure code quality in your projects?",
            "answer": "I use code reviews, linters, and automated testing.",
            "feedback": "Good answer. Can you give a specific tool example?"
        },
        {
            "question": "How do you handle conflicts in a team?",
            "answer": "I address the issue early, encourage open discussion, and find a compromise.",
            "feedback": "Solid response. Have you ever applied this?"
        },
        {
            "question": "Explain the difference between SQL and NoSQL.",
            "answer": "SQL is relational and structured; NoSQL is schema-less and scalable.",
            "feedback": "Concise. Expand with use cases."
        },
        {
            "question": "What’s the biggest challenge you faced in coding?",
            "answer": "Debugging a memory leak in a Node.js app.",
            "feedback": "Nice. How did you resolve it?"
        },
        {
            "question": "How do you stay updated with industry trends?",
            "answer": "I follow tech blogs, attend conferences, and contribute to open source.",
            "feedback": "Good strategy. Which blogs do you follow?"
        },
        {
            "question": "Tell me about a project you’re proud of.",
            "answer": "I developed an AI chatbot that improved customer support response time.",
            "feedback": "Great! What was the tech stack?"
        },
        {
            "question": "How do you prioritize tasks in a fast-paced environment?",
            "answer": "I use the Eisenhower matrix to prioritize urgent and important tasks.",
            "feedback": "Good technique. Give an example."
        },
        {
            "question": "What’s your experience with React.js?",
            "answer": "I have built multiple projects using React, including state management with Redux.",
            "feedback": "Nice. How do you handle performance optimization?"
        },
        {
            "question": "Where do you see yourself in five years?",
            "answer": "I see myself leading a team and contributing to impactful projects.",
            "feedback": "Good vision. What steps are you taking towards it?"
        }
    ])
    const [hideArea, setHideArea] = useState(false);
    const [loading, setLoading] = useState(false);
    const [voice, setVoice] = useState(null);
    const [feedBackData, setFeedBackData] = useState(null);

    const synthRef = useRef(window.speechSynthesis);
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const location = useLocation();
    const { field } = location.state || {};
    const { reportData, setReportData } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentQuestionIndex >= noOfQuestions) {
            stopInterview();
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
        const loadVoices = () => {
            const voices = synthRef.current.getVoices();
            if (voices.length > 0) {
                setVoice(voices.find(v => v.default) || voices[0]);
            }
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    const handleSpeak = (text) => {
        if (!text.trim() || !voice) return;
        synthRef.current.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        speech.voice = voice;
        speech.lang = "en-US";
        synthRef.current.speak(speech);
    };

    const getQuestions = async () => {
        if (noOfQuestions <= 0) return alert("Enter a valid number of questions");

        setLoading(true);
        try {
            const { data } = await axios.post(QUESTION_URL, { topic: field, noOfQuestions });
            if (!data.success) throw new Error(data.message);

            setQuestionArray(data.data);
            setFeedbackArray(Array(data.data.length).fill({ question: "", answer: "", feedback: "" }));
            setCurrentQuestionIndex(0);
            setHideArea(true);
        } catch (error) {
            console.error("Error fetching questions:", error);
            alert(error.message || "Error fetching questions.");
        } finally {
            setLoading(false);
        }
    };

    const feedbackReportGenerator = async (feedbackArray) => {
        try {
            const response = await axios.post(REPORT_URL, { feedBack: test });

            if (response.data.success && response.data.report) {
                console.log("Generated Report:", response.data.report);
                setFeedBackData(response.data.report);
                setReportData(feedBackData)
                console.log("Report Data: ",reportData)
            } else {
                console.log("Error in Response:", response.data.message);
            }
        } catch (error) {
            console.error("Error generating feedback report:", error);
        }
    };

    useEffect(() => {
        if (feedBackData && Object.keys(feedBackData).length > 0) {
            setReportData(feedBackData);
            setTimeout(() => navigate('/report'), 500);
        }
    }, [feedBackData, navigate, setReportData]);

    const stopInterview = async () => {
        feedbackReportGenerator(feedbackArray);
        setQuestionArray([]);
        setHideArea(false);
        setFeedbackArray([]);
        setCurrentQuestionIndex(0);
        synthRef.current.cancel();
    };

    const startListening = () => {
        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    };

    const stopListening = async () => {
        SpeechRecognition.stopListening();
        await handleValidation();
    };

    const handleValidation = async () => {
        const userAnswer = transcript.trim();
        if (!userAnswer) return alert("No answer detected! Please speak again.");

        try {
            const { data } = await axios.post(VALIDATION_URL, {
                question: questionArray[currentQuestionIndex],
                answer: userAnswer
            });

            if (!data.success) throw new Error(data.message);

            setFeedbackArray(prev => {
                const updatedFeedback = [...prev];
                updatedFeedback[currentQuestionIndex] = {
                    question: questionArray[currentQuestionIndex],
                    answer: userAnswer,
                    feedback: data.feedBackRes.feedBack
                };
                return updatedFeedback;
            });

            handleSpeak(data.feedBackRes.feedBack);
        } catch (error) {
            console.error("Error validating answer:", error);
            alert(error.message || "Error validating answer.");
        }
    };

    const moveToNextQuestion = async () => {
        if (currentQuestionIndex + 1 < questionArray.length) {
            setCurrentQuestionIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                setTimeout(() => {
                    handleSpeak(questionArray[nextIndex]);
                    startListening();
                }, 3000);
                return nextIndex;
            });
        } else {
            alert("Interview finished!");
            stopInterview();
        }
    };

    const startInterview = () => {
        if (questionArray.length > 0) {
            handleSpeak(questionArray[currentQuestionIndex]);
            setTimeout(startListening, 3000);
        }
    };

    return (
        <div className="interview-container">
            <div className="interview-box">
                {!hideArea ? (
                    <div className="setup-section">
                        <button className="btn start-btn" onClick={getQuestions} disabled={loading}>
                            {loading ? "Loading..." : "Start Interview"}
                        </button>
                    </div>
                ) : (
                    <div className="interview-dashboard">
                        <p className="question">Question {currentQuestionIndex + 1}/{questionArray.length}: {questionArray[currentQuestionIndex]}</p>
                        <p className="transcript">Your Answer: {transcript}</p>
                        <div className="button-group">
                            <button className="btn listen-btn" onClick={startListening} disabled={listening}>
                                {listening ? "Listening..." : "Start Listening"}
                            </button>
                            <button className="btn validate-btn" onClick={stopListening}>Stop & Validate</button>
                            <button className="btn stop-btn" onClick={stopInterview}>Stop Interview</button>
                            <button className="btn start-btn" onClick={startInterview}>Repeat Question</button>
                            <button className="btn next-btn" onClick={moveToNextQuestion}>Next</button>
                        </div>
                        <p className="status">{listening ? "Listening..." : "Not Listening"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Question;
