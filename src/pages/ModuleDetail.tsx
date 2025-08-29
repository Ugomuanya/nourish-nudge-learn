import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { useGameification } from '@/hooks/useGameification';
import { modules } from '@/data/modules';
import { Question, QuizResult } from '@/types';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Trophy, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ModuleDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user, completeQuiz, loading } = useGameification();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<'content' | 'quiz' | 'results'>('content');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [newBadges, setNewBadges] = useState<any[]>([]);

  const module = modules.find(m => m.id === moduleId);

  useEffect(() => {
    // Reset state when module changes
    setCurrentStep('content');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizResult(null);
    setNewBadges([]);
  }, [moduleId]);

  if (!module) {
    return <Navigate to="/modules" replace />;
  }

  const currentQuestion = module.quiz.questions[currentQuestionIndex];
  const totalQuestions = module.quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnsweredCurrentQuestion = selectedAnswers[currentQuestion?.id] !== undefined;

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  const finishQuiz = async () => {
    const score = module.quiz.questions.reduce((acc, question) => {
      const selectedAnswer = selectedAnswers[question.id];
      return acc + (selectedAnswer === question.correctAnswer ? 1 : 0);
    }, 0);

    const pointsEarned = score * 10; // 10 points per correct answer
    const passed = score >= Math.ceil(totalQuestions * 0.6); // 60% to pass

    const result: QuizResult = {
      score,
      totalQuestions,
      pointsEarned,
      passed
    };

    setQuizResult(result);
    
    // Award points and badges
    const earnedBadges = await completeQuiz(moduleId!, result);
    setNewBadges(earnedBadges);
    
    // Show success toast
    if (passed) {
      toast({
        title: "Module Completed! 🎉",
        description: `You earned ${pointsEarned} points${earnedBadges.length > 0 ? ` and ${earnedBadges.length} new badge(s)!` : '!'}`,
      });
    } else {
      toast({
        title: "Quiz Complete",
        description: "You can retake the quiz to improve your score!",
        variant: "destructive"
      });
    }
    
    setCurrentStep('results');
  };

  const startQuiz = () => {
    setCurrentStep('quiz');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
  };

  const retakeQuiz = () => {
    setCurrentStep('quiz');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizResult(null);
    setNewBadges([]);
  };

  const renderContent = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/modules" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Modules
        </Link>
        <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
        <p className="text-xl text-muted-foreground">{module.description}</p>
      </div>

      <Card className="mb-8">
        <CardContent className="prose prose-lg max-w-none p-8">
          <div dangerouslySetInnerHTML={{ __html: module.content }} />
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={startQuiz} size="lg" className="bg-gradient-primary hover:shadow-glow">
          Start Quiz
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Quiz: {module.title}</h1>
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Badge>
        </div>
        <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={selectedAnswers[currentQuestion.id]?.toString()}
            onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNextQuestion}
              disabled={!hasAnsweredCurrentQuestion}
              className={isLastQuestion ? 'bg-gradient-primary' : ''}
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next'}
              {!isLastQuestion && <ArrowRight className="h-4 w-4 ml-2" />}
              {isLastQuestion && <Trophy className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
          quizResult!.passed ? 'bg-success/20' : 'bg-destructive/20'
        }`}>
          {quizResult!.passed ? (
            <CheckCircle className="h-10 w-10 text-success" />
          ) : (
            <XCircle className="h-10 w-10 text-destructive" />
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {quizResult!.passed ? 'Congratulations!' : 'Quiz Complete'}
        </h1>
        <p className="text-xl text-muted-foreground">
          You scored {quizResult!.score} out of {quizResult!.totalQuestions} questions correctly
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Score:</span>
              <span className="font-semibold">{quizResult!.score}/{quizResult!.totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span>Percentage:</span>
              <span className="font-semibold">
                {Math.round((quizResult!.score / quizResult!.totalQuestions) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Points Earned:</span>
              <span className="font-semibold text-primary">+{quizResult!.pointsEarned}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge variant={quizResult!.passed ? 'default' : 'destructive'}>
                {quizResult!.passed ? 'Passed' : 'Failed'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {newBadges.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                New Badges Earned!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {newBadges.map(badge => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <div className="font-semibold">{badge.name}</div>
                      <div className="text-sm text-muted-foreground">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Review */}
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {module.quiz.questions.map((question, index) => {
              const selectedAnswer = selectedAnswers[question.id];
              const isCorrect = selectedAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border-l-4 pl-4 py-2 border-l-muted">
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-muted-foreground mb-1">
                        Your answer: {question.options[selectedAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-success mb-1">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground italic">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link to="/modules">Back to Modules</Link>
        </Button>
        {!quizResult!.passed && (
          <Button onClick={retakeQuiz} className="bg-gradient-secondary">
            Retake Quiz
          </Button>
        )}
        <Button asChild>
          <Link to="/profile">View Profile</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      {loading ? (
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading user data...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          {currentStep === 'content' && renderContent()}
          {currentStep === 'quiz' && renderQuiz()}
          {currentStep === 'results' && renderResults()}
        </div>
      )}
    </Layout>
  );
};

export default ModuleDetail;