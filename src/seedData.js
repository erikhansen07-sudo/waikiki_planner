// Seed itinerary for the Hansen family Waikiki trip, May 19–26, 2026.
// Family: two parents, 8-year-old, 4-year-old daughter.
// House rules: hotel breakfast every morning. No trolleys. No sunrise beach walks.
// Shape:
//   days: [{ id, dateISO, label, subtitle, stopIds: [] }]
//   stops: { [stopId]: { id, title, tag, time, confirmed, notes } }
//   ideas: [stopId, stopId, ...]     // unscheduled bin
//
// Tags: 'Beach' | 'Food' | 'Adventure' | 'Culture' | 'Show' | 'Shopping' | 'Travel'

const s = (id, title, tag, time, confirmed, notes = '') => ({
  id,
  title,
  tag,
  time,
  confirmed,
  notes,
})

const stopsList = [
  // Tue May 19 — Arrival
  s('s-19-1', 'Land at HNL + rideshare to hotel', 'Travel', 'Afternoon', true, 'Gather bags, grab leis if pre-ordered. Car seat/booster for the 4yo.'),
  s('s-19-2', 'Quick barefoot walk on Waikiki Beach', 'Beach', '5:30pm', true, 'Stretch the legs, orient the kids to the water.'),
  s('s-19-3', 'Dinner — Cheesecake Factory OR room service', 'Food', '7:00pm', false, 'Whichever wins the "we are tired" vote. Room service is kinder on the 4yo.'),
  s('s-19-4', 'Early bedtime for both kids', 'Travel', '8:30pm', true, 'Jet lag will hit the 4yo hardest. Big week ahead.'),

  // Wed May 20 — First beach day
  s('s-20-1', 'Hotel breakfast on the lanai', 'Food', '8:00am', true, 'Fruit, coffee, easy start. Hotel breakfast is our daily ritual.'),
  s('s-20-2', 'Kuhio Beach — swim + boogie boards', 'Beach', '9:30am', true, 'Protected swim area — gentle enough for the 4yo.'),
  s('s-20-3', 'Surf lesson for 8yo', 'Adventure', '11:00am', true, 'Book the 2-hr beginner package. Reef shoes + rash guard. 4yo watches from the sand with a parent.'),
  s('s-20-4', "Lunch at Duke's Waikiki", 'Food', '1:15pm', true, 'Beachfront, Hula Pie for dessert.'),
  s('s-20-5', 'Nap / pool block', 'Beach', '3:00pm', true, 'The 4yo needs this — adults trade off at the pool with the 8yo.'),
  s('s-20-6', 'Kuhio Beach Hula Show', 'Show', '6:30pm', true, 'Free show at Kuhio Beach Hula Mound. Arrive 15 min early for torch lighting.'),

  // Thu May 21 — Aquarium + ʻAuana Cirque
  s('s-21-0', 'Hotel breakfast', 'Food', '8:00am', true, 'Fuel up before the aquarium.'),
  s('s-21-1', 'Waikiki Aquarium', 'Culture', '10:00am', true, 'Monk seals, reef exhibit. ~2 hours. 4yo will love the touch tank.'),
  s('s-21-2', "Ululani's Shave Ice", 'Food', '12:30pm', true, 'Get the snow cap + li hing mui on one. Kid size for the 4yo.'),
  s('s-21-3', 'Beach + pool afternoon', 'Beach', '1:30pm', true, 'Low-key before the show. Try to get a nap into the 4yo.'),
  s('s-21-4', 'Dinner before the show', 'Food', '5:15pm', false, 'Something quick near the Royal Hawaiian Theater.'),
  s('s-21-5', 'ʻAuana by Cirque du Soleil', 'Show', '7:00pm', true, 'Royal Hawaiian Theater. Arrive by 6:30. Bag check. 4yo may fade late — quiet snack in the bag.'),

  // Fri May 22 — North Shore + fireworks
  s('s-22-1', 'Hotel breakfast + pack the car', 'Food', '7:30am', true, 'Water, snacks, swimsuits, towels. Long day for the 4yo.'),
  s('s-22-2', 'Dole Plantation', 'Culture', '9:30am', true, 'Pineapple maze + Dole Whip. The train is a win with the 4yo.'),
  s('s-22-3', 'Haleiwa town walk', 'Shopping', '11:30am', true, 'Matsumoto shave ice, surf shops.'),
  s('s-22-4', 'Waimea Valley — botanical garden + falls', 'Adventure', '1:00pm', true, 'Bring swimsuits. For the 4yo: life vest under the falls + an adult always holding.'),
  s('s-22-5', 'Turtle Beach (Laniakea)', 'Beach', '3:30pm', true, 'Look for honu. Volunteers rope off resting turtles.'),
  s('s-22-6', 'Drive back to Waikiki', 'Travel', '5:00pm', true, 'Plan for traffic. The 4yo will almost certainly nap in the car.'),
  s('s-22-7', 'Hilton Lagoon fireworks', 'Show', '7:45pm', true, 'Park at Ala Moana or walk from hotel. Blanket + light layer. Headphones for the 4yo if she is sound-sensitive.'),

  // Sat May 23 — Recovery beach day
  s('s-23-1', 'Hotel breakfast — no alarms', 'Food', '9:00am', true, 'Everybody sleeps in.'),
  s('s-23-2', 'Outrigger canoe ride off Waikiki', 'Adventure', '11:00am', true, 'Walk-up at the beach stands. ~45 min. Confirm the 4yo meets the age/weight min before lining up.'),
  s('s-23-3', 'Beach reading + kids in the water', 'Beach', '1:00pm', true, 'Umbrella rental recommended.'),
  s('s-23-4', "Dinner at Mahina & Sun's", 'Food', '6:30pm', true, 'Reservations. Locally sourced, ask about the catch of the day.'),

  // Sun May 24 — Beach + shopping
  s('s-24-1', 'Hotel breakfast', 'Food', '8:30am', true, 'Daily ritual, slower pace today.'),
  s('s-24-2', 'Morning beach block', 'Beach', '9:30am', true, 'Before the heat.'),
  s('s-24-3', 'International Market Place', 'Shopping', '1:00pm', true, 'Lunch at the food hall, wander the shops. Stroller helps with the 4yo.'),
  s('s-24-5', 'Sunset on the beach', 'Beach', '7:00pm', true, 'Pick a spot near the Pink Palace.'),

  // Mon May 25 — Polynesian Cultural Center
  s('s-25-0', 'Hotel breakfast', 'Food', '8:30am', true, 'Eat well — PCC is a long day.'),
  s('s-25-1', 'Motorcoach pickup to PCC', 'Travel', '10:30am', true, 'Confirm pickup location with the hotel bell desk.'),
  s('s-25-2', 'Six island villages', 'Culture', '12:30pm', true, 'Hawaiʻi, Samoa, Aotearoa, Fiji, Tahiti, Tonga. Pace yourselves — carrier or stroller for the 4yo.'),
  s('s-25-3', 'Canoe Pageant', 'Show', '2:30pm', true, 'On the lagoon. Good photo spot.'),
  s('s-25-4', 'Aliʻi Luau buffet', 'Food', '5:00pm', true, 'Kalua pig, poi, haupia. The kids will want extra pineapple.'),
  s('s-25-5', 'Hā: Breath of Life evening show', 'Show', '7:30pm', true, 'No photography during the show. Late for the 4yo — expect her to sleep on the motorcoach home.'),

  // Tue May 26 — Checkout
  s('s-26-0', 'Last hotel breakfast', 'Food', '8:00am', true, 'Linger over coffee. One more round of the 4yo\'s favorite pastry.'),
  s('s-26-2', 'Pack + final room sweep', 'Travel', '9:30am', true, 'Check drawers, safe, bathroom hooks.'),
  s('s-26-3', 'Lei greeting for the ride to the airport', 'Culture', '1:30pm', false, 'A nice closing ritual. Pre-order through the concierge.'),
  s('s-26-4', 'Hotel checkout', 'Travel', '4:00pm', true, 'Request late checkout if available.'),
  s('s-26-5', 'Depart HNL', 'Travel', '6:30pm', true, 'Confirm flight 24 hrs prior. Car seat/booster for the 4yo in the rideshare.'),
]

