import { getPosts } from "@/features/Content/Posts/Posts/actions"
import { PostsList } from "@/features/Content/Posts/Posts/PostsList"
import { Suspense } from "react"
import Link from "next/link"

import data from "@/translations/cz/cz.json";


export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="p-8  min-h-screen">
      <div className="mx-auto space-y-8">
        <div className="flex justify-between items-center pb-4 border-b border-black/15">
          <h1 className="text-2xl font-bold text-gray-900">{data.posts.title}</h1>
          <Link
            href="/admin/posts/add-new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {data.buttons.add} {data.buttons.new.toLowerCase()}
          </Link>
        </div>

        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <PostsList initialPosts={posts} />
        </Suspense>
      </div>
    </div>
  )
}