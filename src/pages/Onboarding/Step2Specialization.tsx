import { Scale, Shield, Landmark, Users, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const specializations = [
  { value: "civil", label: "Гражданское", icon: Scale },
  { value: "criminal", label: "Уголовное", icon: Shield },
  { value: "corporate", label: "Корпоративное", icon: Landmark },
  { value: "labor", label: "Трудовое", icon: Users },
  { value: "other", label: "Другое", icon: HelpCircle },
];

interface Step2SpecializationProps {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Specialization({ value, onChange, onNext, onBack }: Step2SpecializationProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-foreground">Какая область права вас интересует?</h2>

      <div className="space-y-3">
        {specializations.map((s) => (
          <button
            key={s.value}
            onClick={() => onChange(s.value)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-colors",
              value === s.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
              value === s.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <s.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-foreground">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Назад
        </button>
        <button
          onClick={onNext}
          disabled={!value}
          className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
