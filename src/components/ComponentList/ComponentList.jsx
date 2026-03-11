import styles from './ComponentList.module.css'

export default function ComponentList({ components, selected, onSelect, loading }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.title}>// Components</span>
        <span className={styles.count}>
          {loading ? '...' : `${components.length} DETECTED`}
        </span>
      </div>

      <div className={styles.list}>
        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner} />
            <span className={styles.loadingText}>LOADING...</span>
          </div>
        ) : (
          components.map((c) => {
            const isActive = selected?.id === c.id
            return (
              <div
                key={c.id}
                className={`${styles.item} ${isActive ? styles.active : ''}`}
                onClick={() => onSelect(isActive ? null : c)}
              >
                <div
                  className={styles.dot}
                  style={{
                    background: c.color,
                    boxShadow: isActive ? `0 0 7px ${c.color}` : 'none',
                  }}
                />
                <div className={styles.info}>
                  <div className={styles.name}>{c.name}</div>
                  <div className={styles.type}>{c.type}</div>
                </div>
                {isActive && <span className={styles.arrow}>◀</span>}
              </div>
            )
          })
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerTxt}>
          {selected ? `// ${selected.name} active` : '// click item to select'}
        </span>
      </div>
    </div>
  )
}
