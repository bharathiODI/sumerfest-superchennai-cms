
"use client";
import { useEffect, useState } from 'react'

/* -------------------- TYPES -------------------- */

type Organizer = {
  id: string
  title: string
  subtitle?: string
  icon?: string
}

type EventItem = {
  id: string
  name: string
  time: string
  category: string
  subCategory?: string
  venue: string
  musicians?: string
  organizer?: Organizer
}

type EventsByDate = {
  date: string
  events: EventItem[]
}

type MargazhiEventsProps = {
  sectionTitle: string
  eventsByDate?: EventsByDate[] // changed from flat array
  venueFilter?: string
  categoryFilter?: string[]
  organizerFilter?: Organizer[]
  dateRange?: {
    startDate?: string
    endDate?: string
  }
  displayMode: 'calendar' | 'list' | 'compact'
}

/* -------------------- COMPONENT -------------------- */

export default function MargazhiEventsSectionComponent({
  sectionTitle,
  eventsByDate = [],
  venueFilter,
  categoryFilter,
  organizerFilter,
  dateRange,
  displayMode,
}: MargazhiEventsProps) {
  const [filteredEventsByDate, setFilteredEventsByDate] = useState<EventsByDate[]>([])

  /* -------------------- FILTER LOGIC -------------------- */
  useEffect(() => {
    const filtered = eventsByDate
      .map(({ date, events }) => ({
        date,
        events: events.filter((event) => {
          if (venueFilter && venueFilter !== 'all' && event.venue !== venueFilter) return false
          if (categoryFilter && categoryFilter.length && !categoryFilter.includes(event.category))
            return false
          if (
            organizerFilter &&
            organizerFilter.length &&
            (!event.organizer || !organizerFilter.some((o) => o.id === event.organizer?.id))
          )
            return false
          if (dateRange?.startDate && date < dateRange.startDate) return false
          if (dateRange?.endDate && date > dateRange.endDate) return false
          return true
        }),
      }))
      .filter((day) => day.events.length > 0) // remove empty days

    setFilteredEventsByDate(filtered)
  }, [eventsByDate, venueFilter, categoryFilter, organizerFilter, dateRange])

  /* -------------------- RENDER STATES -------------------- */
  if (!filteredEventsByDate.length) {
    return (
      <section className="py-16 text-center text-gray-400">
        No events found for selected filters
      </section>
    )
  }

  return (
    <section className="py-16">
      <h2 className="mb-8 text-3xl font-semibold">{sectionTitle}</h2>

      {displayMode === 'calendar' && <CalendarView eventsByDate={filteredEventsByDate} />}
      {displayMode === 'list' && <ListView eventsByDate={filteredEventsByDate} />}
      {displayMode === 'compact' && <CompactView eventsByDate={filteredEventsByDate} />}
    </section>
  )
}

/* -------------------- CALENDAR VIEW -------------------- */

