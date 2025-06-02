"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useWindowSize } from "@/hooks/use-window-size"

interface MasonryGridProps {
  children: React.ReactNode[]
  columns?: number
  gap?: number
}

export default function MasonryGrid({ children, columns = 3, gap = 24 }: MasonryGridProps) {
  const [columnHeights, setColumnHeights] = useState<number[]>([])
  const [gridItems, setGridItems] = useState<React.ReactNode[][]>([])
  const gridRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  // Determine number of columns based on screen width
  const getResponsiveColumns = () => {
    if (width < 640) return 1
    if (width < 1024) return 2
    return columns
  }

  // Distribute items into columns
  useEffect(() => {
    const responsiveColumns = getResponsiveColumns()

    // Initialize column heights and grid items
    const heights = Array(responsiveColumns).fill(0)
    const items: React.ReactNode[][] = Array(responsiveColumns)
      .fill(null)
      .map(() => [])

    // Distribute children into columns
    children.forEach((child, index) => {
      // Find the column with the smallest height
      const shortestColumn = heights.indexOf(Math.min(...heights))

      // Add the item to the shortest column
      items[shortestColumn].push(child)

      // Update the height of the column (approximate)
      heights[shortestColumn] += 300 // Approximate height, will be adjusted by actual rendering
    })

    setColumnHeights(heights)
    setGridItems(items)
  }, [children, width])

  return (
    <div
      ref={gridRef}
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${getResponsiveColumns()}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {gridItems.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {column.map((item, itemIndex) => (
            <div key={itemIndex}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
