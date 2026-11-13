import { create } from 'zustand'

interface GameState {
  score: number
  speed: number
  isPlaying: boolean
  isGameOver: boolean
  addScore: (points: number) => void
  setSpeed: (speed: number) => void
  startGame: () => void
  gameOver: () => void
  restart: () => void
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  speed: 12,
  isPlaying: true,
  isGameOver: false,
  addScore: (points) => set((state) => ({ score: state.score + points })),
  setSpeed: (speed) => set({ speed }),
  startGame: () => set({ isPlaying: true, isGameOver: false, score: 0, speed: 12 }),
  gameOver: () => set({ isPlaying: false, isGameOver: true }),
  restart: () => set({ isPlaying: true, isGameOver: false, score: 0, speed: 12 }),
}))