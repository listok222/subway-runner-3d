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

    // Camera follows the player smoothly
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, player.position.x * 0.7, 0.08)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, player.position.y + 5.5, 0.08)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, player.position.z + 11, 0.12)

    state.camera.lookAt(
      player.position.x,
      player.position.y + 1.5,
      player.position.z - 6
    )
  })

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[10, 20, 8]}
        intensity={1.25}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <group ref={playerGroupRef}>
        <Player />
      </group>

      <Track playerRef={playerGroupRef} />

      {/* Distant ground so there is no void */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -100]} receiveShadow>
        <planeGeometry args={[50, 400]} />
        <meshStandardMaterial color="#3d6b4f" />
      </mesh>
    </>
  )
}