import EnergyScoreHero from './energy-score-hero';
import OptimalDayTimeline from './optimal-day-timeline';
import SmartOpportunities from './smart-opportunities';
import WeeklyWins from './weekly-wins';
import QuickActions from './quick-actions';
import TodaysVitals from './todays-vitals';

export default function IntelligenceTab() {
  return (
    <div className="space-y-6">
      <EnergyScoreHero />
      <TodaysVitals />
      <OptimalDayTimeline />
      <SmartOpportunities />
      <WeeklyWins />
      <QuickActions />
    </div>
  );
}
