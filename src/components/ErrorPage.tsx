"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RxExclamationTriangle } from "react-icons/rx";


function ErrorPage() {
  return (
    <>
      <Alert variant="destructive" className="flex flex-col w-full h-full items-center justify-center rounded-none">
      <AlertTitle> 
         <RxExclamationTriangle className="h-[1rem] w-[1rem] inline" />
         Error
      </AlertTitle>
      <AlertDescription>
      Error occurs during loading.
      </AlertDescription>
    </Alert>
    </>
  );
}

export default ErrorPage;