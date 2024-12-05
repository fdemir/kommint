import Editor from "@monaco-editor/react";
import { StreamableValue, useStreamableValue } from "ai/rsc";

export const EditorComponent = ({ value }: { value: StreamableValue }) => {
  const [code] = useStreamableValue(value);

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue=""
      value={code}
      options={{
        readOnly: true,
      }}
    />
  );
};
