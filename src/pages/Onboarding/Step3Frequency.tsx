import { CalendarClock, CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const frequencies = [
  { value: "daily", label: "Ежедневно", icon: CalendarClock },
  { value: "weekly", label: "Несколько раз в неделю", icon: CalendarDays },
  { value: "occasional", label: "По мере необходимости", icon: Clock },
];

interface Step3FrequencyProps {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Frequency({ value, onChange, onNext, onBack }: Step3FrequencyProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-foreground">Как часто планируете использовать?</h2>

      <div className="space-y-3">
        {frequencies.map((f) => (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-colors",
              value === f.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
              value === f.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <f.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-foreground">{f.label}</span>
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
