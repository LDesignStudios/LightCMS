import { PostForm } from "@/features/Content/Posts/Posts/PostForm"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/sessions"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      imagePath: true,
      authorId: true,
    },
  })

  if (!post || post.authorId !== session.userId) {
    notFound()
  }

  return (
    <div className="p-8 min-h-screen">
      <div className="mx-auto">
        <Link
          href="/admin/posts"
          className="inline-flex items-center text-sm text-gray-500 mb-8"
        >
          ← Back to all posts
        </Link>

        <PostForm post={post} />
      </div>
    </div>
  )
}