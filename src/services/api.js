// Mock API service — replace with real endpoint when available

const MOCK_DELAY = 400

const mockData = [
  { id: 1, name: 'PV-1000',     type: 'Pressure Vessel',               tag: 'PV'  },
  { id: 2, name: 'HEX-500',     type: 'Heat Exchanger',                tag: 'HEX' },
  { id: 3, name: 'HEX-300',     type: 'Heat Exchanger',                tag: 'HEX' },
  { id: 4, name: 'PIC-101',     type: 'Pressure Indicator Controller', tag: 'PIC' },
  { id: 5, name: 'PT-102',      type: 'Pressure Transmitter',          tag: 'PT'  },
  { id: 6, name: 'PE-100',      type: 'Pressure Element',              tag: 'PE'  },
  { id: 7, name: 'XV-200 (x3)', type: 'On/Off Valve',                  tag: 'XV'  },
  { id: 8, name: 'P-XXX (x3)',  type: 'Pump',                         tag: 'P'   },
]

export async function fetchComponents() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), MOCK_DELAY)
  })
}
