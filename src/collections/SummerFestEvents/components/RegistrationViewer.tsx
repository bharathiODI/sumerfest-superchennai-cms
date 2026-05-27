'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'

export default function RegistrationViewer() {
  const { value } = useField({
    path: 'values',
  })

  if (!value || typeof value !== 'object') {
    return (
      <div
        style={{
          padding: '20px',
          borderRadius: '0px',
          border: '1px dashed #d1d5db',
          background: '#f9fafb',
          textAlign: 'center',
          color: '#9ca3af',
        }}
      >
        No registration data available
      </div>
    )
  }

  const entries = Object.entries(value)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* HEADER */}
      <div
        style={{
          borderRadius: '0px',
          padding: '20px',
          color: '#fff',
          background: 'linear-gradient(135deg,#ec4899,#f43f5e,#8b5cf6)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: 700,
          }}
        >
          Registration Form Data
        </h3>
      </div>

      {/* DATA */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
          gap: '16px',
        }}
      >
        {entries.map(([key, val], index) => (
          <div
            key={index}
            style={{
              borderRadius: '0px',
              padding: '18px',
              border: '1px solid #e5e7eb',
              background: '#fff',
              boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
            }}
          >
            {/* LABEL */}
            <p
              style={{
                marginBottom: '10px',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#ec4899',
                fontWeight: 700,
              }}
            >
              {formatLabel(key)}
            </p>

            {/* VALUE */}
            <div
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#111827',
                wordBreak: 'break-word',
              }}
            >
              {renderValue(val)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ====================================================== */

function formatLabel(text: string) {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/* ====================================================== */

function renderValue(value: any) {
  if (Array.isArray(value)) {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {value.map((item, i) => (
          <span
            key={i}
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#fce7f3',
              color: '#be185d',
              fontSize: '13px',
            }}
          >
            {String(item)}
          </span>
        ))}
      </div>
    )
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (!value) {
    return <span style={{ color: '#9ca3af' }}>—</span>
  }

  return String(value)
}
