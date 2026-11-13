import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SEGMENT_LENGTH = 20
const NUM_SEGMENTS = 14

function TrackSegment({ z }: { z: number }) {
  return (
    <group position={[0, 0, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>

      {[-3, 0, 3].map((x) => (
        <mesh key={x} position={[x, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, SEGMENT_LENGTH]} />
          <meshStandardMaterial color="#ffffff" opacity={0.35} transparent />
        </mesh>
      ))}

      <mesh position={[-6.5, 1.4, 0]} castShadow>
        <boxGeometry args={[1, 2.8, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[6.5, 1.4, 0]} castShadow>
        <boxGeometry args={[1, 2.8, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  )
}

export default function Track({ playerRef }: { playerRef: React.RefObject<THREE.Group | null> }) {
  const currentStart = useRef(0)

  useFrame(() => {
    if (!playerRef.current) return
    const playerZ = playerRef.current.position.z
    currentStart.current = Math.floor(playerZ / SEGMENT_LENGTH) - 2
  })

  const segments = useMemo(() => {
    return Array.from({ length: NUM_SEGMENTS }, (_, i) => currentStart.current - i)
  }, [currentStart.current])

  return (
    <>
      {segments.map((seg) => (
        <TrackSegment key={seg} z={seg * SEGMENT_LENGTH} />
      ))}
    </>
  )
}