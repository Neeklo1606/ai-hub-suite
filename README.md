# AI Hub (Prisma AI Cloud)

Современный агрегатор AI-сервисов с поддержкой множества моделей для генерации текста, изображений, видео и аудио.

![AI Hub Preview](public/placeholder.svg)

## 🚀 Возможности

- **💬 Текстовые модели** — GPT-4, Claude, Gemini, Mistral и другие
- **🎨 Генерация изображений** — Midjourney, DALL-E, Stable Diffusion
- **🎬 Генерация видео** — Sora, Runway, Kling (в разработке)
- **🎵 Генерация аудио** — ElevenLabs, Suno (в разработке)
- **🎙️ Транскрипция голоса** — ElevenLabs Scribe v2
- **📱 Адаптивный дизайн** — Работает на всех устройствах

## 🛠️ Технологии

### Frontend
- **React 18** + TypeScript
- **Vite** — Сборка и dev-сервер
- **Tailwind CSS** — Стилизация
- **shadcn/ui** — UI-компоненты
- **Framer Motion** — Анимации
- **React Query** — Управление состоянием
- **React Router DOM** — Роутинг

### Backend
- **Внешний API** — Laravel/PHP (`https://api.siteaccess.ru/api`)
- **Lovable Cloud** — Edge Functions, база данных
- **ElevenLabs** — Транскрипция голоса (Scribe v2)

## 📦 Установка

### Требования
- Node.js 18+ или Bun
- npm или bun

### Локальная разработка

```bash
# Клонировать репозиторий
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Установить зависимости
npm install
# или
bun install

# Запустить dev-сервер
npm run dev
# или
bun dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## ⚙️ Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Внешний API для авторизации и данных
VITE_API_URL=https://api.siteaccess.ru/api

# Supabase (автоматически настраивается Lovable Cloud)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

## 📁 Структура проекта

```
src/
├── components/
│   ├── admin/          # Компоненты админ-панели
│   ├── chat/           # Компоненты чата
│   ├── dashboard/      # Компоненты дашборда
│   ├── image/          # Генерация изображений
│   ├── landing/        # Лендинг страница
│   └── ui/             # shadcn/ui компоненты
├── hooks/              # React хуки
├── integrations/       # Интеграции (Supabase)
├── lib/                # Утилиты
├── pages/              # Страницы приложения
├── services/           # API сервисы
└── test/               # Тесты

supabase/
└── functions/          # Edge Functions
    ├── elevenlabs-scribe-token/
    └── elevenlabs-transcribe/

public/                 # Статические файлы
```

## 📄 Страницы

| Путь | Описание | Доступ |
|------|----------|--------|
| `/` | Лендинг | Публичный |
| `/login` | Вход | Публичный |
| `/register` | Регистрация | Публичный |
| `/forgot-password` | Восстановление пароля | Публичный |
| `/dashboard` | Главная панель | Авторизованный |
| `/dashboard/chat` | AI Чат | Авторизованный |
| `/dashboard/image` | Генерация изображений | Авторизованный |
| `/admin` | Админ-панель | Только root |
| `/docs` | Документация дизайн-системы | Публичный |

## 🎨 Дизайн-система

Проект использует светлый минималистичный дизайн:

- **Основной фон**: `#FAFAFA` (почти белый)
- **Текст**: `#1A1A1A` (темно-серый)
- **Акцент**: `#8B5CF6` (фиолетовый)

Подробная документация доступна на странице `/docs`

## 🚀 Деплой

### Через Lovable
1. Откройте проект в Lovable
2. Нажмите **Share → Publish**
3. Приложение будет доступно по адресу `*.lovable.app`

### Кастомный домен
1. Перейдите в **Project → Settings → Domains**
2. Нажмите **Connect Domain**
3. Следуйте инструкциям для настройки DNS

## 📋 Roadmap

См. [.lovable/plan.md](.lovable/plan.md) для полного плана развития.

### Q1 2026 (Текущий)
- ✅ Landing page (светлая тема)
- ✅ Система авторизации
- ✅ Dashboard с навигацией
- ✅ Chat интерфейс
- ✅ Image generation UI
- ✅ Voice transcription
- ⏳ Интеграция с внешним API
- ⏳ Биллинг и платежи

### Q2-Q4 2026
- Реальные AI-модели
- Видео генерация
- Аудио генерация
- API для разработчиков
- Enterprise функции

## 📝 Лицензия

MIT License — используйте как хотите.

## 🤝 Контакты

- **Сайт**: [prisma-ai-cloud.lovable.app](https://prisma-ai-cloud.lovable.app)
- **Email**: support@siteaccess.ru
