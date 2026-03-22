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
          code: `import { StrictMode } from "react";\n
                 import { createRoot } from "react-dom/client";\n
                 import ".${scssPath}";\n
                 import App from ".${jsxPath}";\n\n
                 
                 const root = createRoot(document.getElementById("root"));\n
                 root.render(<StrictMode> <App /> </StrictMode>);`,
          hidden: true,
        },

        [jsxPath]: { code: jsxDefaultCode, active: true },
        [scssPath]: { code: scssDefaultCode },
      }}
    >
      <div className="sandbox-layout">
        <div className="preview-top">
          <SandpackLayout className="custom-sp-layout">
            <SandpackPreview
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

        {/* Un singur container nativ cu tab-uri */}
        <div className={`editors-bottom ${showCode ? "open" : ""}`}>
          <SandpackLayout className="custom-sp-layout editor-wrapper">
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
