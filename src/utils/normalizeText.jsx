import removeAccents from './removeAccents'

// Normalize text
const normalizeText = data => {
  return data.map(d => {
    return {
      ...d,
      name: removeAccents(d.name)
    }
  })
}

export default normalizeText
