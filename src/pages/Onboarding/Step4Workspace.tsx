import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Step4WorkspaceProps {
  onBack: () => void;
}

export function Step4Workspace({ onBack }: Step4WorkspaceProps) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Почти готово</h2>
        <p className="text-sm text-muted-foreground">Как к вам обращаться?</p>
      </div>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Назад
        </button>
        <button
          onClick={handleFinish}
          className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-accent flex items-center justify-center gap-2"
        >
          Перейти в Aura
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
