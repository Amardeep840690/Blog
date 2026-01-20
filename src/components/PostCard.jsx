import React from 'react'
import servise from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className="block group">
        <div className='w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all delay-150 duration-300 ease-in-out overflow-hidden border border-gray-100'>
            <div className='w-full h-48 overflow-hidden'>
                <img 
                  src={servise.getFilePreview(featuredImage)} 
                  alt={title} 
                  className='w-full h-full object-cover group-hover:scale-102 transition delay-150 duration-300 ease-in-out'
                />
            </div>
            <div className='p-4'>
                <h2 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2'>
                  {title}
                </h2>
                <div className='mt-2 text-sm text-gray-500'>
                  Read more →
                </div>
            </div>
        </div>
    </Link>
  )
}

export default PostCard
 