import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/landing/Header";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.forgotPassword({ email });
      setIsSent(true);
      toast({
        title: "Письмо отправлено",
        description: "Проверьте вашу почту для сброса пароля",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось отправить письмо",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-16 px-4">
          <div className="w-full max-w-md">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm text-center">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Письмо отправлено</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Мы отправили инструкции по сбросу пароля на {email}
              </p>
              <Link to="/login">
                <Button variant="hero" className="w-full">
                  Вернуться к входу
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Вернуться к входу
              </Link>
              <h1 className="text-2xl font-bold mb-2">Восстановление пароля</h1>
              <p className="text-sm text-muted-foreground">
                Введите ваш email, и мы отправим инструкции по сбросу пароля
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="hero"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  "Отправить инструкции"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
