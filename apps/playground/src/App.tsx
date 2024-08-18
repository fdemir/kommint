import "@kommint/react/dist/index.css";
import { KommintProvider, Comments } from "@kommint/react";

function Body() {
  return (
    <div>
      <Comments />
    </div>
  );
}

function App() {
  return (
    <KommintProvider appId="test">
      <Body />
    </KommintProvider>
  );
}

export default App;
