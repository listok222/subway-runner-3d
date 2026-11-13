import { useGameStore } from '../store'

export default function UI() {
  const { score, isGameOver, restart } = useGameStore()

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        fontFamily: 'system-ui, sans-serif',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 28, fontWeight: 700 }}>
        Score: {Math.floor(score)}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          fontSize: 14,
          opacity: 0.8,
        }}
      >
        A / ← — влево &nbsp;&nbsp; D / → — вправо &nbsp;&nbsp; Space — прыжок
      </div>

      {isGameOver && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            pointerEvents: 'auto',
          }}
        >
          <h1 style={{ fontSize: 48, marginBottom: 16 }}>Game Over</h1>
          <p style={{ fontSize: 24, marginBottom: 32 }}>Score: {Math.floor(score)}</p>
          <button
            onClick={restart}
            style={{
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 600,
              background: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Заново
          </button>
        </div>
      )}
    </div>
  )
}