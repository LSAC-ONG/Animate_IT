import "./SandboxWrapper.scss";
import { useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";

function SandboxWrapper({
  jsxDefaultCodeName,
  jsxDefaultCode,

  scssDefaultCodeName,
  scssDefaultCode,
}) {
  const [showCode, setShowCode] = useState(false);

  const jsxPath = `/${jsxDefaultCodeName}`;
  const scssPath = `/${scssDefaultCodeName}`;

  return (
    <SandpackProvider
      template="react"
      theme="dark"
      files={{
        "/App.js": { code: "", hidden: true },
        "/index.js": {
          code: `import { StrictMode } from "react";
                 import { createRoot } from "react-dom/client";
                 import ".${scssPath}";
                 import App from ".${jsxPath}";

                 document.body.style.cssText = "margin: 0; padding: 0; background: #151515; display: grid; place-items: center; min-height: 100vh; overflow: hidden;";\n
                 const root = createRoot(document.getElementById("root"));\n
                 root.render(<StrictMode> <App /> </StrictMode>);`,
          hidden: true,
        },

        [jsxPath]: { code: jsxDefaultCode, active: true },
        [scssPath]: { code: scssDefaultCode },
      }}
    >
      <div className="sandbox-layout">
        <div className="sandpack-container">
          <SandpackLayout className="sandpack-layout">
            <SandpackPreview
              className="sandpack-preview"
              showOpenInCodeSandbox={false}
              showRefreshButton={true}
            />
          </SandpackLayout>
        </div>

        <div className="arrows-row">
          <button className="code-btn" onClick={() => setShowCode(!showCode)}>
            {showCode ? "ANIMATION" : "CODE"}
          </button>
        </div>

        <div
          className={`sandpack-container editors-container ${showCode ? "open" : ""}`}
        >
          <SandpackLayout className="sandpack-layout">
            <SandpackCodeEditor
              showTabs={true}
              showLineNumbers={true}
              closableTabs={false}
            />
          </SandpackLayout>
        </div>
      </div>
    </SandpackProvider>
  );
}

export default SandboxWrapper;
