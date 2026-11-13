import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Game from './components/Game'
import UI from './components/UI'

export default function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 60 }}
        style={{ background: '#87CEEB' }}
      >
        <Suspense fallback={null}>
          <Game />
        </Suspense>
      </Canvas>
      <UI />
    </>
  )
}