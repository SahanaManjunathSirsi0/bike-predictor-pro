import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Mic, MicOff, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatbotProps {
  context?: Record<string, any>;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = ({ context }: ChatbotProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 नमस्ते! मैं RideWise AI हूँ 🤖 | Namaskara! Naanu RideWise AI 🤖\n\n**English | हिंदी | ಕನ್ನಡ**\n\nWhat can I help? | मैं क्या मदद करूँ? | ನಾನು ಏನು ಸಹಾಯ ಮಾಡಲು?\n• Peak hours | पीक आवर्स | ಪೀಕ್ ಗಂಟೆಗಳು\n• Weather | मौसम | ಹವಾಮಾನ\n• Demand trends | मांग रुझान | ಬೇಡಿಕೆ ಟ್ರೆಂಡ್\n\n🎤 Mic ಗೆ ಸ್ಪರ್ಶಿಸಿ | Mic दबाएं | Click mic!",
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi" | "kn">("en");
  const [recognition, setRecognition] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Language configurations
  const languages = {
    en: { name: "English", flag: "🇺🇸" },
    hi: { name: "हिंदी", flag: "🇮🇳" },
    kn: { name: "ಕನ್ನಡ", flag: "🇮🇳" },
  };

  const translations = {
    en: {
      welcome: "👋 Hi! I'm RideWise AI 🤖",
      capabilities: "**What I can help with:**\n• Peak demand hours\n• Weather impact\n• CSV insights\n• Manual parameters",
      voice: "🎤 Tap mic to speak",
      placeholder: "Ask 'peak hour today'...",
      listening: "🎤 Listening... Speak now!",
      voiceNotSupported: "🎤 Voice not supported. Use Chrome/Safari.",
      peakHour: "⏰ **Peak Hour Today: 6 PM**\n\n**269 rentals predicted**\n\n*Pro tip:* Reposition bikes by 5 PM!",
      weather: "🌤️ **Weather Impact:**\n• Clear: +20%\n• Rainy: -40%\n• Current: Clear ☀️",
      csv: "📁 **CSV Analysis Ready!**\nGo to /hourly/csv",
      manual: "⚙️ **Manual Mode:**\nAdjust sliders → Generate forecast!",
    },
    hi: {
      welcome: "👋 नमस्ते! मैं RideWise AI हूँ 🤖",
      capabilities: "**मैं क्या मदद करूँ:**\n• पीक डिमांड घंटे\n• मौसम प्रभाव\n• CSV विश्लेषण\n• मैनुअल पैरामीटर",
      voice: "🎤 माइक दबाएं बोलने के लिए",
      placeholder: "पूछें 'आज पीक घंटा'...",
      listening: "🎤 सुन रहा हूँ... बोलें!",
      voiceNotSupported: "🎤 वॉइस सपोर्ट नहीं। Chrome/Safari यूज़ करें।",
      peakHour: "⏰ **आज पीक घंटा: शाम 6 बजे**\n\n**269 किराए की भविष्यवाणी**\n\n*टिप:* 5 बजे तक बाइक रीपोजिशन करें!",
      weather: "🌤️ **मौसम प्रभाव:**\n• साफ: +20%\n• बारिश: -40%\n• अभी: साफ ☀️",
      csv: "📁 **CSV विश्लेषण तैयार!**\n/hourly/csv पर जाएं",
      manual: "⚙️ **मैनुअल मोड:**\nस्लाइडर एडजस्ट करें → फोरकास्ट जेनरेट!",
    },
    kn: {
      welcome: "👋 ನಮಸ್ಕಾರ! ನಾನು RideWise AI 🤖",
      capabilities: "**ನಾನು ಏನು ಸಹಾಯ ಮಾಡಲು:**\n• ಪೀಕ್ ಡಿಮ್ಯಾಂಡ್ ಗಂಟೆಗಳು\n• ಹವಾಮಾನ ಪರಿಣಾಮ\n• CSV ವಿಶ್ಲೇಷಣೆ\n• ಮ್ಯಾನುಯಲ್ ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು",
      voice: "🎤 ಮೈಕ್ ಒತ್ತಿ ಮಾತಾಡಿ",
      placeholder: "ಚೆಸ್ಟೀನ್ 'ಇಂದು ಪೀಕ್ ಗಂಟೆ'...",
      listening: "🎤 ಕೇಳುತ್ತಿದ್ದೇನೆ... ಮಾತಾಡಿ!",
      voiceNotSupported: "🎤 ಧ್ವನಿ ಸಪೋರ್ಟ್ ಇಲ್ಲ. Chrome/Safari ಬಳಸಿ.",
      peakHour: "⏰ **ಇಂದು ಪೀಕ್ ಗಂಟೆ: 6 PM**\n\n**269 ರೆಂಟಲ್ ಊಹೆ**\n\n*ಟಿಪ್:* 5 PM ರೊಳಗೆ ಬೈಕ್‌ಗಳನ್ನು ರೀಪೊಸಿಷನ್ ಮಾಡಿ!",
      weather: "🌤️ **ಹವಾಮಾನ ಪರಿಣಾಮ:**\n• ಸ್ಪಷ್ಟ: +20%\n• ಮಳೆ: -40%\n• ಇಂದು: ಸ್ಪಷ್ಟ ☀️",
      csv: "📁 **CSV ವಿಶ್ಲೇಷಣೆ ಸಿದ್ಧ!**\n/hourly/csv ಗೆ ಹೋಗಿ",
      manual: "⚙️ **ಮ್ಯಾನುಯಲ್ ಮೋಡ್:**\nಸ್ಲೈಡರ್ ಸರಿಹೊಳೆಸಿ → ಫೋರ್‌ಕಾಸ್ಟ್ ಜನರೇಟ್!",
    },
  };

  // Voice Recognition Setup (unchanged)
  useEffect(() => {
    if ('webkitSpeechRecognition' in (window as any) || 'SpeechRecognition' in (window as any)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const rec = new SpeechRecognition();
      
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setInput(translations[language].listening);
      };

      rec.onend = () => {
        setIsListening(false);
        if (input === translations[language].listening) setInput("");
      };

      rec.onerror = () => {
        setIsListening(false);
        setInput("");
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      setRecognition(rec);
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getSmartResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('peak') || lowerMsg.includes('पिक') || lowerMsg.includes('पीक') || lowerMsg.includes('ಪೀಕ್')) {
      return translations[language].peakHour;
    }
    if (lowerMsg.includes('weather') || lowerMsg.includes('मौसम') || lowerMsg.includes('हवा') || lowerMsg.includes('ಹವಾ')) {
      return translations[language].weather;
    }
    if (lowerMsg.includes('csv') || lowerMsg.includes('upload')) {
      return translations[language].csv;
    }
    if (lowerMsg.includes('manual') || lowerMsg.includes('स्लाइडर') || lowerMsg.includes('ಸ್ಲೈಡರ್')) {
      return translations[language].manual;
    }
    
    return translations[language].welcome + "\n\n" + translations[language].capabilities;
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: translations[language].voiceNotSupported 
      }]);
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSend = async (message?: string) => {
    const finalMessage = message || input;
    if (!finalMessage.trim()) return;

    const userMessage: Message = { role: "user", content: finalMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiResponse = getSmartResponse(finalMessage);
    setTimeout(() => {
      const botMessage: Message = { role: "assistant", content: aiResponse };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button - Navy Blue */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-20 h-20 rounded-3xl flex flex-col items-center justify-center
                  bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white font-bold text-lg shadow-2xl
                  hover:from-slate-800 hover:via-blue-800 hover:to-slate-700 hover:shadow-3xl hover:scale-105
                  transition-all duration-300 border-4 border-white/30 hover:border-blue-400/50"
      >
        <Globe className="w-8 h-8 mb-1" />
        <span className="text-xs leading-tight">AI</span>
      </button>

      {/* Chat Window - Navy Blue Theme */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-[440px] max-h-[75vh] rounded-3xl border-4 border-slate-800/50
                        bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-800 backdrop-blur-3xl shadow-2xl
                        flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          
          {/* Header - Navy Blue */}
          <div className="p-6 border-b border-blue-800/50 bg-gradient-to-r from-slate-900/95 to-blue-900/95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-700 via-blue-700 to-slate-700 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-white flex items-center gap-2 drop-shadow-lg">
                    RideWise AI {languages[language].flag}
                    {isListening && <div className="w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>}
                  </h3>
                  <p className="text-base text-slate-300 font-semibold drop-shadow-md">{languages[language].name}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-slate-700/50 rounded-xl transition-all hover:scale-110 hover:shadow-lg">
                <X className="w-6 h-6 text-slate-300 hover:text-white" />
              </button>
            </div>

            {/* Language Switcher - FIXED WHITE TEXT ON NAVY BG */}
            <div className="flex justify-center mt-6 space-x-3 p-3 bg-slate-800/80 rounded-2xl backdrop-blur-sm border border-slate-700/50">
              {Object.entries(languages).map(([key, lang]) => (
                <button
                  key={key}
                  onClick={() => setLanguage(key as any)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl duration-300 min-w-[90px]
                  ${language === key
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-2 border-white/30 shadow-emerald-500/30 hover:from-blue-700 hover:to-emerald-700"
                    : "bg-slate-700/80 text-slate-200 hover:bg-slate-600 hover:text-white border-2 border-slate-600/50 hover:border-blue-500/50"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-xs leading-tight">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages - Navy Theme */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-600/50 max-h-[400px] bg-slate-900/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[92%] p-6 rounded-3xl shadow-xl border transition-all animate-in slide-in-from-bottom-2 backdrop-blur-xl
                ${msg.role === "user"
                  ? "ml-auto bg-gradient-to-br from-emerald-500 via-blue-600 to-emerald-500 text-white rounded-br-none shadow-2xl border-0 hover:shadow-emerald-500/40"
                  : "bg-white/10 text-slate-100 rounded-bl-none shadow-xl border-slate-600/30 hover:shadow-slate-500/20 hover:bg-white/20"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed text-base font-medium drop-shadow-lg">{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Navy Blue */}
          <div className="p-6 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/95 to-blue-900/95 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center w-16 h-16 border-2
                ${isListening
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500/50 shadow-red-500/30 animate-pulse scale-105"
                  : "bg-slate-700/80 text-slate-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-500/50 border-slate-600/50 shadow-slate-700/50"
                }`}
                title={isListening ? "Stop Listening" : "🎤 Voice Input"}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isListening && handleSend()}
                placeholder={isListening ? translations[language].listening : translations[language].placeholder}
                className="flex-1 px-6 py-5 rounded-3xl bg-white/20 border-3 border-slate-600/50 backdrop-blur-xl
                          text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500/70 
                          focus:ring-4 focus:ring-blue-500/30 transition-all text-lg font-semibold hover:border-slate-500/70
                          hover:shadow-xl hover:bg-white/30 disabled:opacity-60"
                disabled={isListening}
              />

              <Button
                size="icon"
                onClick={() => handleSend()}
                disabled={!input.trim() || isListening}
                className="w-18 h-18 rounded-3xl bg-gradient-to-r from-emerald-600 to-blue-700 
                          hover:from-emerald-700 hover:to-blue-800 text-white shadow-2xl hover:shadow-emerald-500/40
                          border-3 border-white/40 disabled:opacity-50 disabled:shadow-none"
              >
                <Send className="w-6 h-6" />
              </Button>
            </div>
            
            {isListening && (
              <p className="text-center mt-4 text-base font-bold text-emerald-400 bg-emerald-500/20 px-8 py-4 rounded-2xl border-2 border-emerald-500/30 shadow-xl animate-pulse backdrop-blur-xl">
                🎤 {translations[language].listening}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
