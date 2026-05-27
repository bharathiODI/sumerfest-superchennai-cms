'use client'

import React, { useEffect, useMemo, useState } from 'react'
import './styles.scss'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('summer')
  const [selectedEvent, setSelectedEvent] = useState('')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  console.log('data Register', data)
  /* ======================================================
     FETCH DATA
  ====================================================== */

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setLoading(true)

      const res = await fetch(`/api/${activeTab}-dashboard`)
      const json = await res.json()

      setData(json.docs || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  /* ======================================================
     GROUP EVENTS
  ====================================================== */

  const groupedEvents = useMemo(() => {
    return data.reduce((acc: any, item: any) => {
      const title = item?.summer?.title || item?.contest?.title || 'Untitled Event'

      if (!acc[title]) {
        acc[title] = []
      }

      acc[title].push(item)

      return acc
    }, {})
  }, [data])

  /* ======================================================
     AUTO SELECT FIRST EVENT
  ====================================================== */

  useEffect(() => {
    const keys = Object.keys(groupedEvents)

    if (keys[0]) {
      setSelectedEvent(keys[0])
    }
  }, [groupedEvents])

  /* ======================================================
     FORMAT LABEL
  ====================================================== */

  const formatLabel = (text: string) => {
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  /* ======================================================
     RENDER VALUE
  ====================================================== */

  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <div className="fieldTags">
          {value.map((item, i) => (
            <span key={i}>{String(item)}</span>
          ))}
        </div>
      )
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }

    if (typeof value === 'object' && value !== null) {
      return <pre>{JSON.stringify(value, null, 2)}</pre>
    }

    return String(value || '-')
  }

  return (
    <div className="eventDashboard">
      {/* ======================================================
         HERO
      ====================================================== */}

      <div className="eventDashboard__hero">
        <div>
          <p className="eventDashboard__eyebrow">EVENT MANAGEMENT</p>

          <h1 className="eventDashboard__title">Registrations Dashboard</h1>

          <p className="eventDashboard__subtitle">Manage registrations across all events</p>
        </div>

        <div className="eventDashboard__stats">
          <div className="statCard">
            <h3>{data.length}</h3>
            <p>Total Registrations</p>
          </div>

          <div className="statCard">
            <h3>{Object.keys(groupedEvents).length}</h3>
            <p>Total Events</p>
          </div>
        </div>
      </div>

      {/* ======================================================
         MAIN TABS
      ====================================================== */}

      <div className="eventDashboard__tabs">
        <button
          onClick={() => setActiveTab('summer')}
          className={`tabButton ${activeTab === 'summer' ? 'active' : ''}`}
        >
          summer
        </button>

        <button
          onClick={() => setActiveTab('summer')}
          className={`tabButton ${activeTab === 'contest' ? 'active' : ''}`}
        >
          Contest
        </button>
      </div>

      {/* ======================================================
         SUB TABS
      ====================================================== */}

      <div className="subTabs">
        {Object.keys(groupedEvents).map((title, index) => (
          <button
            key={index}
            onClick={() => setSelectedEvent(title)}
            className={`subTabButton ${selectedEvent === title ? 'active' : ''}`}
          >
            {title}

            <span>{groupedEvents[title].length}</span>
          </button>
        ))}
      </div>

      {/* ======================================================
         CONTENT
      ====================================================== */}

      {loading ? (
        <div className="loadingState">Loading registrations...</div>
      ) : (
        <div className="registrationGrid">
          {groupedEvents[selectedEvent]?.map((item: any, index: number) => (
            <div key={index} className="registrationCard">
              {/* TOP */}

              <div className="registrationCard__top">
                <div className="avatar">
                  {Object.values(item.values || {})[0]
                    ?.toString()
                    ?.charAt(0) || 'U'}
                </div>

                <div>
                  <h3>{selectedEvent}</h3>

                  <p>Registration #{item.id}</p>
                </div>
              </div>

              {/* STATUS */}

              <div className="registrationCard__status">
                <span className={`status status--${item.status}`}>{item.status || 'pending'}</span>
              </div>

              {/* FIELDS */}

              <div className="registrationCard__fields">
                {Object.entries(item.values || {}).map(([key, value]: any, i) => (
                  <div key={i} className="fieldItem">
                    <span className="fieldLabel">{formatLabel(key)}</span>

                    <div className="fieldValue">{renderValue(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
