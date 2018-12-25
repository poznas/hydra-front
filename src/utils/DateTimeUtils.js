export const formatDate = (unixTimestamp) =>
  new Date(unixTimestamp * 1000).toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

export const toUnixTimestamp = (stringDate) => (+new Date(stringDate) / 1000).toFixed(0)
