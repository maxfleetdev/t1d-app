export type Profile = {
    basalRate: number,              // how much background insulin in system
    insulinToCarbRatio: number,     // how much 1 unit counteracts carbs
    insulinSensitivity: number,     // how much 1 unit reduces glucose 
    insulinActionTime: number,      // how long insulin works for
}

export type InitialState = {
    glucose: number,    // starting glucose
    cob: number,        // carbs on board
    iob: number,        // initial active insulin
}

export type SimulatorEvents = {
    eventType: "food",
    glycemicIndex: "fast" | "medium" | "slow",
    foodCarbs: number,
    offsetMinutes: number,
} | {
    eventType: "insulin",
    units: number,
    offsetMinutes: number,
} | {
    eventType: "exercise",
    intensity: "low" | "medium" | "high",
    durationMinutes: number,
    offsetMinutes: number,
}

export type SimulationProfile = {
    profile: Profile,
    initialState: InitialState,
    simulatorEvents: SimulatorEvents[],
}