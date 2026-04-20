// Seed itinerary for the Hansen family Waikiki trip, May 19–26, 2026.
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
  s('s-19-1', 'Land at HNL + rideshare to hotel', 'Travel', 'Afternoon', true, 'Gather bags, grab leis if pre-ordered.'),
  s('s-19-2', 'Quick barefoot walk on Waikiki Beach', 'Beach', '5:30pm', true, 'Stretch the legs, orient the kids to the water.'),
  s('s-19-3', 'Dinner — Cheesecake Factory OR room service', 'Food', '7:00pm', false, 'Whichever wins the "we are tired" vote.'),
  s('s-19-4', 'Early bedtime for the 8yo', 'Travel', '9:00pm', true, 'Jet lag + big week ahead.'),

  // Wed May 20 — First beach day
  s('s-20-1', 'Breakfast on the lanai', 'Food', '8:00am', true, 'Fruit, coffee, easy start.'),
  s('s-20-2', 'Kuhio Beach — swim + boogie boards', 'Beach', '9:30am', true, 'Protected swim area, good for beginners.'),
  s('s-20-3', 'Surf lesson for 8yo', 'Adventure', '11:00am', true, 'Book the 2-hr beginner package. Reef shoes + rash guard.'),
  s('s-20-4', "Lunch at Duke's Waikiki", 'Food', '1:15pm', true, 'Beachfront, Hula Pie for dessert.'),
  s('s-20-5', 'Nap / pool block', 'Beach', '3:00pm', false, 'Optional. Adults nap, kid swims.'),
  s('s-20-6', 'Kuhio Beach Hula Show', 'Show', '6:30pm', true, 'Free show at Kuhio Beach Hula Mound. Arrive 15 min early for torch lighting.'),

  // Thu May 21 — Aquarium + ʻAuana Cirque
  s('s-21-1', 'Waikiki Aquarium', 'Culture', '10:00am', true, 'Monk seals, reef exhibit. ~2 hours.'),
  s('s-21-2', "Ululani's Shave Ice", 'Food', '12:30pm', true, 'Get the snow cap + li hing mui on one.'),
  s('s-21-3', 'Beach + pool afternoon', 'Beach', '1:30pm', true, 'Low-key before the show.'),
  s('s-21-4', "Dinner before the show", 'Food', '5:15pm', false, 'Something quick near the Royal Hawaiian Theater.'),
  s('s-21-5', 'ʻAuana by Cirque du Soleil', 'Show', '7:00pm', true, 'Royal Hawaiian Theater. Arrive by 6:30. Bag check.'),

  // Fri May 22 — North Shore + fireworks
  s('s-22-1', 'Early breakfast + pack the car', 'Food', '7:30am', true, 'Water, snacks, swimsuits, towels.'),
  s('s-22-2', 'Dole Plantation', 'Culture', '9:30am', true, 'Pineapple maze + Dole Whip. Train is optional.'),
  s('s-22-3', "Haleiwa town walk", 'Shopping', '11:30am', true, 'Matsumoto shave ice, surf shops.'),
  s('s-22-4', 'Waimea Valley — botanical garden + falls', 'Adventure', '1:00pm', true, 'Bring swimsuits if swimming under the falls.'),
  s('s-22-5', "Turtle Beach (Laniakea)", 'Beach', '3:30pm', true, 'Look for honu. Volunteers rope off resting turtles.'),
  s('s-22-6', 'Drive back to Waikiki', 'Travel', '5:00pm', true, 'Plan for traffic.'),
  s('s-22-7', 'Hilton Lagoon fireworks', 'Show', '7:45pm', true, 'Park at Ala Moana or walk from hotel. Blanket + light layer.'),

  // Sat May 23 — Recovery beach day
  s('s-23-1', 'Slow breakfast', 'Food', '9:00am', true, 'No alarms.'),
  s('s-23-2', 'Outrigger canoe ride off Waikiki', 'Adventure', '11:00am', true, 'Walk-up at the beach stands. ~45 min.'),
  s('s-23-3', 'Beach reading + kid in the water', 'Beach', '1:00pm', true, 'Umbrella rental recommended.'),
  s('s-23-4', "Dinner at Mahina & Sun's", 'Food', '6:30pm', true, 'Reservations. Locally sourced, ask about the catch of the day.'),

  // Sun May 24 — Beach + shopping
  s('s-24-1', 'Breakfast at Barefoot Beach Café', 'Food', '8:30am', true, 'Acai bowls, toes in the sand.'),
  s('s-24-2', 'Morning beach block', 'Beach', '9:30am', true, 'Before the heat.'),
  s('s-24-3', 'International Market Place', 'Shopping', '1:00pm', true, 'Lunch at the food hall, wander the shops.'),
  s('s-24-4', 'Waikiki Trolley — Pink Line loop', 'Travel', '3:30pm', false, 'Easy way to see more of Waikiki without driving.'),
  s('s-24-5', 'Sunset on the beach', 'Beach', '7:00pm', true, 'Pick a spot near the Pink Palace.'),

  // Mon May 25 — Polynesian Cultural Center
  s('s-25-1', 'Motorcoach pickup to PCC', 'Travel', '10:30am', true, 'Confirm pickup location with the hotel bell desk.'),
  s('s-25-2', 'Six island villages', 'Culture', '12:30pm', true, 'Hawaiʻi, Samoa, Aotearoa, Fiji, Tahiti, Tonga. Pace yourselves.'),
  s('s-25-3', 'Canoe Pageant', 'Show', '2:30pm', true, 'On the lagoon. Good photo spot.'),
  s('s-25-4', 'Aliʻi Luau buffet', 'Food', '5:00pm', true, 'Kalua pig, poi, haupia. The 8yo will want extra pineapple.'),
  s('s-25-5', 'Hā: Breath of Life evening show', 'Show', '7:30pm', true, 'No photography during the show. Motorcoach home after.'),

  // Tue May 26 — Checkout
  s('s-26-1', 'Sunrise beach walk', 'Beach', '6:15am', true, 'Last barefoot moment. Bring coffee.'),
  s('s-26-2', 'Pack + final room sweep', 'Travel', '9:00am', true, 'Check drawers, safe, bathroom hooks.'),
  s('s-26-3', 'Lei greeting for the ride to the airport', 'Culture', '1:30pm', false, 'A nice closing ritual. Pre-order through the concierge.'),
  s('s-26-4', 'Hotel checkout', 'Travel', '4:00pm', true, 'Request late checkout if available.'),
  s('s-26-5', 'Depart HNL', 'Travel', '6:30pm', true, 'Confirm flight 24 hrs prior.'),
]

