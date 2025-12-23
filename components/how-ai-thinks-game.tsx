"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Cpu,
  Zap,
  Eye,
  MessageSquare,
  Target,
  ArrowRight,
  RotateCcw,
  Trophy,
  Star,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Network,
  User,
  ChevronRight,
} from "lucide-react"

type Challenge = {
  id: number
  title: string
  type: "compare" | "pipeline" | "neuron" | "pattern"
  question: string
  scenario?: string
  options: Array<{
    id: string
    label: string
    icon: string
    isCorrect: boolean
  }>
  explanation: string
  funFact: string
}

const challenges: Challenge[] = [
  // Human vs AI Comparison Challenges
  {
    id: 1,
    title: "🧠 Brain Power Showdown!",
    type: "compare",
    question: "How many examples does an AI need to learn to recognize a cat compared to a human?",
    scenario: "Imagine teaching someone what a cat looks like...",
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
    question: "Which one uses more energy - your brain thinking all day, or training an AI model?",
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
    question: "Can AI truly be creative like humans?",
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
    title: "📸 AI Thinking Process!",
    type: "pipeline",
    question: "When AI looks at a photo of a dog, what's happening inside?",
    scenario: "You show an AI a cute puppy photo...",
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
    title: "🔄 The AI Pipeline!",
    type: "pipeline",
    question: "What's the correct order of how AI 'thinks'?",
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
    title: "🕸️ Neural Network Basics!",
    type: "neuron",
    question: "What are the 'layers' in a neural network?",
    scenario: "Imagine a neural network as a factory assembly line...",
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
    title: "⚖️ Weights & Learning!",
    type: "neuron",
    question: "How does a neural network actually LEARN?",
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
    title: "🔍 Pattern Detective!",
    type: "pattern",
    question: "When AI reads your message, what is it really doing?",
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
    title: "🎯 The Pattern Secret!",
    type: "pattern",
    question: "Why is 'pattern recognition' the KEY to how AI works?",
    scenario: "Every AI system - from Spotify recommendations to self-driving cars...",
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
    title: "🤔 Common Sense Challenge!",
    type: "compare",
    question: "Why can't AI use 'common sense' like humans?",
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
  const [gameStarted, setGameStarted] = useState(false)
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [shuffledChallenges, setShuffledChallenges] = useState<Challenge[]>([])

  useEffect(() => {
    // Shuffle and pick 5 random challenges
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

    const isCorrect = currentChallenge.options.find(o => o.id === selectedAnswer)?.isCorrect
    
    if (isCorrect) {
      const streakBonus = streak >= 2 ? 20 : 0
      setScore(score + 100 + streakBonus)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
    
    setShowResult(true)
  }

  const handleNextChallenge = () => {
    if (currentChallengeIndex < shuffledChallenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
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
    setGameComplete(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "compare": return <User className="w-5 h-5" />
      case "pipeline": return <ArrowRight className="w-5 h-5" />
      case "neuron": return <Network className="w-5 h-5" />
      case "pattern": return <Target className="w-5 h-5" />
      default: return <Brain className="w-5 h-5" />
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

  // Welcome Screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-cyan-100 p-4 md:p-6 flex items-center justify-center">
        <Card className="max-w-2xl w-full border-2 shadow-2xl bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-400/40 blur-3xl rounded-full animate-pulse" />
                <div className="relative flex gap-4 items-center">
                  <div className="text-7xl animate-bounce">🧠</div>
                  <div className="text-5xl animate-pulse">⚡</div>
                  <div className="text-7xl animate-bounce" style={{ animationDelay: "0.5s" }}>🤖</div>
                </div>
              </div>
            </div>
            <CardTitle className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600">
              How AI Thinks 🧠
            </CardTitle>
            <CardDescription className="text-lg mt-2 text-gray-600">
              Discover the SECRET of artificial intelligence!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-violet-50 to-cyan-50 p-4 rounded-2xl border-2 border-violet-200">
              <p className="text-center text-gray-700 font-medium">
                🎮 Answer 5 fun challenges to learn how AI REALLY works!
                <br />
                <span className="text-sm text-gray-500">Hint: AI doesn't think like you do! 🤯</span>
              </p>
            </div>

            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-xl border border-violet-200 hover:scale-105 transition-transform">
                <User className="w-6 h-6 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-violet-800">🧠 Human vs AI Brain</h3>
                  <p className="text-sm text-gray-600">Compare your amazing brain to artificial ones!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded-xl border border-cyan-200 hover:scale-105 transition-transform">
                <Network className="w-6 h-6 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-cyan-800">🕸️ Neural Networks</h3>
                  <p className="text-sm text-gray-600">Explore the building blocks of AI!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200 hover:scale-105 transition-transform">
                <Target className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-purple-800">🎯 Pattern Recognition</h3>
                  <p className="text-sm text-gray-600">The SECRET behind all AI magic!</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setGameStarted(true)}
              size="lg"
              className="w-full text-lg h-14 font-bold bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white hover:scale-105 transition-all shadow-lg"
            >
              <Sparkles className="w-6 h-6 mr-2 animate-pulse" />
              Start the Brain Challenge! 🚀
              <Brain className="w-6 h-6 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Game Complete Screen
  if (gameComplete) {
    const maxScore = shuffledChallenges.length * 100
    const percentage = Math.round((score / maxScore) * 100)
    const isGreat = percentage >= 80
    const isGood = percentage >= 60

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-cyan-100 p-4 md:p-6 flex items-center justify-center">
        <Card className="max-w-2xl w-full border-2 shadow-2xl bg-white/90 backdrop-blur text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/40 blur-3xl rounded-full animate-pulse" />
                <div className="text-8xl animate-bounce relative">
                  {isGreat ? "🏆" : isGood ? "🌟" : "💪"}
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-black text-gray-800">
              {isGreat ? "BRAIN MASTER! 🧠✨" : isGood ? "Great Job! 🎉" : "Keep Learning! 📚"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-violet-100 to-cyan-100 rounded-2xl p-6 border-2 border-violet-200">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600">
                {score} points
              </div>
              <div className="text-gray-600 mt-2">out of {maxScore} possible</div>
              <Progress value={percentage} className="mt-4 h-3" />
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4">
              <h3 className="font-bold text-yellow-800 mb-2">🧠 What You Learned:</h3>
              <ul className="text-left text-sm text-gray-700 space-y-1">
                <li>✅ AI finds PATTERNS in data - it doesn't truly "think"</li>
                <li>✅ Your brain is WAY more efficient than AI</li>
                <li>✅ Neural networks learn by adjusting weights</li>
                <li>✅ AI needs MILLIONS of examples to learn</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4">
              <p className="text-gray-700">
                <strong className="text-purple-700">🚀 Career Tip:</strong> AI Engineers who understand HOW AI really works earn $120,000+ per year and are in super high demand!
              </p>
            </div>

            <Button
              onClick={restartGame}
              size="lg"
              className="w-full text-lg h-14 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white hover:scale-105 transition-all shadow-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
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
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-4 border-2 border-violet-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-400/30 blur-xl rounded-full" />
                <Brain className="w-10 h-10 text-violet-600 relative animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">How AI Thinks 🧠</h1>
                <p className="text-sm text-gray-500">Challenge {currentChallengeIndex + 1} of {shuffledChallenges.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {streak >= 2 && (
                <Badge className="bg-orange-100 text-orange-700 border-orange-300 animate-pulse">
                  🔥 {streak} Streak!
                </Badge>
              )}
              <div className="text-right bg-violet-100 px-4 py-2 rounded-xl border border-violet-200">
                <p className="text-xs text-violet-600 font-medium">Score</p>
                <p className="text-xl font-bold text-violet-700">{score}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Challenge Card */}
        <Card className="border-2 shadow-xl bg-white">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 border-violet-300">
                {getTypeIcon(currentChallenge.type)}
                <span className="ml-1">{getTypeLabel(currentChallenge.type)}</span>
              </Badge>
            </div>
            <CardTitle className="text-2xl text-gray-800">{currentChallenge.title}</CardTitle>
            {currentChallenge.scenario && (
              <div className="bg-gradient-to-r from-cyan-50 to-violet-50 p-3 rounded-xl border border-cyan-200 mt-2">
                <p className="text-gray-600 italic">{currentChallenge.scenario}</p>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question */}
            <div className="bg-gradient-to-r from-violet-100 to-cyan-100 p-4 rounded-xl border-2 border-violet-200">
              <p className="text-lg font-semibold text-gray-800">{currentChallenge.question}</p>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {currentChallenge.options.map((option) => {
                const isSelected = selectedAnswer === option.id
                const isCorrect = option.isCorrect
                const showCorrectness = showResult

                let className = "p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 "
                
                if (showCorrectness) {
                  if (isCorrect) {
                    className += "bg-green-50 border-green-400 "
                  } else if (isSelected && !isCorrect) {
                    className += "bg-red-50 border-red-400 "
                  } else {
                    className += "bg-gray-50 border-gray-200 opacity-60 "
                  }
                } else if (isSelected) {
                  className += "bg-violet-50 border-violet-400 shadow-lg scale-[1.02] "
                } else {
                  className += "bg-white border-gray-200 hover:border-violet-300 hover:shadow-md hover:scale-[1.01] "
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showResult}
                    className={className}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="flex-1 text-left font-medium text-gray-800">{option.label}</span>
                    {showCorrectness && isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    )}
                    {showCorrectness && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Result Section */}
            {showResult && (
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <div className={`p-4 rounded-xl border-2 ${
                  currentChallenge.options.find(o => o.id === selectedAnswer)?.isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-orange-50 border-orange-300"
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">
                      {currentChallenge.options.find(o => o.id === selectedAnswer)?.isCorrect ? "🎉" : "💡"}
                    </span>
                    <div>
                      <p className="font-bold text-gray-800 mb-2">
                        {currentChallenge.options.find(o => o.id === selectedAnswer)?.isCorrect
                          ? "Correct! You're thinking like a tech expert!"
                          : "Not quite - but now you know!"}
                      </p>
                      <p className="text-gray-700">{currentChallenge.explanation}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      <strong className="text-yellow-700">Fun Fact:</strong> {currentChallenge.funFact}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleNextChallenge}
                  size="lg"
                  className="w-full text-lg h-12 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white hover:scale-105 transition-all shadow-lg"
                >
                  {currentChallengeIndex < shuffledChallenges.length - 1 ? (
                    <>
                      Next Challenge! <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      See Results! <Trophy className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Check Answer Button */}
            {!showResult && (
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                size="lg"
                className={`w-full text-lg h-12 transition-all shadow-lg ${
                  selectedAnswer
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Zap className="w-5 h-5 mr-2" />
                Check My Answer! ⚡
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
