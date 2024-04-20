import { useEffect, useState } from "react";

const ANIMATION_TIME = 300;

export default function useMount(open: boolean) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (open && !mounted) setMounted(true);
    else if (!open && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [open]);

  return mounted;
}
