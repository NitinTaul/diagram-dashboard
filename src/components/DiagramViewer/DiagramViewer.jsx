import { useRef } from 'react'
import styles from './DiagramViewer.module.css'

export default function DiagramViewer({ image, zoom, onZoomIn, onZoomOut, onReset, selected }) {
  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>// Diagram Viewer</span>
        <div className={styles.zoomRow}>
          <button className={styles.iconBtn} onClick={onZoomOut} title="Zoom Out">−</button>
          <span className={styles.zoomVal}>{zoom}%</span>
          <button className={styles.iconBtn} onClick={onZoomIn} title="Zoom In">+</button>
          <button className={`${styles.iconBtn} ${styles.iconBtnSm}`} onClick={onReset} title="Reset">RST</button>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.gridBg} />
        {image ? (
          <div className={styles.imgWrap}>
            <img
              src={image}
              alt="Uploaded diagram"
              className={`${styles.img} ${selected ? styles.highlighted : ''}`}
              style={{ transform: `scale(${zoom / 100})` }}
              draggable={false}
            />
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#1a2740" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className={styles.emptyText}>// NO DIAGRAM LOADED</span>
          </div>
        )}
      </div>

      {/* Footer: selected component info */}
      {selected && (
        <div className={styles.footer}>
          <span className={styles.footerLabel}>SELECTED:</span>
          <span
            className={styles.badge}
            style={{
              color: selected.color,
              background: selected.color + '22',
              border: `1px solid ${selected.color}44`,
            }}
          >
            ◈ {selected.name}
          </span>
          <span className={styles.footerType}>{selected.type}</span>
        </div>
      )}
    </div>
  )
}
