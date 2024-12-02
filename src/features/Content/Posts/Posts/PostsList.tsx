'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { updatePostStatus, deletePost } from './actions'
import Image from 'next/image'
import Link from 'next/link'
import { HiChat, HiHeart } from 'react-icons/hi'

import data from "@/translations/cz/cz.json";
import { shortenText } from '@/utils/formatters'

type PostWithAuthor = {
  id: string
  title: string
  slug: string
  content: string
  imagePath: string | null
  published: boolean
  authorId: string
  createdAt: Date
  updatedAt: Date
  commentCount: number
  likeCount: number
  author: {
    name: string | null
    email: string
  }
}

interface PostsListProps {
  initialPosts: PostWithAuthor[]
  filter: 'all' | 'published' | 'drafts'
}

export function PostsList({ initialPosts, filter }: PostsListProps) {
  const [posts, setPosts] = useState(initialPosts)

  const handleStatusToggle = async (postId: string, newStatus: boolean) => {
    const result = await updatePostStatus(postId, newStatus)
    if (result.success) {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, published: newStatus } : post
      ))
    }
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    const result = await deletePost(postId)
    if (result.success) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  const filteredPosts = posts.filter(post => {
    if (filter === 'published') return post.published
    if (filter === 'drafts') return !post.published
    return true 
  })

  return (
    <div>
      <div>
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <p className="text-gray-500">{data.posts.notFound}</p>
          ) : (
            filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="rounded-md p-2 hover:bg-gray-100 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={post.imagePath || "/placeholder.webp"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>       
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDistanceToNow(new Date(post.createdAt))} ago
                          {post.author.name && ` • ${data.posts.created} ${post.author.name}`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleStatusToggle(post.id, !post.published)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.published ? data.posts.published : data.posts.draft}
                        </button>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <HiChat className="w-4 h-4 mr-1" />
                            <span>{post.commentCount}</span>
                          </div>
                          <div className="flex items-center">
                            <HiHeart className="w-4 h-4 mr-1" />
                            <span>{post.likeCount}</span>
                          </div>
                        </div>
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                         {data.buttons.edit}
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          {data.buttons.delete}
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {shortenText(post.content, 96)}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 