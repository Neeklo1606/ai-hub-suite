 import { cn } from "@/lib/utils";
 
 interface SkeletonProps {
   className?: string;
 }
 
 export function Skeleton({ className }: SkeletonProps) {
   return (
     <div
       className={cn(
         "animate-pulse rounded-lg bg-slate-800/50",
         className
       )}
       aria-hidden="true"
     />
   );
 }
 
 export function SkeletonCard() {
   return (
     <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/40 space-y-4">
       <Skeleton className="h-12 w-12 rounded-xl" />
       <Skeleton className="h-6 w-3/4" />
       <Skeleton className="h-4 w-full" />
       <Skeleton className="h-4 w-5/6" />
     </div>
   );
 }
 
 export function SkeletonText({ lines = 3 }: { lines?: number }) {
   return (
     <div className="space-y-2" aria-label="Загрузка контента">
       {Array.from({ length: lines }).map((_, i) => (
         <Skeleton
           key={i}
           className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
         />
       ))}
     </div>
   );
 }