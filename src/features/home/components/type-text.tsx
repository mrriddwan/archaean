import { useEffect, useState } from 'react'

export const TypeText = () => {
 const phrases = [
  'Hello, World.',
  'Apa khabar, dunia.',
  'Bonjour, le monde.',
  'Hallo, Welt.',
  'Olá, mundo.',
  'Ciao, mondo.',
  'こんにちは、世界。',
  '안녕하세요, 세계.',
  '你好，世界。',
  'مرحبا بالعالم.',
 ]

 const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
 const [displayedText, setDisplayedText] = useState('')
 const [isDeleting, setIsDeleting] = useState(false)
 const [typingSpeed, setTypingSpeed] = useState(100)

 useEffect(() => {
  const currentPhrase = phrases[currentPhraseIndex]

  if (!isDeleting) {
   // Typing animation
   if (displayedText.length < currentPhrase.length) {
    const timeout = setTimeout(() => {
     setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
    }, typingSpeed)
    return () => clearTimeout(timeout)
   } else {
    // Finished typing, wait before deleting
    const timeout = setTimeout(() => {
     setIsDeleting(true)
     setTypingSpeed(50) // Faster deletion
    }, 2000) // Wait 2 seconds before deleting
    return () => clearTimeout(timeout)
   }
  } else {
   // Deleting animation
   if (displayedText.length > 0) {
    const timeout = setTimeout(() => {
     setDisplayedText(displayedText.slice(0, -1))
    }, typingSpeed)
    return () => clearTimeout(timeout)
   } else {
    // Finished deleting, move to next phrase
    setIsDeleting(false)
    setTypingSpeed(100) // Reset to normal typing speed
    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
   }
  }
 }, [displayedText, isDeleting, currentPhraseIndex, phrases, typingSpeed])

 return (
  <h1>
   {displayedText}
   <span className="cursor">|</span>
  </h1>
 )
}
