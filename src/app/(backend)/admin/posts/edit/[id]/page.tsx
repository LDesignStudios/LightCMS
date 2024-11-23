import { PostForm } from "@/features/Content/Posts/Posts/PostForm"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/sessions"
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
    <div>
      <div className="mx-auto">
        <PostForm post={post} />
      </div>
    </div>
  )
}