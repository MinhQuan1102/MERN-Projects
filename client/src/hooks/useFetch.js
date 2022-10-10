import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(url)
        setData(response.data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const reFetch = async () => {
    setLoading(true)
    try {
      const response = await axios.get(url)
      setData(response.data)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }
  
  return { data, loading, error, reFetch}
}

export default useFetch