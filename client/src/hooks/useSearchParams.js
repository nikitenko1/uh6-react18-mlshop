import { useLocation } from "react-router-dom";

export const useSearchParams = () => {
  const location = useLocation(); // <-- current location being accessed
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'.
  const searchParams = new URLSearchParams(location.search);

  return searchParams;
};
