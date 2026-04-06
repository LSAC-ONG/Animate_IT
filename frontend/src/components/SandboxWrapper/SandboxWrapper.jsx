import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
  useSandpack,
} from "@codesandbox/sandpack-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { sass } from "@codemirror/lang-sass";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import "./SandboxWrapper.scss";

const CustomEditorScreen = ({ path, fileName, language }) => {
  const { sandpack } = useSandpack();

  return (
    <div className="custom-screen">
      <div className="screen-header">{fileName}</div>
      <div className="editor-container">
        <CodeMirror
          value={sandpack.files[path].code}
          height="100%"
          theme={vscodeDark}
          extensions={[language === "jsx" ? javascript({ jsx: true }) : sass()]}
          onChange={(value) => sandpack.updateFile(path, value)}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            dropCursor: true,
            indentOnInput: true,
          }}
        />
      </div>
    </div>
  );
};

function SandboxWrapper({
  jsxDefaultCodeName,
  jsxDefaultCode,
  scssDefaultCodeName,
  scssDefaultCode,
}) {
  const jsxPath = `/${jsxDefaultCodeName}`;
  const scssPath = `/${scssDefaultCodeName}`;

  return (
    <SandpackProvider
      template="react"
      files={{
        "/index.js": {
          code: `import { StrictMode } from "react";
                 import { createRoot } from "react-dom/client";
                 import ".${scssPath}";
                 import App from ".${jsxPath}";

                 const style = document.createElement('style');
                 style.textContent = \`
                   body { 
                     margin: 0; 
                     padding: 0; 
                     min-height: 100vh; 
                     color: white;
                     overflow: hidden;
                   }
                   #root { 
                     width: 100vw; 
                     height: 100vh; 
                     display: flex; 
                     align-items: center; 
                     justify-content: center; 
                   }
                 \`;
                 document.head.appendChild(style);
                 
                 const root = createRoot(document.getElementById("root"));
                 root.render(<StrictMode><App /></StrictMode>);`,
          hidden: true,
        },
        [jsxPath]: { code: jsxDefaultCode },
        [scssPath]: { code: scssDefaultCode },
      }}
    >
      <div className="sandbox-layout">
        <div className="preview-container">
          <SandpackLayout className="layout-reset">
            <SandpackPreview
              showRefreshButton={true}
              showOpenInCodeSandbox={false}
            />
          </SandpackLayout>
        </div>

        <div className="editors-row">
          <CustomEditorScreen
            path={jsxPath}
            fileName={jsxDefaultCodeName}
            language="jsx"
          />
          <CustomEditorScreen
            path={scssPath}
            fileName={scssDefaultCodeName}
            language="scss"
          />
        </div>
      </div>
    </SandpackProvider>
  );
}

export default SandboxWrapper;
