"use client";

import { useQuery } from "@tanstack/react-query";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import { getMDXComponent, getMDXExport } from "mdx-bundler/client";
import { useMemo } from "react";

interface ComponentPreviewProps {
  value: StreamableValue;
}

export function ComponentPreview({ value }: ComponentPreviewProps) {
  const [code] = useStreamableValue(value);

  const { data: bundledCode } = useQuery({
    queryKey: ["bundler", code],
    queryFn: async () => {
      const response = await fetch("/api/bundler", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      return response.text();
    },
    enabled: !!code,
  });

  const Component = useMemo(
    () => bundledCode && getMDXComponent(bundledCode),
    [bundledCode]
  );

  if (!Component) return <div>Loading...</div>;

  return <Component />;
}