function CalendarView({ eventsByDate }: { eventsByDate: EventsByDate[] }) {
  return (
    <div className="space-y-8">
      {eventsByDate.map(({ date, events }) => (
        <div key={date}>
          <h3 className="mb-4 text-xl font-medium">{new Date(date).toDateString()}</h3>

          <div className="grid gap-4 md:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* -------------------- LIST VIEW -------------------- */

function ListView({ eventsByDate }: { eventsByDate: EventsByDate[] }) {
  return (
    <div className="space-y-4">
      {eventsByDate
        .flatMap((day) => day.events)
        .map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
    </div>
  )
}

/* -------------------- COMPACT VIEW -------------------- */

function CompactView({ eventsByDate }: { eventsByDate: EventsByDate[] }) {
  return (
    <ul className="divide-y">
      {eventsByDate
        .flatMap((day) => day.events)
        .map((event) => (
          <li key={event.id} className="py-3">
            <span className="font-medium">{event.time}</span>{' '}
            <span className="ml-2">{event.name}</span>
          </li>
        ))}
    </ul>
  )
}

/* -------------------- EVENT UI -------------------- */

function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="rounded-xl border p-5 shadow-sm hover:shadow-md transition">
      <h4 className="text-lg font-semibold">{event.name}</h4>

      <p className="mt-1 text-sm text-gray-600">
        {event.time} • {event.venue}
      </p>

      {event.musicians && <p className="mt-2 text-sm">{event.musicians}</p>}

      {event.organizer && (
        <div className="mt-3 text-sm text-gray-500">
          {event.organizer.icon} {event.organizer.title}
        </div>
      )}
    </div>
  )
}

function EventRow({ event }: { event: EventItem }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-medium">{event.name}</p>
        <p className="text-sm text-gray-500">
          {event.time} • {event.venue}
        </p>
      </div>

      {event.organizer && (
        <span className="text-sm text-gray-600">
          {event.organizer.icon} {event.organizer.title}
        </span>
      )}
    </div>
  )
}
// import { useEffect, useMemo, useState } from "react";

// /* -------------------- TYPES -------------------- */

// type Organizer = {
//   id: string;
//   title: string;
//   subtitle?: string;
//   icon?: string;
// };

// type EventItem = {
//   id: string;
//   name: string;
//  date: string;
//   time: string;
//   category: string;
//   venue: string;
//   musicians?: string;
//   organizer?: Organizer;
// };

// type MargazhiEventsProps = {
//   sectionTitle: string;
//   venueFilter?: string;
//   categoryFilter?: string[];
//   organizerFilter?: Organizer[];
//   dateRange?: {
//     startDate?: string;
//     endDate?: string;
//   };
//   displayMode: "calendar" | "list" | "compact";
// };

// /* -------------------- COMPONENT -------------------- */

// export default function MargazhiEventsSectionComponent({
//   sectionTitle,
//   venueFilter = "all",
//   categoryFilter,
//   organizerFilter,
//   dateRange,
//   displayMode,
// }: MargazhiEventsProps) {
//   const [events, setEvents] = useState<EventItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* -------------------- BUILD QUERY -------------------- */

//   const whereQuery = useMemo(() => {
//     const where: any = {};

//     if (venueFilter !== "all") {
//       where.venue = { equals: venueFilter };
//     }

//     if (categoryFilter?.length) {
//       where.category = { in: categoryFilter };
//     }

//     if (organizerFilter?.length) {
//       where.organizer = {
//         in: organizerFilter.map(o => o.id),
//       };
//     }

//     if (dateRange?.startDate && dateRange?.endDate) {
//       where.date = {
//         greater_than_equal: dateRange.startDate,
//         less_than_equal: dateRange.endDate,
//       };
//     }

//     return where;
//   }, [venueFilter, categoryFilter, organizerFilter, dateRange]);

//   /* -------------------- FETCH EVENTS -------------------- */

//   useEffect(() => {
//     async function fetchEvents() {
//       setLoading(true);

//       const res = await fetch(
//         `/api/events?limit=500&depth=1&where=${encodeURIComponent(
//           JSON.stringify(whereQuery)
//         )}`
//       );

//       const data = await res.json();
//       setEvents(data.docs || []);
//       setLoading(false);
//     }

//     fetchEvents();
//   }, [whereQuery]);

//   /* -------------------- RENDER STATES -------------------- */

//   if (loading) {
//     return (
//       <section className="py-16 text-center text-gray-500">
//         Loading Margazhi events…
//       </section>
//     );
//   }

//   if (!events.length) {
//     return (
//       <section className="py-16 text-center text-gray-400">
//         No events found for selected filters
//       </section>
//     );
//   }

//   return (
//     <section className="py-16">
//       <h2 className="mb-8 text-3xl font-semibold">{sectionTitle}</h2>

//       {displayMode === "calendar" && <CalendarView events={events} />}
//       {displayMode === "list" && <ListView events={events} />}
//       {displayMode === "compact" && <CompactView events={events} />}
//     </section>
//   );
// }

// /* -------------------- CALENDAR VIEW -------------------- */

// function CalendarView({ events }: { events: EventItem[] }) {
//   const grouped = groupByDate(events);

//   return (
//     <div className="space-y-8">
//       {Object.entries(grouped).map(([date, items]) => (
//         <div key={date}>
//           <h3 className="mb-4 text-xl font-medium">
//             {new Date(date).toDateString()}
//           </h3>

//           <div className="grid gap-4 md:grid-cols-2">
//             {items.map(event => (
//               <EventCard key={event.id} event={event} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* -------------------- LIST VIEW -------------------- */

// function ListView({ events }: { events: EventItem[] }) {
//   return (
//     <div className="space-y-4">
//       {events.map(event => (
//         <EventRow key={event.id} event={event} />
//       ))}
//     </div>
//   );
// }

// /* -------------------- COMPACT VIEW -------------------- */

// function CompactView({ events }: { events: EventItem[] }) {
//   return (
//     <ul className="divide-y">
//       {events.map(event => (
//         <li key={event.id} className="py-3">
//           <span className="font-medium">{event.time}</span>{" "}
//           <span className="ml-2">{event.name}</span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// /* -------------------- EVENT UI -------------------- */

// function EventCard({ event }: { event: EventItem }) {
//   return (
//     <div className="rounded-xl border p-5 shadow-sm hover:shadow-md transition">
//       <h4 className="text-lg font-semibold">{event.name}</h4>

//       <p className="mt-1 text-sm text-gray-600">
//         {event.time} • {event.venue}
//       </p>

//       {event.musicians && (
//         <p className="mt-2 text-sm">{event.musicians}</p>
//       )}

//       {event.organizer && (
//         <div className="mt-3 text-sm text-gray-500">
//           {event.organizer.icon} {event.organizer.title}
//         </div>
//       )}
//     </div>
//   );
// }

// function EventRow({ event }: { event: EventItem }) {
//   return (
//     <div className="flex flex-col gap-1 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
//       <div>
//         <p className="font-medium">{event.name}</p>
//         <p className="text-sm text-gray-500">
//           {event.time} • {event.venue}
//         </p>
//       </div>

//       {event.organizer && (
//         <span className="text-sm text-gray-600">
//           {event.organizer.icon} {event.organizer.title}
//         </span>
//       )}
//     </div>
//   );
// }

// /* -------------------- HELPERS -------------------- */

// function groupByDate(events: EventItem[]) {
//   return events.reduce<Record<string, EventItem[]>>((acc, event) => {
//     const dateKey = event.date;

//     if (!dateKey) return acc;

//     acc[dateKey] ??= [];
//     acc[dateKey].push(event);

//     return acc;
//   }, {});
// }