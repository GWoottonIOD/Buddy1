import React, { useEffect } from 'react'
import { useCacheContext } from '../context/CachedDataContext';

export default function useCacheHook(data, type) {
    const [cachedData, setCachedData] = useCacheContext(null);
    const type = type
    useEffect(() => {
      // Check if data exists in the cache 
      if (cachedData !== data) {
        setCachedData({dfgd: data})
      }
    })
  return (
   null
  )
}
