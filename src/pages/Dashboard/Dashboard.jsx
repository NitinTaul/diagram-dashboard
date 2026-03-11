import { useState, useEffect, useCallback } from 'react'
import UploadBox from '../../components/UploadBox/UploadBox'
import DiagramViewer from '../../components/DiagramViewer/DiagramViewer'
import ComponentList from '../../components/ComponentList/ComponentList'
import { fetchComponents } from '../../services/api'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [image, setImage]         = useState(null)
  const [fileName, setFileName]   = useState('')
  const [fileSize, setFileSize]   = useState('')
  const [zoom, setZoom]           = useState(100)
  const [selected, setSelected]   = useState(null)
  const [components, setComponents] = useState([])
  const [loading, setLoading]     = useState(true)

  // Load components from mock API on mount
  useEffect(() => {
    fetchComponents().then((data) => {
      const TAG_COLORS = {
        PV: '#f59e0b', HEX: '#3b82f6', PIC: '#10b981',
        PT: '#06b6d4', PE: '#84cc16', XV: '#ef4444', P: '#8b5cf6',
      }
      setComponents(data.map((c) => ({ ...c, color: TAG_COLORS[c.tag] || '#64748b' })))
      setLoading(false)
    })
  }, [])

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    setImage(URL.createObjectURL(file))
    setFileName(file.name)
    setFileSize((file.size / 1024).toFixed(1) + ' KB')
    setZoom(100)
    setSelected(null)
  }, [])

  const handleRemove = useCallback(() => {
    setImage(null)
    setFileName('')
    setFileSize('')
    setSelected(null)
    setZoom(100)
  }, [])

  return (
    <div className={styles.layout}>
      {/* ─── Header ─── */}
      <header className={styles.header}>
        <div className={styles.statusDot} />
        <span className={styles.logo}>DiagramOS</span>
        <span className={styles.sub}>// CIRCUIT ANALYSIS DASHBOARD v1.0</span>
      </header>

      {/* ─── Main ─── */}
      <main className={styles.main}>
        {/* Upload Section */}
        <section className={styles.uploadSection}>
          <UploadBox
            image={image}
            fileName={fileName}
            fileSize={fileSize}
            onFile={handleFile}
            onRemove={handleRemove}
          />
        </section>

        {/* Two-column: Viewer + Sidebar */}
        <div className={styles.contentRow}>
          <DiagramViewer
            image={image}
            zoom={zoom}
            onZoomIn={() => setZoom((z) => Math.min(z + 20, 300))}
            onZoomOut={() => setZoom((z) => Math.max(z - 20, 30))}
            onReset={() => setZoom(100)}
            selected={selected}
          />
          <ComponentList
            components={components}
            selected={selected}
            onSelect={setSelected}
            loading={loading}
          />
        </div>
      </main>
    </div>
  )
}
