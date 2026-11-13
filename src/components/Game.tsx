import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Player from './Player'
import Track from './Track'
import { useGameStore } from '../store'

export default function Game() {
  const playerGroupRef = useRef<THREE.Group>(null)
  const { isPlaying } = useGameStore()

  useFrame((state) => {
    if (!isPlaying || !playerGroupRef.current) return

    const player = playerGroupRef.current

    // Smooth camera follow
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, player.position.x, 0.08)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, player.position.y + 5, 0.08)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, player.position.z + 10, 0.12)
    state.camera.lookAt(player.position.x, player.position.y + 1.2, player.position.z - 4)
  })

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[8, 18, 6]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      <group ref={playerGroupRef}>
        <Player />
      </group>

      <Track playerRef={playerGroupRef} />

      {/* Distant ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -80]} receiveShadow>
        <planeGeometry args={[40, 300]} />
        <meshStandardMaterial color="#3d6b4f" />
      </mesh>
    </>
  )
}