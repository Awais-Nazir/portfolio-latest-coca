"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import type { BlogPostType } from "@/lib/contentful-blog"

interface BlogFilterProps {
  posts: BlogPostType[]
  onFilter: (filtered: BlogPostType[]) => void
}

export default function BlogFilter({ posts, onFilter }: BlogFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Extract all unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

  // Filter posts based on search term and tags
  useEffect(() => {
    const filtered = posts.filter((post) => {
      // Filter by search term
      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filter by selected tags
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))

      return matchesSearch && matchesTags
    })

    onFilter(filtered)
  }, [searchTerm, selectedTags, posts, onFilter])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTags([])
  }

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="relative w-full md:w-auto md:flex-1">
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-python-blue"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/50 border-border/50"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter by Tags
          </Button>
          {(searchTerm || selectedTags.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Tags filter */}
      {isFilterOpen && (
        <div className="mb-6 p-4 bg-background/50 border border-border/50 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Filter by tags:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className={`text-xs ${
                  selectedTags.includes(tag)
                    ? "bg-python-blue text-white hover:bg-python-blue/90"
                    : "bg-background/50 hover:bg-background"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Active filters display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedTags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="text-xs bg-python-blue/10 text-python-blue border-python-blue/20 hover:bg-python-blue/20"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <X className="ml-1 h-3 w-3" />
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
