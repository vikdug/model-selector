import HeroSection from './components/HeroSection';
import AssessmentSection from './components/AssessmentSection';
import ResultsSection from './components/ResultsSection';
import RecommendationsSection from './components/RecommendationsSection';
import Footer from './components/Footer';
import { useAssessment } from './hooks/useAssessment';

export default function App() {
  const { scores, setScore, reset, hasScores } = useAssessment();

  return (
    <div style={{ minHeight: "100vh" }}>
      <HeroSection />
      <AssessmentSection
        scores={scores}
        onScoreChange={setScore}
        onReset={reset}
        hasScores={hasScores}
      />
      <ResultsSection scores={scores} hasScores={hasScores} />
      {hasScores && <RecommendationsSection scores={scores} />}
      <Footer />
    </div>
  );
}
