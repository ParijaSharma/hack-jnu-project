import { useState } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";

export default function AIInputBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsProcessing(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setQuery("");
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
      <form onSubmit={handleSubmit}>
        <div
          className={`
            relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50
            shadow-lg transition-all duration-300 ease-out
            ${isFocused ? "shadow-accent/20 shadow-2xl border-accent/50 scale-[1.02]" : ""}
          `}
        >
          <div className="flex items-center gap-3 p-4">
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-xl
                transition-all duration-300
                ${isFocused ? "bg-accent text-primary" : "bg-secondary/10 text-secondary"}
              `}
            >
              <Sparkles className="h-5 w-5" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your business... e.g., Small textile factory in Surat"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base outline-none"
              disabled={isProcessing}
            />

            <button
              type="submit"
              disabled={!query.trim() || isProcessing}
              className={`
                flex items-center justify-center w-10 h-10 rounded-xl
                transition-all duration-200
                ${
                  query.trim() && !isProcessing
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }
              `}
            >
              {isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>

          {isFocused && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full opacity-50" />
          )}
        </div>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-3">
        AI-powered compliance insights tailored to your business
      </p>
    </div>
  );
}
