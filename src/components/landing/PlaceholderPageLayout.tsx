 import { motion } from "framer-motion";
 import { Button } from "@/components/ui/button";
 import { ArrowLeft, ChevronRight, Home } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Header } from "./Header";
 import { Footer } from "./Footer";
 
 interface PlaceholderPageLayoutProps {
   title: string;
   breadcrumb: string;
 }
 
 export function PlaceholderPageLayout({ title, breadcrumb }: PlaceholderPageLayoutProps) {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
           {/* Breadcrumb */}
           <motion.nav
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
             className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
           >
             <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
               <Home className="w-4 h-4" />
               <span>Главная</span>
             </Link>
             <ChevronRight className="w-4 h-4" />
             <span className="text-primary">{breadcrumb}</span>
           </motion.nav>
 
           {/* Page Title */}
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 sm:mb-12"
           >
             {title}
           </motion.h1>
 
           {/* Placeholder Content */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="p-8 sm:p-12 rounded-2xl bg-card border border-border backdrop-blur-sm text-center"
           >
             <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
               <span className="text-3xl">🚧</span>
             </div>
             <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
               Страница в разработке
             </p>
             <p className="text-sm sm:text-base text-muted-foreground/70 mb-8 max-w-md mx-auto">
               Мы работаем над этим разделом. Скоро здесь появится полезный контент.
             </p>
             <Link to="/">
               <Button>
                 <ArrowLeft className="w-4 h-4 mr-2" />
                 Вернуться на главную
               </Button>
             </Link>
           </motion.div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 }
