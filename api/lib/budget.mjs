const profiles = {
  "Victoria Falls": { accommodation: 95, meals: 45, transport: 30, activity: 90, buffer: 45 },
  "Lake Kariba": { accommodation: 70, meals: 38, transport: 28, activity: 70, buffer: 35 },
  "Great Zimbabwe": { accommodation: 55, meals: 30, transport: 22, activity: 30, buffer: 25 }
};

function groupMultiplier(people) {
  if (people >= 30) return 0.9;
  if (people >= 15) return 0.92;
  if (people >= 8) return 0.95;
  return 1;
}

export function estimateBudget(destination, days, people = 1) {
  const profile = profiles[destination] ?? profiles["Great Zimbabwe"];
  const safeDays = Math.max(1, Number(days) || 1);
  const safePeople = Math.max(1, Math.round(Number(people) || 1));
  const nights = Math.max(0, safeDays - 1);
  const perPerson = Math.ceil(((profile.accommodation * nights) + (profile.meals * safeDays) + (profile.transport * safeDays) + profile.activity + profile.buffer) / 10) * 10;
  const total = Math.ceil((perPerson * safePeople * groupMultiplier(safePeople)) / 10) * 10;
  return { destination, days: safeDays, people: safePeople, perPerson, total };
}
