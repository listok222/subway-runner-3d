import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../store'

const LANE_WIDTH = 3
const LANES = [-LANE_WIDTH, 0, LANE_WIDTH]

export default function Player() {
  const meshRef = useRef<THREE.Mesh>(null)
  const laneIndex = useRef(1)
  const targetX = useRef(0)
  const velocityY = useRef(0)
  const isGrounded = useRef(true)
  const { speed, isPlaying, addScore } = useGameStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return

      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        laneIndex.current = Math.max(0, laneIndex.current - 1)
        targetX.current = LANES[laneIndex.current]
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        laneIndex.current = Math.min(2, laneIndex.current + 1)
        targetX.current = LANES[laneIndex.current]
      }
      if ((e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') && isGrounded.current) {
        velocityY.current = 11
        isGrounded.current = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying])

  useFrame((_, delta) => {
    if (!meshRef.current || !isPlaying) return

    // Forward movement
    meshRef.current.position.z -= speed * delta

    // Smooth lane switch
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX.current,
      14 * delta
    )

    // Jump
    velocityY.current -= 28 * delta
    meshRef.current.position.y += velocityY.current * delta

    if (meshRef.current.position.y <= 1) {
      meshRef.current.position.y = 1
      velocityY.current = 0
      isGrounded.current = true
    }

    addScore(speed * delta * 0.4)
  })

  return (
    <mesh ref={meshRef} position={[0, 1, 0]} castShadow>
      <boxGeometry args={[1, 1.5, 1]} />
      <meshStandardMaterial color="#e63946" />
    </mesh>
  )
}