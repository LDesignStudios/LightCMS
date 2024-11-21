"use client"

import { useRef, useState } from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { createPost, updatePost } from './actions'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import data from "@/translations/cz/cz.json";

type PostFormProps = {
  post?: {
    id: string
    title: string
    content: string
    published: boolean
    imagePath: string | null
  }
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(post?.imagePath || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(formData: FormData) {
    setError(null)
    let result

    if (post) {
      result = await updatePost(post.id, formData)
    } else {
      result = await createPost(formData)
    }

    if (result.success) {
      formRef.current?.reset()
      router.refresh()
    } else if (result.error) {
      setError(result.error)
    }
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-900 ">
        {post ?  `${data.posts.editPost}` : `${data.posts.addNewPost}`}
      </h2>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form className="w-full" ref={formRef} action={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              {data.forms.general.title}
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={post?.title}
              className="mt-1 block py-2 px-4 w-full rounded-md bg-neutral-100 border shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              {data.forms.general.featuredImage}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {preview && (
            <div className="relative w-full h-48">
              <Image
                src={preview}
                alt="Image Preview"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
             {data.forms.general.content}
            </label>
            <textarea
              name="content"
              required
              defaultValue={post?.content}
              rows={6}
              className="mt-1 block py-2 px-4 w-full rounded-md bg-neutral-100 border shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              id="published"
              defaultChecked={post?.published}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm text-gray-700">
              {data.forms.general.publish}
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard/posts')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              {data.buttons.cancel}
            </button>
            <SubmitButton
              defaultText={post ? `${data.buttons.update} ${data.posts.post.toLowerCase()}` : `${data.buttons.create} ${data.posts.post.toLowerCase()}` }
              loadingText={post ? `${data.buttons.updating}`  : `${data.buttons.creating}` }
              className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700"
            />
          </div>
        </div>
      </form>
    </div>
  )
}