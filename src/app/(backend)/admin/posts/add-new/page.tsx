import { PostForm } from "@/features/Content/Posts/Posts/PostForm"
import Link from "next/link"
export default function AddNewPostPage() {
  return (
    <div className="p-8 min-h-screen">
      <div className="mx-auto">
        <Link
          href="/admin/posts"
          className="inline-flex items-center text-sm text-gray-500  hover:text-gray-700  mb-8"
        >
          ← Back to all posts
        </Link>
                
        <PostForm />
      </div>
    </div>
  )
} 