// Ideas bin — floaters we may or may not schedule
const ideasList = [
  s('i-1', 'Diamond Head sunrise hike', 'Adventure', '', false, 'Reservation required for non-residents. Earlybird.'),
  s('i-2', 'Leonard\'s Bakery malasadas run', 'Food', '', false, 'Worth the detour. Original location off Kapahulu.'),
  s('i-3', 'Kualoa Ranch movie-sites tour', 'Adventure', '', false, 'Jurassic Park filming locations. Half-day.'),
  s('i-4', 'Pearl Harbor + USS Arizona Memorial', 'Culture', '', false, 'Timed tickets release 8 weeks ahead.'),
  s('i-5', 'Helicopter tour of Oahu', 'Adventure', '', false, 'Big splurge. Doors-on for the kid.'),
  s('i-6', "Sans Souci beach (Gold Coast) picnic", 'Beach', '', false, 'Less crowded than Waikiki proper.'),
  s('i-7', 'Bishop Museum', 'Culture', '', false, 'Rainy-day backup. Hawaiian natural + cultural history.'),
  s('i-8', 'Koko Head stair climb', 'Adventure', '', false, 'Tough. Skip with the 8yo.'),
]

export const buildSeedState = () => {
  const stops = {}
  stopsList.forEach(st => { stops[st.id] = st })
  ideasList.forEach(st => { stops[st.id] = st })

  const days = [
    { id: 'd-19', dateISO: '2026-05-19', label: 'Tue, May 19', subtitle: 'Arrival night',              stopIds: ['s-19-1','s-19-2','s-19-3','s-19-4'] },
    { id: 'd-20', dateISO: '2026-05-20', label: 'Wed, May 20', subtitle: 'First beach day',            stopIds: ['s-20-1','s-20-2','s-20-3','s-20-4','s-20-5','s-20-6'] },
    { id: 'd-21', dateISO: '2026-05-21', label: 'Thu, May 21', subtitle: 'Aquarium · ʻAuana',          stopIds: ['s-21-1','s-21-2','s-21-3','s-21-4','s-21-5'] },
    { id: 'd-22', dateISO: '2026-05-22', label: 'Fri, May 22', subtitle: 'North Shore · Fireworks',    stopIds: ['s-22-1','s-22-2','s-22-3','s-22-4','s-22-5','s-22-6','s-22-7'] },
    { id: 'd-23', dateISO: '2026-05-23', label: 'Sat, May 23', subtitle: 'Recovery beach day',         stopIds: ['s-23-1','s-23-2','s-23-3','s-23-4'] },
    { id: 'd-24', dateISO: '2026-05-24', label: 'Sun, May 24', subtitle: 'Beach · Market Place',       stopIds: ['s-24-1','s-24-2','s-24-3','s-24-4','s-24-5'] },
    { id: 'd-25', dateISO: '2026-05-25', label: 'Mon, May 25', subtitle: 'Polynesian Cultural Center', stopIds: ['s-25-1','s-25-2','s-25-3','s-25-4','s-25-5'] },
    { id: 'd-26', dateISO: '2026-05-26', label: 'Tue, May 26', subtitle: 'Checkout day',               stopIds: ['s-26-1','s-26-2','s-26-3','s-26-4','s-26-5'] },
  ]

  return {
    version: 1,
    days,
    stops,
    ideas: ideasList.map(i => i.id),
  }
}

export const TAGS = ['Beach', 'Food', 'Adventure', 'Culture', 'Show', 'Shopping', 'Travel']
