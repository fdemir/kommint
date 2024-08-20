import "@kommint/react/dist/index.css";
import { KommintProvider, Comments } from "@kommint/react";

function Body() {
  return (
    <div style={{ width: "400px" }}>
      <Comments uid="example" />
    </div>
  );
}

function App() {
  return (
    <KommintProvider appId="2b9b184b-bd58-40c9-82d4-7a5393031cfe">
      <Body />
    </KommintProvider>
  );
}

export default App;
