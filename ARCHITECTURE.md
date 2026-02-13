# Aura — Architecture & Deploy Checklist

## Overview
**Aura** — минималистичная платформа для работы с юридическими документами.  
Stack: React 18 · Vite · Tailwind CSS · Supabase (Auth / DB / Edge Functions)

---

## Project Structure

```
src/
├── App.tsx                          # Router, providers
├── main.tsx                         # Entry point
├── index.css                        # Design tokens (HSL), Tailwind base
│
├── lib/
│   ├── branding.ts                  # BRAND constants (name, tagline, domain)
│   ├── utils.ts                     # cn() helper
│   └── axios.ts                     # Axios instance
│
├── hooks/
│   ├── use-mobile.tsx               # Responsive breakpoint hook
│   ├── use-toast.ts                 # Toast notifications hook
│   └── useSpeechRecognition.ts      # Web Speech API hook
│
├── services/
│   ├── authService.ts               # Auth API (login, register, logout)
│   └── adminService.ts              # Admin panel API
│
├── integrations/
│   └── supabase/
│       ├── client.ts                # Auto-generated Supabase client
│       └── types.ts                 # Auto-generated DB types
│
├── components/
│   ├── ProtectedRoute.tsx           # Auth guard
│   ├── AdminProtectedRoute.tsx      # Admin auth guard
│   ├── ui/                          # shadcn/ui primitives (40+ components)
│   ├── chat/
│   │   ├── ChatInput.tsx            # Message input with toolbar
│   │   ├── ChatMessage.tsx          # Single message bubble
│   │   ├── ChatMessageList.tsx      # Messages container
│   │   └── ModelSelector.tsx        # AI model picker
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx      # Shell with sidebar + content
│   │   └── AppSidebar.tsx           # Navigation sidebar
│   └── admin/
│       ├── AdminLayout.tsx          # Admin shell
│       └── AdminSidebar.tsx         # Admin navigation
│
├── pages/
│   ├── Landing.tsx                  # Public landing page (/)
│   ├── Login.tsx                    # Auth: sign in
│   ├── Register.tsx                 # Auth: sign up
│   ├── ForgotPassword.tsx           # Auth: password recovery
│   ├── ResetPassword.tsx            # Auth: password reset
│   ├── Onboarding/                  # 4-step onboarding wizard
│   │   ├── index.tsx                # State machine & step routing
│   │   ├── OnboardingLayout.tsx     # Progress bar + centered card
│   │   ├── Step1UserType.tsx        # User type selection
│   │   ├── Step2Specialization.tsx  # Legal specialization
│   │   ├── Step3Frequency.tsx       # Usage frequency
│   │   └── Step4Workspace.tsx       # Name input + redirect
│   ├── Dashboard.tsx                # Main workspace
│   ├── Chat.tsx                     # AI chat interface
│   ├── Admin.tsx                    # Admin panel
│   └── NotFound.tsx                 # 404 page
│
└── supabase/
    └── functions/
        ├── elevenlabs-scribe-token/ # Voice transcription token
        └── elevenlabs-transcribe/   # Voice transcription endpoint
```

---

## Routes

| Path                | Auth     | Component         | Description              |
|---------------------|----------|-------------------|--------------------------|
| `/`                 | Public   | Landing           | Marketing landing page   |
| `/onboarding`       | Public   | Onboarding        | 4-step setup wizard      |
| `/login`            | Public   | Login             | Sign in                  |
| `/register`         | Public   | Register          | Sign up                  |
| `/forgot-password`  | Public   | ForgotPassword    | Password recovery        |
| `/reset-password`   | Public   | ResetPassword     | Password reset           |
| `/dashboard`        | Protected| Dashboard         | Main workspace           |
| `/dashboard/*`      | Protected| Dashboard         | Dashboard sub-routes     |
| `/dashboard/text/*` | Protected| Chat              | AI chat                  |
| `/chat`             | Protected| Chat              | AI chat (direct)         |
| `/admin`            | Admin    | Admin             | Admin panel              |

---

## Design System

- **Tokens**: HSL variables in `index.css` (`--background`, `--foreground`, `--primary`, etc.)
- **Theme**: Monochrome B2B — dark bg `#0A0A0A`, light text `#E5E5E5`, white accent
- **Components**: shadcn/ui primitives in `src/components/ui/`
- **Icons**: lucide-react (no emoji)
- **Motion**: framer-motion for page transitions

---

## Deploy Checklist

### Pre-deploy
- [x] All references updated to "Aura"
- [x] Favicon: SVG letter "A" in circle
- [x] Document title: "Aura — Юридический AI"
- [x] OG meta tags updated
- [x] Unused components removed (old landing, image gen, docs, placeholder pages)
- [x] Unused NavLink component removed
- [x] Clean imports — no broken references
- [x] English component naming convention
- [x] Branding constants in `src/lib/branding.ts`

### Security
- [ ] RLS policies on all user-facing tables
- [ ] Auth email confirmation enabled
- [ ] Edge function secrets configured
- [ ] Admin route properly guarded

### Performance
- [x] Tree-shakable icon imports (lucide-react)
- [x] Lazy loading candidates: Admin, Onboarding (future)
- [x] No unused dependencies in bundle

### Post-deploy
- [ ] Test auth flow (register → verify email → login → dashboard)
- [ ] Test onboarding flow (4 steps → dashboard)
- [ ] Verify mobile responsiveness
- [ ] Check favicon renders in browser tab
- [ ] Verify OG tags with social preview tools
