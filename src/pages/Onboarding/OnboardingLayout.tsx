import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface OnboardingLayoutProps {
  step: number;
  children: ReactNode;
}

export function OnboardingLayout({ step, children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-lg px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-xl font-semibold text-foreground">Aura</Link>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Шаг {step} из 4</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
