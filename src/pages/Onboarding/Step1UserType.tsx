import { User, Briefcase, Building } from "lucide-react";
import { cn } from "@/lib/utils";

const userTypes = [
  { value: "individual", label: "Физическое лицо", description: "Личные юридические вопросы", icon: User },
  { value: "legal", label: "Юрист", description: "Профессиональная практика", icon: Briefcase },
  { value: "business", label: "Бизнес", description: "Корпоративные задачи", icon: Building },
];

interface Step1UserTypeProps {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}

export function Step1UserType({ value, onChange, onNext }: Step1UserTypeProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-foreground">Кто вы?</h2>

      <div className="space-y-3">
        {userTypes.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-colors",
              value === t.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
              value === t.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <t.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.description}</div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Далее
      </button>
    </div>
  );
}
