import { useEffect, useState } from "react"
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice"

const useSpeech = () => {
	const [speech, setSpeech] = useState("")

	const startListening = async () => await Voice.start("en_US")

	const onSpeechPartialResults = (e: SpeechResultsEvent) => {
		if (e.value) {
			setSpeech(e.value.join(""))
		}
	}

	const onSpeechResults = (e: SpeechResultsEvent) => {
		if (e.value) {
			setSpeech(e.value[0])
		}
	}

	useEffect(() => {
		Voice.onSpeechPartialResults = onSpeechPartialResults
		Voice.onSpeechResults = onSpeechResults
		return () => {
			Voice.destroy().then(Voice.removeAllListeners)
		}
	}, [])

	return { speech, startListening }
}
export default useSpeech
