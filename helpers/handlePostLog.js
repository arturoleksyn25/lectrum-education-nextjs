const handlePostLog = async (url, payload) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();

  return data;
}

export default handlePostLog;