// Ideas bin — floaters we may or may not schedule
const ideasList = [
  s('i-1', 'Diamond Head sunrise hike', 'Adventure', '', false, 'Reservation required for non-residents. Tough with a 4yo — probably skip or do with just the 8yo.'),
  s('i-2', 'Leonard\'s Bakery malasadas run', 'Food', '', false, 'Worth the detour. Original location off Kapahulu.'),
  s('i-3', 'Kualoa Ranch movie-sites tour', 'Adventure', '', false, 'Jurassic Park filming locations. Half-day. Pick the bus tour so the 4yo can join.'),
  s('i-4', 'Pearl Harbor + USS Arizona Memorial', 'Culture', '', false, 'Timed tickets release 8 weeks ahead. 4yo may be restless — have a plan.'),
  s('i-5', 'Helicopter tour of Oahu', 'Adventure', '', false, 'Big splurge. Check minimum-age and weight policy for the 4yo.'),
  s('i-6', 'Sans Souci beach (Gold Coast) picnic', 'Beach', '', false, 'Less crowded than Waikiki proper. Good for the 4yo.'),
  s('i-7', 'Bishop Museum', 'Culture', '', false, 'Rainy-day backup. Hawaiian natural + cultural history.'),
  s('i-8', 'Koko Head stair climb', 'Adventure', '', false, 'Tough. Skip with the kids.'),
  s('i-9', 'Barefoot Beach Café brunch', 'Food', '', false, 'Former Sun May 24 pick — swapped out for hotel breakfast. Keep as a mid-morning option.'),
]

