import { useMemo } from 'react'
import * as THREE from 'three'

const SEGMENT_LENGTH = 20
const NUM_SEGMENTS = 12

function TrackSegment({ z }: { z: number }) {
  return (
    <group position={[0, 0, z]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[12, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>

      {/* Lane markers */}
      {[-3, 0, 3].map((x) => (
        <mesh key={x} position={[x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.15, SEGMENT_LENGTH]} />
          <meshStandardMaterial color="#ffffff" opacity={0.4} transparent />
        </mesh>
      ))}

      {/* Side walls */}
      <mesh position={[-6.5, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 3, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[6.5, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 3, SEGMENT_LENGTH]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  )
}

export default function Track({ playerZ }: { playerZ: number }) {
  const segments = useMemo(() => {
    const start = Math.floor(playerZ / SEGMENT_LENGTH) - 2
    return Array.from({ length: NUM_SEGMENTS }, (_, i) => start - i)
  }, [Math.floor(playerZ / SEGMENT_LENGTH)])

  return (
    <>
      {segments.map((seg) => (
        <TrackSegment key={seg} z={seg * SEGMENT_LENGTH} />
      ))}
    </>
  )
}