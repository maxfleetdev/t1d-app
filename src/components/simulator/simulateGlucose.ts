import type { SimulationProfile } from './SimulationProfile';

export type GlucosePoint = {
  time: string;
  Glucose: number;
  events?: SimulationEventMarker[];
};

export type SimulationEventMarker = {
  type: 'food' | 'insulin' | 'exercise';
  label: string;
};

const STEP_MINUTES = 15;
const HORIZON_MINUTES = 360;

// A small, educational Bergman-style model using a 15-minute Euler step.
// Created using Studio Code Agent GPT 5.6 Terra
export function simulateGlucose(profile: SimulationProfile): GlucosePoint[] {
  const { initialState, profile: settings, simulatorEvents } = profile;
  const points: GlucosePoint[] = [];
  const eventByTime = new Map<number, SimulationProfile['simulatorEvents']>();

  for (const event of simulatorEvents) {
    const eventTime = Math.max(0, Math.min(HORIZON_MINUTES, Math.round(event.offsetMinutes / STEP_MINUTES) * STEP_MINUTES));
    const eventsAtTime = eventByTime.get(eventTime) ?? [];
    eventsAtTime.push(event);
    eventByTime.set(eventTime, eventsAtTime);
  }

  let glucose = Math.max(2, initialState.glucose);
  let insulinAction = 0;
  let insulinRemote = Math.max(0, initialState.iob);
  let mealAppearance = 0;
  const mealPools: Array<{ remaining: number; duration: number }> = [];
  const insulinPools: Array<{ remaining: number; duration: number }> = [];

  for (let time = 0; time <= HORIZON_MINUTES; time += STEP_MINUTES) {
    const eventsAtTime = eventByTime.get(time) ?? [];
    points.push({
      time: `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`,
      Glucose: Number(glucose.toFixed(2)),
      events: eventsAtTime.map((event) => event.eventType === 'food'
        ? { type: 'food', label: `${event.foodCarbs}g meal` }
        : event.eventType === 'insulin'
          ? { type: 'insulin', label: `${event.units}u insulin` }
          : { type: 'exercise', label: `${event.intensity} exercise` }),
    });

    for (const event of eventsAtTime) {
      if (event.eventType === 'food') {
        const duration = event.glycemicIndex === 'fast' ? 60 : event.glycemicIndex === 'medium' ? 90 : 120;
        mealPools.push({ remaining: Math.max(0, event.foodCarbs) * 10, duration });
      }
      if (event.eventType === 'insulin') {
        insulinPools.push({ remaining: Math.max(0, event.units), duration: Math.max(60, settings.insulinActionTime * 60) });
      }
    }

    const absorbedCarbs = mealPools.reduce((total, pool) => {
      const absorbed = Math.min(pool.remaining, pool.remaining * STEP_MINUTES / pool.duration);
      pool.remaining -= absorbed;
      return total + absorbed;
    }, 0);
    const deliveredInsulin = insulinPools.reduce((total, pool) => {
      const delivered = Math.min(pool.remaining, pool.remaining * STEP_MINUTES / pool.duration);
      pool.remaining -= delivered;
      return total + delivered;
    }, 0);

    mealAppearance += absorbedCarbs;
    insulinRemote += deliveredInsulin;

    const insulinDecay = Math.exp(-STEP_MINUTES / Math.max(60, settings.insulinActionTime * 60));
    insulinRemote *= insulinDecay;
    insulinAction = insulinAction * 0.75 + insulinRemote * 0.25;

    const insulinDrop = insulinAction * settings.insulinSensitivity * STEP_MINUTES / 60;
    const carbohydrateRise = mealAppearance / Math.max(1, settings.insulinToCarbRatio) * settings.insulinSensitivity / 60;
    const naturalReturn = (initialState.glucose - glucose) * 0.01 * STEP_MINUTES;

    // The starting glucose is assumed to be in balance with basal insulin and endogenous production.
    glucose = Math.max(2, glucose + carbohydrateRise - insulinDrop + naturalReturn);
    mealAppearance *= 0.72;
  }

  return points;
}