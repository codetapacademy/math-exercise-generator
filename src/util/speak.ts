export const speakMessage = (message: string) => {
  const messageToSpeak = new SpeechSynthesisUtterance();
  messageToSpeak.text = String(message);
  window.speechSynthesis.speak(messageToSpeak);
}
