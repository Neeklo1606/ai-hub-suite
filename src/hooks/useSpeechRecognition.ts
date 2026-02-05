 import { useState, useCallback, useRef, useEffect } from "react";
 
 interface SpeechRecognitionResult {
   transcript: string;
   isFinal: boolean;
 }
 
 interface UseSpeechRecognitionOptions {
   onResult?: (result: SpeechRecognitionResult) => void;
   onError?: (error: string) => void;
   onEnd?: () => void;
   language?: string;
   continuous?: boolean;
 }
 
 // Type declarations for Web Speech API
 interface SpeechRecognitionEvent extends Event {
   results: SpeechRecognitionResultList;
   resultIndex: number;
 }
 
 interface SpeechRecognitionResultList {
   length: number;
   item(index: number): SpeechRecognitionResult;
   [index: number]: SpeechRecognitionResultItem;
 }
 
 interface SpeechRecognitionResultItem {
   isFinal: boolean;
   length: number;
   item(index: number): SpeechRecognitionAlternative;
   [index: number]: SpeechRecognitionAlternative;
 }
 
 interface SpeechRecognitionAlternative {
   transcript: string;
   confidence: number;
 }
 
 interface SpeechRecognitionErrorEvent extends Event {
   error: string;
   message: string;
 }
 
 declare global {
   interface Window {
     SpeechRecognition: new () => SpeechRecognition;
     webkitSpeechRecognition: new () => SpeechRecognition;
   }
 }
 
 interface SpeechRecognition extends EventTarget {
   continuous: boolean;
   interimResults: boolean;
   lang: string;
   start(): void;
   stop(): void;
   abort(): void;
   onresult: ((event: SpeechRecognitionEvent) => void) | null;
   onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
   onend: (() => void) | null;
   onstart: (() => void) | null;
 }
 
 export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
   const {
     onResult,
     onError,
     onEnd,
     language = "ru-RU",
     continuous = false,
   } = options;
 
   const [isListening, setIsListening] = useState(false);
   const [isSupported, setIsSupported] = useState(false);
   const [transcript, setTranscript] = useState("");
   const [interimTranscript, setInterimTranscript] = useState("");
   const recognitionRef = useRef<SpeechRecognition | null>(null);
 
   // Check for browser support
   useEffect(() => {
     const SpeechRecognitionAPI =
       window.SpeechRecognition || window.webkitSpeechRecognition;
     setIsSupported(!!SpeechRecognitionAPI);
   }, []);
 
   const startListening = useCallback(async () => {
     const SpeechRecognitionAPI =
       window.SpeechRecognition || window.webkitSpeechRecognition;
 
     if (!SpeechRecognitionAPI) {
       onError?.("Распознавание речи не поддерживается вашим браузером");
       return;
     }
 
     try {
       // Request microphone permission
       await navigator.mediaDevices.getUserMedia({ audio: true });
     } catch {
       onError?.("Доступ к микрофону запрещён");
       return;
     }
 
     const recognition = new SpeechRecognitionAPI();
     recognitionRef.current = recognition;
 
     recognition.continuous = continuous;
     recognition.interimResults = true;
     recognition.lang = language;
 
     recognition.onstart = () => {
       setIsListening(true);
       setTranscript("");
       setInterimTranscript("");
     };
 
     recognition.onresult = (event: SpeechRecognitionEvent) => {
       let finalTranscript = "";
       let interimText = "";
 
       for (let i = event.resultIndex; i < event.results.length; i++) {
         const result = event.results[i];
         if (result.isFinal) {
           finalTranscript += result[0].transcript;
         } else {
           interimText += result[0].transcript;
         }
       }
 
       if (finalTranscript) {
         setTranscript((prev) => prev + finalTranscript);
         onResult?.({ transcript: finalTranscript, isFinal: true });
       }
 
       setInterimTranscript(interimText);
       if (interimText) {
         onResult?.({ transcript: interimText, isFinal: false });
       }
     };
 
     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
       const errorMessages: Record<string, string> = {
         "no-speech": "Речь не обнаружена",
         "audio-capture": "Микрофон не найден",
         "not-allowed": "Доступ к микрофону запрещён",
         network: "Ошибка сети",
         aborted: "Распознавание прервано",
       };
       onError?.(errorMessages[event.error] || `Ошибка: ${event.error}`);
       setIsListening(false);
     };
 
     recognition.onend = () => {
       setIsListening(false);
       onEnd?.();
     };
 
     recognition.start();
   }, [continuous, language, onEnd, onError, onResult]);
 
   const stopListening = useCallback(() => {
     if (recognitionRef.current) {
       recognitionRef.current.stop();
       setIsListening(false);
     }
   }, []);
 
   const resetTranscript = useCallback(() => {
     setTranscript("");
     setInterimTranscript("");
   }, []);
 
   return {
     isListening,
     isSupported,
     transcript,
     interimTranscript,
     startListening,
     stopListening,
     resetTranscript,
   };
 }