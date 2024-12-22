// import { useEffect, useRef } from "react";
// import CodeMirror from "codemirror";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/dracula.css";
// import "codemirror/theme/neat.css";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import { useTheme } from "../components/ThemeProvider";

// const Editor = () => {
//     const editorRef = useRef(null);
//     const { theme } = useTheme();

//     useEffect(() => {
//         async function init() {
//             const textArea = document.getElementById('realtimeEditor');
//             if (!textArea) return;

//             editorRef.current = CodeMirror.fromTextArea(textArea, {
//                 mode: { name: 'javascript', json: true },
//                 theme: theme === 'dark' ? 'dracula' : 'neat',
//                 autoCloseTags: true,
//                 autoCloseBrackets: true,
//                 lineNumbers: true,
//                 lineWrapping: true,
//                 tabSize: 2,
//                 indentWithTabs: true,
//                 extraKeys: { "Ctrl-Space": "autocomplete" },
//                 viewportMargin: Infinity,
//             });

//             editorRef.current.setSize('100%', '100%');
//         }

//         init();

//         return () => {
//             if (editorRef.current) {
//                 editorRef.current.clearHistory();
//             }
//         };
//     }, []);

//     useEffect(() => {
//         if (editorRef.current) {
//             editorRef.current.setOption('theme', theme === 'dark' ? 'dracula' : 'neat');
//         }
//     }, [theme]);

//     return (
//         <div className="h-full w-full">
//             <textarea id="realtimeEditor"></textarea>
//         </div>
//     );
// };

// export default Editor;


import React from 'react'

const Editor = () => {
  return (
    <div>Editor</div>
  )
}

export default Editor