import { Loader } from 'lucide-react'
import React from 'react'

function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
  <div className="relative">
    <Loader className="animate-spin text-gray-500" style={{ transform: "translateY(-20%)" }} />
  </div>
</div>
  )
}

export default loading