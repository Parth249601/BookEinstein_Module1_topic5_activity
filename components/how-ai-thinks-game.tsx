"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Zap,
  Target,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Network,
  User,
  ChevronRight,
  Flame,
  Award,
  Clock,
  Play,
  Layers,
  CircuitBoard,
} from "lucide-react"

// Neural Network Visualization Component
const NeuralNetworkVisual = ({ active = false, processing = false }: { active?: boolean; processing?: boolean }) => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 300 100" className="w-full h-full">
        {/* Input Layer */}
        {[20, 40, 60, 80].map((y, i) => (
          <circle
            key={`input-${i}`}
            cx="40"
            cy={y}
            r="8"
            className={`transition-all duration-500 ${
              active ? "fill-violet-500" : "fill-violet-300"
            } ${processing ? "animate-pulse" : ""}`}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
        
        {/* Hidden Layer 1 */}
        {[15, 35, 50, 65, 85].map((y, i) => (
          <circle
            key={`hidden1-${i}`}
            cx="110"
            cy={y}
            r="8"
            className={`transition-all duration-500 ${
              active ? "fill-cyan-500" : "fill-cyan-300"
            } ${processing ? "animate-pulse" : ""}`}
            style={{ animationDelay: `${i * 100 + 200}ms` }}
          />
        ))}
        
        {/* Hidden Layer 2 */}
        {[25, 50, 75].map((y, i) => (
          <circle
            key={`hidden2-${i}`}
            cx="190"
            cy={y}
            r="8"
            className={`transition-all duration-500 ${
              active ? "fill-purple-500" : "fill-purple-300"
            } ${processing ? "animate-pulse" : ""}`}
            style={{ animationDelay: `${i * 100 + 400}ms` }}
          />
        ))}
        
        {/* Output Layer */}
        {[35, 65].map((y, i) => (
          <circle
            key={`output-${i}`}
            cx="260"
            cy={y}
            r="8"
            className={`transition-all duration-500 ${
              active ? "fill-green-500" : "fill-green-300"
            } ${processing ? "animate-pulse" : ""}`}
            style={{ animationDelay: `${i * 100 + 600}ms` }}
          />
        ))}
        
        {/* Connections - simplified */}
        <g className={`${active ? "opacity-60" : "opacity-30"} transition-opacity duration-500`}>
          {[20, 40, 60, 80].map((y1, i) =>
            [15, 35, 50, 65, 85].map((y2, j) => (
              <line
                key={`conn1-${i}-${j}`}
                x1="48"
                y1={y1}
                x2="102"
                y2={y2}
                stroke={processing ? "#8b5cf6" : "#c4b5fd"}
                strokeWidth="1"
                className={processing ? "animate-pulse" : ""}
              />
            ))
          )}
          {[15, 35, 50, 65, 85].map((y1, i) =>
            [25, 50, 75].map((y2, j) => (
              <line
                key={`conn2-${i}-${j}`}
                x1="118"
                y1={y1}
                x2="182"
                y2={y2}
                stroke={processing ? "#06b6d4" : "#a5f3fc"}
                strokeWidth="1"
                className={processing ? "animate-pulse" : ""}
              />
            ))
          )}
          {[25, 50, 75].map((y1, i) =>
            [35, 65].map((y2, j) => (
              <line
                key={`conn3-${i}-${j}`}
                x1="198"
                y1={y1}
                x2="252"
                y2={y2}
                stroke={processing ? "#a855f7" : "#d8b4fe"}
                strokeWidth="1"
                className={processing ? "animate-pulse" : ""}
              />
            ))
          )}
        </g>
        
        {/* Labels */}
        <text x="40" y="98" textAnchor="middle" className="fill-gray-500 text-[8px] font-medium">Input</text>
        <text x="150" y="98" textAnchor="middle" className="fill-gray-500 text-[8px] font-medium">Hidden Layers</text>
        <text x="260" y="98" textAnchor="middle" className="fill-gray-500 text-[8px] font-medium">Output</text>
      </svg>
    </div>
  )
}

// Confetti Effect Component
const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <span className="text-2xl">
            {["🎉", "⭐", "🧠", "✨", "🎊", "💜", "💙"][Math.floor(Math.random() * 7)]}
          </span>
        </div>
      ))}
    </div>
  )
}

