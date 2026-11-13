import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../store'

const LANE_WIDTH = 3
const LANES = [-LANE_WIDTH, 0, LANE_WIDTH] // left, center, right

export default function Player() {
  const meshRef = useRef<THREE.Mesh>(null)
  const laneIndex = useRef(1) // start in center
  const targetX = useRef(0)
  const velocityY = useRef(0)
  const isGrounded = useRef(true)
  const { speed, isPlaying, addScore, gameOver } = useGameStore()

  // Keyboard controls
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
        velocityY.current = 12
        isGrounded.current = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying])

  useFrame((_, delta) => {
    if (!meshRef.current || !isPlaying) return

    // Move forward
    meshRef.current.position.z -= speed * delta

    // Smooth lane change
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX.current,
      12 * delta
    )

    // Jump physics
    velocityY.current -= 30 * delta // gravity
    meshRef.current.position.y += velocityY.current * delta

    if (meshRef.current.position.y <= 1) {
      meshRef.current.position.y = 1
      velocityY.current = 0
      isGrounded.current = true
    }

    // Add score based on distance
    addScore(speed * delta * 0.5)
  })

  return (
    <mesh ref={meshRef} position={[0, 1, 0]} castShadow>
      <boxGeometry args={[1, 1.6, 1]} />
      <meshStandardMaterial color="#ff4444" />
    </mesh>
  )
}