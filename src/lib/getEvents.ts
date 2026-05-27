
import { getPayload } from "payload"
import configPromise from "@/payload.config"

type EventFilters = {
  categories?: string[]
  languages?: string[]
  locations?: string[]
  freeEntry?: boolean
  familyFriendly?: boolean
  startDate?: string
  endDate?: string
  date?: string[]
}

export const getEvents = async (
  filters: EventFilters = {},
  sortBy: string = "upcoming"
) => {
  const payload = await getPayload({ config: configPromise })

  const where: any = {}

  // CATEGORY
  if (filters.categories?.length) {
    where["event.eventsCategory"] = {
      in: filters.categories,
    }
  }

  // LANGUAGE
  if (filters.languages?.length) {
    where["event.details.language"] = {
      in: filters.languages,
    }
  }

  // LOCATION
  if (filters.locations?.length) {
    where["event.details.location"] = {
      in: filters.locations,
    }
  }

  // FREE ENTRY
  if (filters.freeEntry) {
    where["event.details.isFree"] = {
      equals: true,
    }
  }

  // FAMILY FRIENDLY
  if (filters.familyFriendly) {
    where["event.details.familyFriendly"] = {
      equals: true,
    }
  }

  // DATE RANGE
  if (filters.startDate && filters.endDate) {
    where["event.eventDates.date"] = {
      greater_than_equal: filters.startDate,
      less_than_equal: filters.endDate,
    }
  }

  // TODAY / TOMORROW / WEEKEND
  if (filters.date?.length) {
    const ranges: any[] = []

    filters.date.forEach((preset) => {
      const start = new Date()
      const end = new Date()

      if (preset === "Today") {
        start.setHours(0, 0, 0, 0)
        end.setHours(23, 59, 59, 999)
      }

      if (preset === "Tomorrow") {
        start.setDate(start.getDate() + 1)
        start.setHours(0, 0, 0, 0)

        end.setTime(start.getTime())
        end.setHours(23, 59, 59, 999)
      }

      ranges.push({
        "event.eventDates.date": {
          greater_than_equal: start,
          less_than_equal: end,
        },
      })
    })

    where.or = ranges
  }

  let sort: any = "-createdAt"

  if (sortBy === "upcoming") {
    sort = "event.eventDates.date"
    where["event.eventDates.date"] = {
      greater_than_equal: new Date(),
    }
  }

  if (sortBy === "past") {
    sort = "-event.eventDates.date"
    where["event.eventDates.date"] = {
      less_than: new Date(),
    }
  }

  const events = await payload.find({
    collection: "events",
    depth: 2,
    where,
    sort,
    limit: 12,
  })

  return events
}