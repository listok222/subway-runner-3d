import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Player from './Player'
import Track from './Track'
import { useGameStore } from '../store'

export default function Game() {
  const playerRef = useRef<THREE.Group>(null)
  const { isPlaying } = useGameStore()

  // Simple follow camera
  useFrame((state) => {
    if (!isPlaying) return

    // Find player position from the scene (simple approach)
    const player = state.scene.getObjectByName('player')
    if (player) {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, player.position.x, 0.1)
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, player.position.y + 4, 0.1)
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, player.position.z + 8, 0.15)
      state.camera.lookAt(player.position.x, player.position.y + 1, player.position.z - 5)
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Player */}
      <group name="player">
        <Player />
      </group>

      {/* Track - we need player Z, so we pass a dummy for now and improve later */}
      <Track playerZ={0} />

      {/* Simple ground far away to avoid void */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -100]} receiveShadow>
        <planeGeometry args={[50, 400]} />
        <meshStandardMaterial color="#3d6b4f" />
      </mesh>
    </>
  )
}