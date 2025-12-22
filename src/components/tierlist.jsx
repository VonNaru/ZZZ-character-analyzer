export default function TierList() {
  const tierData = {
    S: {
      DPS: ['Character 1', 'Character 2'],
      'Sub DPS': ['Character 3', 'Character 4'],
      Support: ['Character 5', 'Character 6']
    },
    A: {
      DPS: ['Character 7', 'Character 8'],
      'Sub DPS': ['Character 9', 'Character 10'],
      Support: ['Character 11', 'Character 12']
    },
    B: {
      DPS: ['Character 13', 'Character 14'],
      'Sub DPS': ['Character 15', 'Character 16'],
      Support: ['Character 17', 'Character 18']
    },
    C: {
      DPS: ['Character 19', 'Character 20'],
      'Sub DPS': ['Character 21', 'Character 22'],
      Support: ['Character 23', 'Character 24']
    }
  };

  const tierColors = {
    S: '#ff7f7f',
    A: '#ffbf7f',
    B: '#ffff7f',
    C: '#7fbfff'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tier List</h1>
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
              color: 'white'
            }}>Tier</th>
            <th style={{ 
              border: '2px solid #333', 
              padding: '12px',
              backgroundColor: '#333',
              color: 'white'
            }}>DPS</th>
            <th style={{ 
              border: '2px solid #333', 
              padding: '12px',
              backgroundColor: '#333',
              color: 'white'
            }}>Sub DPS</th>
            <th style={{ 
              border: '2px solid #333', 
              padding: '12px',
              backgroundColor: '#333',
              color: 'white'
            }}>Support</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tierData).map(tier => (
            <tr key={tier}>
              <td style={{ 
                border: '2px solid #333', 
                padding: '12px',
                backgroundColor: tierColors[tier],
                fontWeight: 'bold',
                fontSize: '24px',
                textAlign: 'center',
                width: '80px'
              }}>{tier}</td>
              <td style={{ 
                border: '2px solid #333', 
                padding: '12px',
                backgroundColor: '#f5f5f5'
              }}>
                {tierData[tier].DPS.map((char, idx) => (
                  <div key={idx} style={{ 
                    padding: '5px',
                    margin: '2px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginRight: '5px'
                  }}>{char}</div>
                ))}
              </td>
              <td style={{ 
                border: '2px solid #333', 
                padding: '12px',
                backgroundColor: '#f5f5f5'
              }}>
                {tierData[tier]['Sub DPS'].map((char, idx) => (
                  <div key={idx} style={{ 
                    padding: '5px',
                    margin: '2px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginRight: '5px'
                  }}>{char}</div>
                ))}
              </td>
              <td style={{ 
                border: '2px solid #333', 
                padding: '12px',
                backgroundColor: '#f5f5f5'
              }}>
                {tierData[tier].Support.map((char, idx) => (
                  <div key={idx} style={{ 
                    padding: '5px',
                    margin: '2px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginRight: '5px'
                  }}>{char}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


