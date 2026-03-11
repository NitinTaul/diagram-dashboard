import { useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './UploadBox.module.css'

export default function UploadBox({ image, fileName, fileSize, onFile, onRemove }) {
  const replaceInputRef = useRef(null)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) onFile(acceptedFiles[0])
  }, [onFile])

  // FIX 1: noClick always true — only the button triggers open()
  // This prevents the zone click and button click from both firing open() simultaneously
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    noClick: true,
    noKeyboard: true,
    multiple: false,
  })

  // FIX 2: Replace button uses its own hidden input ref
  const handleReplaceChange = (e) => {
    const file = e.target.files[0]
    if (file) onFile(file)
    e.target.value = '' // reset so same file can be re-selected
  }

  if (image) {
    return (
      <div className={styles.hasFile}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
        <span className={styles.fileName}>{fileName}</span>
        <span className={styles.fileSize}>{fileSize}</span>

        {/* FIX 2: hidden input dedicated to Replace */}
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleReplaceChange}
        />
        <button className={styles.btnGhost} onClick={() => replaceInputRef.current?.click()}>
          Replace
        </button>
        <button className={styles.btnGhost} onClick={onRemove}>✕ Remove</button>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`${styles.zone} ${isDragActive ? styles.drag : ''}`}
    >
      <input {...getInputProps()} />
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.4">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
      <p className={styles.title}>
        {isDragActive ? 'Release to upload' : 'Drop Diagram Image Here'}
      </p>
      <p className={styles.hint}>PNG · JPG · WEBP &nbsp;·&nbsp; or click to browse</p>
      {/* FIX 1: only this button triggers open() — no zone click conflict */}
      <button className={styles.btnAmber} type="button" onClick={open}>
        Select File
      </button>
    </div>
  )
}
