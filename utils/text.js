export function clipText(text, maxChars) {
  let count = 0
  let clipped = []

  if (text.length <= maxChars) {
    return text
  }

  text.split(' ').some(word => {
    count += word.length + 1

    if (count <= maxChars) {
      clipped.push(word)
    }

    return count > maxChars
  })

  return `${clipped.join(' ').replace(/[,.!?]$/, '')}...`
}



// WEBPACK FOOTER //
// ./src/utils/text.js