import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export const BACKEND_URL = "https://dummyjson.com";

export function classes(...classLists: (string | null | undefined | false)[]) {
  return twMerge(
    ...classLists.map((classList) => (!classList ? null : classList))
  );
}

export function notify(message: React.ReactNode) {
  toast(<div className="flex items-center">{message}</div>);
}