// Achievement Badge Component
const AchievementBadge = ({ icon, title, unlocked }: { icon: string; title: string; unlocked: boolean }) => {
  return (
    <div className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
      unlocked 
        ? "bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-400 shadow-lg scale-100" 
        : "bg-gray-100 border-2 border-gray-200 opacity-50 scale-95"
    }`}>
      <span className={`text-2xl ${unlocked ? "" : "grayscale"}`}>{icon}</span>
      <span className={`text-xs font-medium ${unlocked ? "text-yellow-700" : "text-gray-400"}`}>{title}</span>
    </div>
  )
}

type Challenge = {
  id: number
  title: string
  type: "compare" | "pipeline" | "neuron" | "pattern"
  question: string
  scenario?: string
  difficulty: "easy" | "medium" | "hard"
  options: Array<{
    id: string
    label: string
    icon: string
    isCorrect: boolean
  }>
  explanation: string
  funFact: string
  visualType?: "network" | "brain" | "pipeline" | "comparison"
}

const challenges: Challenge[] = [
  // Human vs AI Comparison Challenges
  {
    id: 1,
    title: "🧠 Brain Power Showdown!",
    type: "compare",
    difficulty: "easy",
    question: "How many examples does an AI need to learn to recognize a cat compared to a human?",
    scenario: "Imagine teaching someone what a cat looks like...",
    visualType: "comparison",
    options: [
      { id: "a", label: "AI needs fewer examples than humans", icon: "🤖", isCorrect: false },
      { id: "b", label: "AI needs MILLIONS of examples, humans need just a few!", icon: "🧠", isCorrect: true },
      { id: "c", label: "They need the same amount", icon: "🔄", isCorrect: false },
      { id: "d", label: "Neither needs any examples", icon: "❌", isCorrect: false },
    ],
    explanation: "Humans can learn from just 2-3 examples of a cat, but AI needs to see MILLIONS of cat photos to learn what makes a cat a cat! That's because AI doesn't truly 'understand' - it finds patterns in massive amounts of data.",
    funFact: "Your brain has 86 BILLION neurons, but uses only 20 watts of power - like a dim light bulb! AI systems use THOUSANDS of watts! 💡",
  },
  {
    id: 2,
    title: "⚡ Power Battle!",
    type: "compare",
    difficulty: "medium",
    question: "Which one uses more energy - your brain thinking all day, or training an AI model?",
    visualType: "comparison",
    options: [
      { id: "a", label: "My brain uses way more energy", icon: "🧠", isCorrect: false },
      { id: "b", label: "They use about the same", icon: "⚖️", isCorrect: false },
      { id: "c", label: "AI training uses THOUSANDS of times more energy!", icon: "⚡", isCorrect: true },
      { id: "d", label: "AI uses zero energy", icon: "🔋", isCorrect: false },
    ],
    explanation: "Your amazing brain runs on just 20 watts (like a dim light bulb!), while training large AI models can use millions of watts - enough to power entire neighborhoods! Your brain is incredibly efficient!",
    funFact: "Training GPT-4 used enough electricity to power about 1,000 homes for a YEAR! 🏠",
  },
  {
    id: 3,
    title: "🎨 Creative Challenge!",
    type: "compare",
    difficulty: "medium",
    question: "Can AI truly be creative like humans?",
    visualType: "brain",
    options: [
      { id: "a", label: "Yes! AI is super creative and has original ideas", icon: "🎨", isCorrect: false },
      { id: "b", label: "AI creates by remixing patterns it learned - no true creativity!", icon: "🔄", isCorrect: true },
      { id: "c", label: "AI is more creative than humans", icon: "🤖", isCorrect: false },
      { id: "d", label: "Neither humans nor AI are creative", icon: "❌", isCorrect: false },
    ],
    explanation: "When AI 'creates' art or music, it's actually finding patterns in millions of existing works and combining them in new ways. It doesn't have original thoughts or emotions - it's sophisticated pattern mixing!",
    funFact: "When you daydream, your brain creates completely NEW things that never existed before. AI can't do that! 💭",
  },
  // Pipeline Understanding Challenges
  {
    id: 4,
    title: "📸 AI Vision Decoder!",
    type: "pipeline",
    difficulty: "easy",
    question: "When AI looks at a photo of a dog, what's happening inside?",
    scenario: "You show an AI a cute puppy photo...",
    visualType: "pipeline",
    options: [
      { id: "a", label: "AI thinks 'Oh, that's a cute dog!'", icon: "💭", isCorrect: false },
      { id: "b", label: "AI matches patterns it learned from millions of dog images", icon: "🔍", isCorrect: true },
      { id: "c", label: "AI imagines being a dog", icon: "🐕", isCorrect: false },
      { id: "d", label: "AI reads the word 'dog' somewhere in the image", icon: "📖", isCorrect: false },
    ],
    explanation: "AI doesn't actually 'see' or 'understand' the dog. It processes pixels, finds patterns (like fur texture, ear shapes, nose position) and matches them to patterns it learned from millions of dog photos during training!",
    funFact: "AI sees images as thousands of tiny numbers (0-255 for each color). No cuteness involved! 🔢",
  },
  {
    id: 5,
    title: "🔄 The AI Assembly Line!",
    type: "pipeline",
    difficulty: "easy",
    question: "What's the correct order of how AI 'thinks'?",
    visualType: "pipeline",
    options: [
      { id: "a", label: "Input → Process → Find Patterns → Output", icon: "✅", isCorrect: true },
      { id: "b", label: "Think → Feel → Decide → Act", icon: "💭", isCorrect: false },
      { id: "c", label: "Guess → Check → Guess Again", icon: "🎲", isCorrect: false },
      { id: "d", label: "Read → Understand → Remember → Respond", icon: "📚", isCorrect: false },
    ],
    explanation: "AI follows a simple pipeline: 1) Take INPUT (image, text, numbers), 2) PROCESS it through mathematical operations, 3) Find PATTERNS that match what it learned, 4) Produce OUTPUT (prediction, answer, image).",
    funFact: "This pipeline happens BILLIONS of times per second in modern AI systems! ⚡",
  },
  // Neural Network Challenges
  {
    id: 6,
    title: "🕸️ Inside the Neural Network!",
    type: "neuron",
    difficulty: "medium",
    question: "What are the 'layers' in a neural network?",
    scenario: "Imagine a neural network as a factory assembly line...",
    visualType: "network",
    options: [
      { id: "a", label: "Different levels of intelligence", icon: "🧠", isCorrect: false },
      { id: "b", label: "Groups of artificial neurons that process information step by step!", icon: "🏭", isCorrect: true },
      { id: "c", label: "Layers of computer screens", icon: "💻", isCorrect: false },
      { id: "d", label: "Different AI personalities", icon: "🎭", isCorrect: false },
    ],
    explanation: "Neural networks have INPUT layers (receive data), HIDDEN layers (process and find patterns), and OUTPUT layers (give results). Each layer transforms the information a little more, like an assembly line building something!",
    funFact: "Deep learning networks can have HUNDREDS of layers! The 'deep' in deep learning refers to many layers! 📊",
  },
  {
    id: 7,
    title: "⚖️ The Secret of AI Learning!",
    type: "neuron",
    difficulty: "hard",
    question: "How does a neural network actually LEARN?",
    visualType: "network",
    options: [
      { id: "a", label: "By reading textbooks like students", icon: "📚", isCorrect: false },
      { id: "b", label: "By adjusting 'weights' on connections when it makes mistakes!", icon: "⚖️", isCorrect: true },
      { id: "c", label: "By getting smarter over time automatically", icon: "📈", isCorrect: false },
      { id: "d", label: "By downloading knowledge from the internet", icon: "🌐", isCorrect: false },
    ],
    explanation: "Each connection between neurons has a 'weight' - a number that says how important that connection is. When AI makes a mistake, it adjusts these weights slightly. After millions of adjustments, it gets better at its task!",
    funFact: "GPT-4 has around 1.7 TRILLION weights to adjust! That's more than the number of stars in our galaxy! ⭐",
  },
  // Pattern Recognition Challenges  
  {
    id: 8,
    title: "🔍 The Pattern Detective!",
    type: "pattern",
    difficulty: "medium",
    question: "When AI reads your message, what is it really doing?",
    visualType: "brain",
    options: [
      { id: "a", label: "Understanding exactly what you mean", icon: "💡", isCorrect: false },
      { id: "b", label: "Finding patterns to predict what words come next", icon: "🔮", isCorrect: true },
      { id: "c", label: "Feeling your emotions", icon: "❤️", isCorrect: false },
      { id: "d", label: "Remembering your conversation forever", icon: "💾", isCorrect: false },
    ],
    explanation: "AI chatbots don't truly 'understand' language. They predict what word is most likely to come next based on patterns from billions of text examples. It's super sophisticated pattern matching - not thinking!",
    funFact: "ChatGPT predicts one word at a time! Each word you see was predicted based on all the previous words! 🔤",
  },
  {
    id: 9,
    title: "🎯 The Ultimate Secret!",
    type: "pattern",
    difficulty: "hard",
    question: "Why is 'pattern recognition' the KEY to how AI works?",
    scenario: "Every AI system - from Spotify recommendations to self-driving cars...",
    visualType: "pipeline",
    options: [
      { id: "a", label: "Patterns are easy for computers to store", icon: "💾", isCorrect: false },
      { id: "b", label: "AI finds patterns in data to make predictions without true understanding!", icon: "🎯", isCorrect: true },
      { id: "c", label: "Patterns look pretty on screens", icon: "✨", isCorrect: false },
      { id: "d", label: "Humans told AI to like patterns", icon: "👤", isCorrect: false },
    ],
    explanation: "EVERYTHING AI does comes down to pattern recognition! Recognizing faces? Patterns in pixels. Understanding speech? Patterns in sound waves. Predicting weather? Patterns in historical data. No real understanding needed!",
    funFact: "Spotify finds patterns in 100+ audio features per song to match your taste! 🎵",
  },
  {
    id: 10,
    title: "🤔 The Common Sense Puzzle!",
    type: "compare",
    difficulty: "hard",
    question: "Why can't AI use 'common sense' like humans?",
    visualType: "comparison",
    options: [
      { id: "a", label: "AI is too smart for common sense", icon: "🧠", isCorrect: false },
      { id: "b", label: "Common sense comes from real-world experience - AI only has data patterns!", icon: "🌍", isCorrect: true },
      { id: "c", label: "AI chooses not to use common sense", icon: "🚫", isCorrect: false },
      { id: "d", label: "AI will have common sense next year", icon: "📅", isCorrect: false },
    ],
    explanation: "You know that if you drop a glass, it will fall and might break. This 'obvious' knowledge comes from living in the real world. AI never experienced gravity - it can only learn about glass-breaking from descriptions in text!",
    funFact: "AI might know 1000 facts about gravity but still can't 'feel' that things fall down! 🍎",
  },
]

export default function HowAIThinksGame() {
  const [gameState, setGameState] = useState<"welcome" | "playing" | "complete">("welcome")
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [shuffledChallenges, setShuffledChallenges] = useState<Challenge[]>([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === "playing" && !showResult) {
      interval = setInterval(() => setTimeSpent(t => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [gameState, showResult])

  useEffect(() => {
    // Shuffle and pick 5 random challenges with variety
    const shuffled = [...challenges].sort(() => Math.random() - 0.5).slice(0, 5)
    setShuffledChallenges(shuffled)
  }, [])

  const currentChallenge = shuffledChallenges[currentChallengeIndex]
  const progress = ((currentChallengeIndex + 1) / shuffledChallenges.length) * 100

  const handleAnswerSelect = (answerId: string) => {
    if (showResult) return
    setSelectedAnswer(answerId)
  }

  const handleCheckAnswer = () => {
    if (!selectedAnswer || !currentChallenge) return
    
    setIsProcessing(true)
    
    // Simulate AI "thinking" animation
    setTimeout(() => {
      const isCorrect = currentChallenge.options.find(o => o.id === selectedAnswer)?.isCorrect
      
      if (isCorrect) {
        const streakBonus = streak >= 2 ? 25 : 0
        const difficultyBonus = currentChallenge.difficulty === "hard" ? 50 : currentChallenge.difficulty === "medium" ? 25 : 0
        setScore(score + 100 + streakBonus + difficultyBonus)
        setStreak(streak + 1)
        setMaxStreak(Math.max(maxStreak, streak + 1))
        setCorrectAnswers(correctAnswers + 1)
        
        if (streak >= 2) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
        }
      } else {
        setStreak(0)
      }
      
      setIsProcessing(false)
      setShowResult(true)
    }, 800)
  }

  const handleNextChallenge = () => {
    if (currentChallengeIndex < shuffledChallenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameState("complete")
    }
  }

  const restartGame = () => {
    const shuffled = [...challenges].sort(() => Math.random() - 0.5).slice(0, 5)
    setShuffledChallenges(shuffled)
    setCurrentChallengeIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setStreak(0)
    setMaxStreak(0)
    setCorrectAnswers(0)
    setTimeSpent(0)
    setGameState("playing")
  }

  const startGame = () => {
    setGameState("playing")
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "compare": return <User className="w-4 h-4" />
      case "pipeline": return <Layers className="w-4 h-4" />
      case "neuron": return <Network className="w-4 h-4" />
      case "pattern": return <Target className="w-4 h-4" />
      default: return <Brain className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "compare": return "Human vs AI"
      case "pipeline": return "AI Pipeline"
      case "neuron": return "Neural Networks"
      case "pattern": return "Pattern Recognition"
      default: return "AI Concepts"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-700 border-green-300"
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "hard": return "bg-red-100 text-red-700 border-red-300"
      default: return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Welcome Screen
  if (gameState === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 p-4 md:p-6 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <Card className="max-w-3xl w-full border-0 shadow-2xl bg-white/95 backdrop-blur-xl relative z-10">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 blur-3xl opacity-50 rounded-full animate-pulse" />
                <div className="relative flex gap-4 items-center">
                  <div className="relative">
                    <div className="text-7xl animate-bounce">🧠</div>
                    <div className="absolute -top-1 -right-1 text-2xl animate-ping">💡</div>
                  </div>
                  <div className="text-5xl">
                    <CircuitBoard className="w-16 h-16 text-violet-600 animate-pulse" />
                  </div>
                  <div className="text-7xl animate-bounce" style={{ animationDelay: "0.3s" }}>🤖</div>
                </div>
              </div>
            </div>
            <CardTitle className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600">
              How AI Thinks
            </CardTitle>
            <CardDescription className="text-xl mt-3 text-gray-600 font-medium">
              Discover the SECRET of artificial intelligence! 🔮
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Neural Network Visual */}
            <div className="bg-gradient-to-r from-violet-50 to-cyan-50 p-4 rounded-2xl border-2 border-violet-200">
              <NeuralNetworkVisual active={true} processing={false} />
            </div>

            <div className="bg-gradient-to-r from-violet-50/80 to-cyan-50/80 p-5 rounded-2xl border-2 border-violet-200">
              <p className="text-center text-gray-700 font-semibold text-lg">
                🎮 Master 5 brain-bending challenges to unlock the secrets of AI!
              </p>
              <p className="text-center text-gray-500 mt-2">
                Earn badges • Build streaks • Become an AI Expert! 🏆
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-violet-100 to-violet-50 rounded-xl border-2 border-violet-200 hover:scale-105 transition-all cursor-default group">
                <div className="p-2 bg-violet-500 rounded-lg group-hover:rotate-12 transition-transform">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-violet-800">Human vs AI Brain</h3>
                  <p className="text-sm text-gray-600">Compare your amazing brain to silicon ones!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-xl border-2 border-cyan-200 hover:scale-105 transition-all cursor-default group">
                <div className="p-2 bg-cyan-500 rounded-lg group-hover:rotate-12 transition-transform">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-cyan-800">Neural Networks</h3>
                  <p className="text-sm text-gray-600">Explore the building blocks of AI!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border-2 border-purple-200 hover:scale-105 transition-all cursor-default group">
                <div className="p-2 bg-purple-500 rounded-lg group-hover:rotate-12 transition-transform">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-800">AI Pipeline</h3>
                  <p className="text-sm text-gray-600">See how AI processes information!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl border-2 border-pink-200 hover:scale-105 transition-all cursor-default group">
                <div className="p-2 bg-pink-500 rounded-lg group-hover:rotate-12 transition-transform">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-pink-800">Pattern Recognition</h3>
                  <p className="text-sm text-gray-600">The SECRET behind all AI magic!</p>
                </div>
              </div>
            </div>

            <Button
              onClick={startGame}
              size="lg"
              className="w-full text-xl h-16 font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-700 hover:via-purple-700 hover:to-cyan-700 text-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl group"
            >
              <Play className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform" />
              Start the Brain Challenge!
              <Sparkles className="w-7 h-7 ml-3 animate-pulse" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Game Complete Screen
  if (gameState === "complete") {
    const maxScore = shuffledChallenges.reduce((acc, c) => {
      const diffBonus = c.difficulty === "hard" ? 50 : c.difficulty === "medium" ? 25 : 0
      return acc + 100 + diffBonus + 25 // max with streak
    }, 0)
    const percentage = Math.round((score / maxScore) * 100)
    const isExpert = percentage >= 90
    const isGreat = percentage >= 70
    const isGood = percentage >= 50

    // Achievements
    const achievements = [
      { icon: "🧠", title: "First Timer", unlocked: true },
      { icon: "🔥", title: "On Fire!", unlocked: maxStreak >= 3 },
      { icon: "⚡", title: "Speed Demon", unlocked: timeSpent < 120 },
      { icon: "🎯", title: "Perfectionist", unlocked: correctAnswers === shuffledChallenges.length },
      { icon: "🏆", title: "AI Expert", unlocked: percentage >= 90 },
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 p-4 md:p-6 flex items-center justify-center relative overflow-hidden">
        {showConfetti && <Confetti />}
        
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <Card className="max-w-2xl w-full border-0 shadow-2xl bg-white/95 backdrop-blur-xl text-center relative z-10">
          <CardHeader>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/50 blur-3xl rounded-full animate-pulse" />
                <div className="text-8xl animate-bounce relative">
                  {isExpert ? "🏆" : isGreat ? "🌟" : isGood ? "👏" : "💪"}
                </div>
                {isExpert && (
                  <>
                    <div className="absolute -top-4 -left-4 text-3xl animate-spin" style={{ animationDuration: "3s" }}>⭐</div>
                    <div className="absolute -top-4 -right-4 text-3xl animate-spin" style={{ animationDuration: "4s" }}>⭐</div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl animate-bounce">👑</div>
                  </>
                )}
              </div>
            </div>
            <CardTitle className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600">
              {isExpert ? "🧠 AI MASTER! 🧠" : isGreat ? "Fantastic Job! 🎉" : isGood ? "Great Effort! 👍" : "Keep Learning! 📚"}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="bg-gradient-to-br from-violet-100 via-purple-50 to-cyan-100 rounded-3xl p-8 border-2 border-violet-200 shadow-inner">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600 mb-2">
                {score}
              </div>
              <div className="text-gray-600 font-medium">points earned!</div>
              <Progress value={percentage} className="mt-4 h-4" />
              <div className="text-sm text-gray-500 mt-2">{percentage}% of maximum possible</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">{correctAnswers}/{shuffledChallenges.length}</div>
                <div className="text-xs text-green-600">Correct</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-700">{maxStreak}</div>
                <div className="text-xs text-orange-600">Best Streak</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">{formatTime(timeSpent)}</div>
                <div className="text-xs text-blue-600">Time</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 border-2 border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center justify-center gap-2">
                <Award className="w-5 h-5" /> Achievements Unlocked
              </h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {achievements.map((a, i) => (
                  <AchievementBadge key={i} {...a} />
                ))}
              </div>
            </div>

            {/* What You Learned */}
            <div className="bg-gradient-to-r from-violet-50 to-cyan-50 border-2 border-violet-200 rounded-2xl p-4 text-left">
              <h3 className="font-bold text-violet-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> What You Learned:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  AI finds PATTERNS in data - it doesn&apos;t truly &quot;think&quot;
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  Your brain is WAY more efficient than AI (20W vs thousands!)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  Neural networks learn by adjusting connection weights
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  AI needs MILLIONS of examples to learn what you learn in seconds!
                </li>
              </ul>
            </div>

            {/* Career Tip */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 rounded-2xl p-4">
              <p className="text-gray-700">
                <strong className="text-purple-700">🚀 Career Tip:</strong> AI Engineers who understand HOW AI really works earn <strong>$120,000+ per year</strong> and are in super high demand worldwide!
              </p>
            </div>

            <Button
              onClick={restartGame}
              size="lg"
              className="w-full text-xl h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-700 hover:via-purple-700 hover:to-cyan-700 text-white hover:scale-105 transition-all shadow-xl"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Play Again! 🔄
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentChallenge) return null

  // Main Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-cyan-100 p-4 md:p-6">
      {showConfetti && <Confetti />}
      
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border-2 border-violet-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-400/30 blur-xl rounded-full" />
                <div className="relative p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">How AI Thinks</h1>
                <p className="text-sm text-gray-500">Challenge {currentChallengeIndex + 1} of {shuffledChallenges.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {streak >= 2 && (
                <div className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1.5 rounded-full border-2 border-orange-300 animate-pulse">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-700">{streak} Streak!</span>
                </div>
              )}
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-gray-600">{formatTime(timeSpent)}</span>
              </div>
              <div className="text-right bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2 rounded-xl border-2 border-violet-200">
                <p className="text-xs text-violet-600 font-medium">Score</p>
                <p className="text-2xl font-bold text-violet-700">{score}</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 relative">
            <Progress value={progress} className="h-3" />
            <div className="absolute inset-0 flex justify-between px-1">
              {shuffledChallenges.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full border-2 transition-all ${
                    i < currentChallengeIndex
                      ? "bg-green-500 border-green-500"
                      : i === currentChallengeIndex
                      ? "bg-violet-500 border-violet-500 scale-125"
                      : "bg-white border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Challenge Card */}
        <Card className="border-2 shadow-2xl bg-white overflow-hidden">
          {/* Visual Header based on challenge type */}
          {currentChallenge.visualType === "network" && (
            <div className="bg-gradient-to-r from-violet-100 to-cyan-100 p-2 border-b-2 border-violet-200">
              <NeuralNetworkVisual active={true} processing={isProcessing} />
            </div>
          )}
          
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-violet-100 text-violet-700 border-violet-300">
                  {getTypeIcon(currentChallenge.type)}
                  <span className="ml-1">{getTypeLabel(currentChallenge.type)}</span>
                </Badge>
                <Badge className={getDifficultyColor(currentChallenge.difficulty)}>
                  {currentChallenge.difficulty === "easy" ? "⭐" : currentChallenge.difficulty === "medium" ? "⭐⭐" : "⭐⭐⭐"}
                  <span className="ml-1 capitalize">{currentChallenge.difficulty}</span>
                </Badge>
              </div>
            </div>
            <CardTitle className="text-2xl mt-3 text-gray-800">{currentChallenge.title}</CardTitle>
            
            {currentChallenge.scenario && (
              <div className="bg-gradient-to-r from-cyan-50 to-violet-50 p-4 rounded-xl border-2 border-cyan-200 mt-3">
                <p className="text-gray-600 italic flex items-start gap-2">
                  <span className="text-xl">💭</span>
                  {currentChallenge.scenario}
                </p>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Question */}
            <div className="bg-gradient-to-r from-violet-100 via-purple-50 to-cyan-100 p-5 rounded-xl border-2 border-violet-200">
              <p className="text-lg font-semibold text-gray-800 flex items-start gap-3">
                <span className="text-2xl">🤔</span>
                {currentChallenge.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {currentChallenge.options.map((option) => {
                const isSelected = selectedAnswer === option.id
                const isCorrect = option.isCorrect
                const showCorrectness = showResult

                let className = "p-4 rounded-xl border-2 transition-all flex items-center gap-4 "
                
                if (showCorrectness) {
                  if (isCorrect) {
                    className += "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-lg "
                  } else if (isSelected && !isCorrect) {
                    className += "bg-gradient-to-r from-red-50 to-rose-50 border-red-400 "
                  } else {
                    className += "bg-gray-50 border-gray-200 opacity-50 "
                  }
                } else if (isSelected) {
                  className += "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-400 shadow-lg scale-[1.02] ring-2 ring-violet-300 "
                } else {
                  className += "bg-white border-gray-200 hover:border-violet-300 hover:shadow-md hover:scale-[1.01] cursor-pointer "
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showResult || isProcessing}
                    className={className}
                  >
                    <span className="text-3xl">{option.icon}</span>
                    <span className="flex-1 text-left font-medium text-gray-800">{option.label}</span>
                    {showCorrectness && isCorrect && (
                      <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-bold text-green-700">Correct!</span>
                      </div>
                    )}
                    {showCorrectness && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    {!showCorrectness && isSelected && (
                      <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Processing Animation */}
            {isProcessing && (
              <div className="flex items-center justify-center gap-3 p-4 bg-violet-50 rounded-xl border-2 border-violet-200 animate-pulse">
                <div className="relative">
                  <Brain className="w-8 h-8 text-violet-500 animate-bounce" />
                  <Zap className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-ping" />
                </div>
                <span className="font-semibold text-violet-700">AI is processing your answer...</span>
              </div>
            )}

            {/* Result Section */}
            {showResult && !isProcessing && (
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <div className={`p-5 rounded-xl border-2 ${
                  currentChallenge.options.find(o => o.id === selectedAnswer)?.isCorrect
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                    : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300"
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">
                      {currentChallenge.options.find(o => o.id === selectedAnswer)?.isCorrect ? (
                        <span className="animate-bounce inline-block">🎉</span>
                      ) : (
                        <span>💡</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-lg mb-2">
                        {currentChallenge.options.find(o => o.id === selectedAnswer)?.isCorrect
                          ? streak >= 3 ? "🔥 AMAZING! You're on fire!" : "✨ Correct! You're thinking like an AI expert!"
                          : "Not quite - but now you know!"}
                      </p>
                      <p className="text-gray-700 leading-relaxed">{currentChallenge.explanation}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-200 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-yellow-700" />
                    </div>
                    <div>
                      <p className="font-bold text-yellow-800 mb-1">Fun Fact!</p>
                      <p className="text-gray-700">{currentChallenge.funFact}</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleNextChallenge}
                  size="lg"
                  className="w-full text-lg h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-700 hover:via-purple-700 hover:to-cyan-700 text-white hover:scale-105 transition-all shadow-xl group"
                >
                  {currentChallengeIndex < shuffledChallenges.length - 1 ? (
                    <>
                      Next Challenge!
                      <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      See My Results!
                      <Trophy className="w-6 h-6 ml-2 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Check Answer Button */}
            {!showResult && !isProcessing && (
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                size="lg"
                className={`w-full text-lg h-14 transition-all shadow-xl group ${
                  selectedAnswer
                    ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-gray-900 hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Zap className={`w-6 h-6 mr-2 ${selectedAnswer ? "animate-pulse" : ""}`} />
                Check My Answer!
                <Sparkles className={`w-6 h-6 ml-2 ${selectedAnswer ? "animate-spin" : ""}`} style={{ animationDuration: "2s" }} />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
