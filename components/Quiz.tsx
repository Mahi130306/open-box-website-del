'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const questions = [
  {
    id: 1,
    text: 'What describes you best?',
    options: [
      { value: 'developer', label: 'Developer - I make things' },
      { value: 'learner', label: 'Learner - I want to skill up' },
      { value: 'gamer', label: 'Gamer - I love gaming' },
      { value: 'explorer', label: 'Explorer - I want to discover' },
    ],
  },
  {
    id: 2,
    text: 'What are you looking for?',
    options: [
      { value: 'projects', label: 'Projects to collaborate on' },
      { value: 'mentorship', label: 'Mentorship and guidance' },
      { value: 'events', label: 'Events and workshops' },
      { value: 'community', label: 'A chill community' },
    ],
  },
  {
    id: 3,
    text: 'How much time do you have?',
    options: [
      { value: 'daily', label: 'Active daily' },
      { value: 'weekly', label: 'Few times a week' },
      { value: 'browsing', label: 'Just browsing' },
    ],
  },
]

const recommendations = {
  default: {
    name: 'Jn.',
    slug: 'jn',
    description: 'The main hub for general building and community discussions.',
    comingSoon: false,
  },
  developer: {
    name: 'Dev',
    slug: 'dev',
    description: 'Technical deep dives, coding help, and project showcases.',
    comingSoon: false,
  },
  gamer: {
    name: 'GG',
    slug: 'gg',
    description: 'Gaming focused community with tournaments and game dev chats.',
    comingSoon: false,
  },
  learner: {
    name: 'Study',
    slug: 'study',
    description: 'Coming soon - dedicated study groups and learning resources.',
    comingSoon: true,
  },
  networker: {
    name: 'Network',
    slug: 'network',
    description: 'Coming soon - connect with professionals and grow your network.',
    comingSoon: true,
  },
}

export function Quiz() {
  return null; // programmatically deactivated

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    // Question 1 answered: dispatch window event to filter/highlight directory search
    if (currentQuestion === 0) {
      window.dispatchEvent(new CustomEvent('quiz-selection', { detail: { value } }))
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
    }
  }

  const getRecommendation = () => {
    if (answers[1] === 'gamer') return recommendations.gamer
    if (answers[1] === 'developer') return recommendations.developer
    if (answers[1] === 'learner') return recommendations.learner
    if (answers[1] === 'explorer') return recommendations.default
    if (answers[2] === 'mentorship') return recommendations.networker
    if (answers[2] === 'browsing') return recommendations.default
    return recommendations.default
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setCompleted(false)
  }

  if (completed) {
    const rec = getRecommendation()
    return (
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-8">Find Your Fit</h2>
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle>We recommend: {rec.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{rec.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full min-h-[44px]" disabled={rec.comingSoon}>
                <a href={rec.comingSoon ? '#' : `/servers/${rec.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (rec.comingSoon) {
                      e.preventDefault()
                      alert(`${rec.name} server coming soon!`)
                    }
                  }}
                >
                  {rec.comingSoon ? `${rec.name} - Coming Soon` : `View ${rec.name} Server`}
                </a>
              </Button>
              <Button variant="outline" onClick={resetQuiz} className="ml-2 min-h-[44px]">
                Re-answer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    )
  }

  const q = questions[currentQuestion]
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-8">Find Your Fit</h2>
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle>{q.text}</CardTitle>
            <CardDescription className="text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {q.options.map((opt) => (
              <Button
                key={opt.value}
                variant="outline"
                className="w-full justify-start text-left min-h-[44px]"
                onClick={() => handleAnswer(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
