const fetchData = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  return res.json()
}

export default fetchData
