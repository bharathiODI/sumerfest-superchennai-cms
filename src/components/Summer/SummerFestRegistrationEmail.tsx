import React from 'react'

interface Props {
  title?: string
  eventName?: string
  eventDate?: string
  venue?: string
  values?: Record<string, any>
  thankYouMessage?: string
}

const SummerFestRegistrationEmail: React.FC<Props> = ({
  title,
  eventName,
  eventDate,
  venue,
  values,
  thankYouMessage,
}) => {
  return (
    <div
      style={{
        background: '#f4f4f4',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg,#ec4899,#7c3aed)',
            padding: '45px 40px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color: '#fff',
              margin: 0,
              fontSize: '34px',
              fontWeight: 'bold',
            }}
          >
            Super Chennai Summer Fest 2026
          </h1>

          <p
            style={{
              color: '#fdf2f8',
              marginTop: '12px',
              fontSize: '16px',
            }}
          >
            Event Registration Confirmation
          </p>
        </div>

        <div style={{ padding: '40px' }}>
          <h2
            style={{
              marginTop: 0,
              color: '#111827',
              marginBottom: '20px',
            }}
          >
            Event Details
          </h2>

          {/* <table
            width="100%"
            cellPadding="12"
            style={{
              borderCollapse: 'collapse',
              marginBottom: '35px',
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    fontWeight: 'bold',
                    borderBottom: '1px solid #eee',
                    width: '180px',
                    color: '#374151',
                  }}
                >
                  Event Name
                </td>

                <td style={{ borderBottom: '1px solid #eee', color: '#111827' }}>
                  {eventName || title}
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    fontWeight: 'bold',
                    borderBottom: '1px solid #eee',
                    color: '#374151',
                  }}
                >
                  Event Date
                </td>

                <td style={{ borderBottom: '1px solid #eee', color: '#111827' }}>
                  {eventDate}
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    fontWeight: 'bold',
                    borderBottom: '1px solid #eee',
                    color: '#374151',
                  }}
                >
                  Venue
                </td>

                <td style={{ borderBottom: '1px solid #eee', color: '#111827' }}>
                  {venue}
                </td>
              </tr>
            </tbody>
          </table> */}

          <h2
            style={{
              color: '#111827',
              marginBottom: '20px',
            }}
          >
            Registration Details
          </h2>

          <table
            width="100%"
            cellPadding="12"
            style={{
              borderCollapse: 'collapse',
            }}
          >
            <tbody>
              {Object.entries(values || {}).map(([key, value], index) => (
                <tr key={index}>
                  <td
                    style={{
                      fontWeight: 'bold',
                      borderBottom: '1px solid #eee',
                      width: '220px',
                      textTransform: 'capitalize',
                      color: '#374151',
                    }}
                  >
                    {key.replace(/([A-Z])/g, ' $1')}
                  </td>

                  <td
                    style={{
                      borderBottom: '1px solid #eee',
                      color: '#111827',
                    }}
                  >
                    {String(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* THANK YOU */}
          {thankYouMessage && (
            <div
              style={{
                marginTop: '35px',
                padding: '24px',
                background: '#fdf2f8',
                borderRadius: '16px',
                border: '1px solid #fbcfe8',
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: '12px',
                  color: '#be185d',
                }}
              >
                Thank You
              </h3>

              <div
                style={{
                  color: '#374151',
                  lineHeight: '1.8',
                  fontSize: '15px',
                }}
                dangerouslySetInnerHTML={{
                  __html: thankYouMessage,
                }}
              />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div
          style={{
            background: '#111827',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#d1d5db',
              margin: 0,
              fontSize: '13px',
              letterSpacing: '0.5px',
            }}
          >
            © 2026 Super Chennai Summer Fest • Chennai’s Biggest Summer Celebration
          </p>
        </div>
      </div>
    </div>
  )
}

export default SummerFestRegistrationEmail