import { useState, useRef } from "react";

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

import copyIcon from "../../../assets/copy_simbol.png";
import "./SandboxWrapper.scss";

const CustomEditorScreen = ({ path, fileName, language }) => {
  const { sandpack } = useSandpack();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    window.alert("Text copied!");
  };

  return (
    <div className="custom-screen">
      <div className="screen-header">
        <div>{fileName}</div>

        <button
          className="copy-btn"
          onClick={() => handleCopy(animationCodes[currentAnimation].css)}
          title="Copy CSS"
        >
          <img src={copyIcon} alt="Copy" />
        </button>
      </div>
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

  const [isDoubled, setIsDoubled] = useState(false);
  const animationRef = useRef(null);
  const codeRef = useRef(null);

  const handleCodeClick = () => {
    setIsDoubled((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (next && codeRef.current) {
          codeRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setTimeout(() => {
            window.scrollBy({ top: 300, left: 0, behavior: "smooth" });
          }, 600);
        } else if (!next && animationRef.current) {
          animationRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setTimeout(() => {
            window.scrollBy({ top: -200, left: 0, behavior: "smooth" });
          }, 600);
        }
      }, 100);
      return next;
    });
  };

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

        <div className="arrows-row">
          <button className="code-btn" onClick={handleCodeClick}>
            {isDoubled ? "ANIMATION" : "CODE"}
          </button>
        </div>

        <div
          ref={codeRef}
          className={`editors-row${isDoubled ? " open" : ""}`}
          style={{
            height: isDoubled ? "35rem" : "0",
            opacity: isDoubled ? 1 : 0,
            overflow: "hidden",
            transition: "height 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s",
          }}
        >
          {/* conditionally render editors based on toggle state */}
          {isDoubled && (
            <>
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
            </>
          )}
        </div>
      </div>
    </SandpackProvider>
  );
}

export default SandboxWrapper;
