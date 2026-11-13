import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SEGMENT_LENGTH = 20
const NUM_SEGMENTS = 16

function TrackSegment({ z }: { z: number }) {
  return (
    <group position={[0, 0, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>

      {[-3, 0, 3].map((x) => (
        <mesh key={x} position={[x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.15, SEGMENT_LENGTH]} />
          <meshStandardMaterial color="#ffffff" opacity={0.4} transparent />
        </mesh>
      ))}

      <mesh position={[-6.5, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 3, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[6.5, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 3, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  )
}

interface TrackProps {
  playerRef: React.RefObject<THREE.Group | null>
}

export default function Track({ playerRef }: TrackProps) {
  const [startSegment, setStartSegment] = useState(0)

  useFrame(() => {
    if (!playerRef.current) return
    const playerZ = playerRef.current.position.z
    const newStart = Math.floor(playerZ / SEGMENT_LENGTH) - 3
    if (newStart !== startSegment) {
      setStartSegment(newStart)
    }
  })

  const segments = Array.from({ length: NUM_SEGMENTS }, (_, i) => startSegment - i)

  return (
    <>
      {segments.map((seg) => (
        <TrackSegment key={seg} z={seg * SEGMENT_LENGTH} />
      ))}
    </>
  )
}