export const buildSeedState = () => {
  const stops = {}
  stopsList.forEach(st => { stops[st.id] = st })
  ideasList.forEach(st => { stops[st.id] = st })

  const days = [
    { id: 'd-19', dateISO: '2026-05-19', label: 'Tue, May 19', subtitle: 'Arrival night',              stopIds: ['s-19-1','s-19-2','s-19-3','s-19-4'] },
    { id: 'd-20', dateISO: '2026-05-20', label: 'Wed, May 20', subtitle: 'First beach day',            stopIds: ['s-20-1','s-20-2','s-20-3','s-20-4','s-20-5','s-20-6'] },
    { id: 'd-21', dateISO: '2026-05-21', label: 'Thu, May 21', subtitle: 'Aquarium · ʻAuana',          stopIds: ['s-21-0','s-21-1','s-21-2','s-21-3','s-21-4','s-21-5'] },
    { id: 'd-22', dateISO: '2026-05-22', label: 'Fri, May 22', subtitle: 'North Shore · Fireworks',    stopIds: ['s-22-1','s-22-2','s-22-3','s-22-4','s-22-5','s-22-6','s-22-7'] },
    { id: 'd-23', dateISO: '2026-05-23', label: 'Sat, May 23', subtitle: 'Recovery beach day',         stopIds: ['s-23-1','s-23-2','s-23-3','s-23-4'] },
    { id: 'd-24', dateISO: '2026-05-24', label: 'Sun, May 24', subtitle: 'Beach · Market Place',       stopIds: ['s-24-1','s-24-2','s-24-3','s-24-5'] },
    { id: 'd-25', dateISO: '2026-05-25', label: 'Mon, May 25', subtitle: 'Polynesian Cultural Center', stopIds: ['s-25-0','s-25-1','s-25-2','s-25-3','s-25-4','s-25-5'] },
    { id: 'd-26', dateISO: '2026-05-26', label: 'Tue, May 26', subtitle: 'Checkout day',               stopIds: ['s-26-0','s-26-2','s-26-3','s-26-4','s-26-5'] },
  ]

  return {
    version: 2,
    days,
    stops,
    ideas: ideasList.map(i => i.id),
  }
}

export const TAGS = ['Beach', 'Food', 'Adventure', 'Culture', 'Show', 'Shopping', 'Travel']
