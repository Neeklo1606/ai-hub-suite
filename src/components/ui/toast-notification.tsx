 import { toast } from "sonner";
 import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
 
 interface ToastOptions {
   title: string;
   description?: string;
   duration?: number;
 }
 
 export const showToast = {
   success: ({ title, description, duration = 4000 }: ToastOptions) => {
     toast.success(title, {
       description,
       duration,
       icon: <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />,
     });
   },
   
   error: ({ title, description, duration = 5000 }: ToastOptions) => {
     toast.error(title, {
       description,
       duration,
       icon: <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />,
     });
   },
   
   warning: ({ title, description, duration = 4000 }: ToastOptions) => {
     toast.warning(title, {
       description,
       duration,
       icon: <AlertCircle className="w-5 h-5 text-yellow-500" aria-hidden="true" />,
     });
   },
   
   info: ({ title, description, duration = 4000 }: ToastOptions) => {
     toast.info(title, {
       description,
       duration,
       icon: <Info className="w-5 h-5 text-indigo-500" aria-hidden="true" />,
     });
   },
 };