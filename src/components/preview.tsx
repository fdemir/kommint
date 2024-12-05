"use client";

import { useQuery } from "@tanstack/react-query";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo } from "react";

interface ComponentPreviewProps {
  value: StreamableValue;
}

export function ComponentPreview({ value }: ComponentPreviewProps) {
  const [code] = useStreamableValue(value);

  const { data: bundle } = useQuery({
    queryKey: ["bundler", code],
    queryFn: async () => {
      const response = await fetch("/api/bundler", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      return response.json();
    },
    enabled: !!code,
  });

  useEffect(() => {
    if (bundle?.css) {
      const hasExistingStyle = document.querySelector(
        "[preview-css]"
      ) as HTMLStyleElement;

      if (hasExistingStyle) {
        hasExistingStyle.innerHTML = bundle.css;
        return;
      }

      const style = document.createElement("style");
      style.setAttribute("preview-css", "");
      style.innerHTML = bundle.css;
      document.head.appendChild(style);
    }
  }, [bundle]);

  const Component = useMemo(
    () => bundle && getMDXComponent(bundle?.code),
    [bundle]
  );

  if (!Component) return <div>Loading...</div>;

  return <Component />;
}
