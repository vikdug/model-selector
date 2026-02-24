import HeroSection from './components/HeroSection';
import AssessmentSection from './components/AssessmentSection';
import ResultsSection from './components/ResultsSection';
import RecommendationsSection from './components/RecommendationsSection';
import { useAssessment } from './hooks/useAssessment';

export default function App() {
  const { scores, setScore, reset, hasScores, selections, toggleActivity, manualOverride } = useAssessment();

  return (
    <div style={{ minHeight: "100vh" }}>
      <HeroSection />
      <style>{`
        @media (max-width: 1024px) {
          .main-layout {
            grid-template-columns: 1fr !important;
          }
          .results-sticky {
            position: static !important;
          }
        }
      `}</style>
      <div
        className="main-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: 20,
          maxWidth: 1600,
          margin: "0 auto",
          padding: "0 20px",
          alignItems: "start",
        }}
      >
        <AssessmentSection
          scores={scores}
          onScoreChange={setScore}
          onReset={reset}
          hasScores={hasScores}
          selections={selections}
          onToggleActivity={toggleActivity}
          manualOverride={manualOverride}
        />
        <div className="results-sticky" style={{ position: "sticky", top: 20 }}>
          <ResultsSection scores={scores} hasScores={hasScores} />
        </div>
      </div>
      {hasScores && <RecommendationsSection scores={scores} />}
    </div>
  );
}
