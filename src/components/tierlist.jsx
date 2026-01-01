import { useState, useEffect } from 'react'
import { characterAPI } from '../api/api'

// Tier configurations
const TIERS = ['T0', 'T0.5', 'T1', 'T1.5', 'T2', 'T3']
const ROLES = ['Attacker', 'Stun', 'Support']

const TIER_COLORS = {
  'T0': '#ff4444',
  'T0.5': '#ff8844',
  'T1': '#ffcc44',
  'T1.5': '#88cc44',
  'T2': '#44ccff',
  'T3': '#44ff88'
}

const TIER_ASSIGNMENTS = {
  'Jane Doe': { tier: 'T0', role: 'Attacker' },
  'Yixuan': { tier: 'T0', role: 'Attacker' },
  'Astra Yao': { tier: 'T0', role: 'Support' },
  'Yuzuha': { tier: 'T0', role: 'Support' },
  'Lucia': { tier: 'T0', role: 'Support' },
  'Miyabi': { tier: 'T0.5', role: 'Attacker' }
}

// Character Card Component
function CharacterCard({ character, tierColor }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '90px',
      margin: '5px',
      position: 'relative'
    }}>
      <div style={{
        width: '90px',
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#2a2a2a',
        position: 'relative'
      }}>
        {character.image_url ? (
          <img
            src={character.image_url}
            alt={character.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<div style="color: white; font-size: 40px;">${character.name[0]}</div>`
            }}
          />
        ) : (
          <div style={{ color: 'white', fontSize: '40px' }}>
            {character.name[0]}
          </div>
        )}
      </div>
    </div>
  )
}

// Main Component
export default function TierList() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCharacters()
  }, [])

  const loadCharacters = async () => {
    try {
      const data = await characterAPI.getAll()
      setCharacters(data)
      setLoading(false)
    } catch (error) {
      console.error('Error loading characters:', error)
      setLoading(false)
    }
  }

  const getTierData = () => {
    const tierData = {}

    TIERS.forEach(tier => {
      tierData[tier] = {}
      ROLES.forEach(role => {
        tierData[tier][role] = []
      })
    })

    characters.forEach(char => {
      const assignment = TIER_ASSIGNMENTS[char.name]
      if (assignment) {
        tierData[assignment.tier][assignment.role].push(char)
      }
    })

    return tierData
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
        Loading characters...
      </div>
    )
  }

  const tierData = getTierData()

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <h1 style={{
        color: 'white',
        marginBottom: '30px',
        textAlign: 'center',
        fontSize: '36px'
      }}>
        ZZZ Character Tier List
      </h1>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
      }}>
        <thead>
          <tr>
            <th style={{
              border: '2px solid #333',
              padding: '12px',
              backgroundColor: '#333',
              color: 'white',
              fontSize: '18px'
            }}>
              Tier
            </th>
            {ROLES.map(role => (
              <th key={role} style={{
                border: '2px solid #333',
                padding: '12px',
                backgroundColor: '#333',
                color: 'white',
                fontSize: '18px'
              }}>
                {role}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIERS.map(tier => (
            <tr key={tier}>
              <td style={{
                border: '2px solid #333',
                padding: '12px',
                backgroundColor: TIER_COLORS[tier],
                fontWeight: 'bold',
                fontSize: '28px',
                textAlign: 'center',
                width: '100px',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                {tier}
              </td>
              {ROLES.map(role => (
                <td key={role} style={{
                  border: '2px solid #333',
                  padding: '12px',
                  backgroundColor: '#2a2a2a',
                  verticalAlign: 'top'
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {tierData[tier][role].map(char => (
                      <CharacterCard
                        key={char.id}
                        character={char}
                        tierColor={TIER_COLORS[tier]}
                      />
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#2a2a2a',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h3>Total Characters: {characters.length}</h3>
        <p style={{ color: '#888', marginTop: '10px' }}>
          Tier list diambil dari database. Gambar karakter akan muncul jika tersedia.
        </p>
      </div>
    </div>
  )
}


