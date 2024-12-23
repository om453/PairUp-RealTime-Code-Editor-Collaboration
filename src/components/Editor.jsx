import { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { useTheme } from "./ThemeProvider";
import ACTIONS from '../Actions';

const Editor = ({socketRef, roomId , onCodeChange}) => {
    const editorRef = useRef(null);  //To store the reference of the editor instance
    const { theme } = useTheme();

    useEffect(() => {
        async function init() {
            const textArea = document.getElementById('realtimeEditor');
            if (!textArea) return;
            
            // Create a new CodeMirror instance
            editorRef.current = CodeMirror.fromTextArea(textArea, {
                mode: { name: 'javascript', json: true },
                theme: theme === 'dark' ? 'dracula' : 'neat',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                lineWrapping: true,
                tabSize: 2,
                indentWithTabs: true,
                viewportMargin: Infinity,
            });

            // Listen for changes in the editor and send the updated code to the server
            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });

            editorRef.current.setSize('100%', '100%');
        }

        init();

        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea();
            }
        };
    }, []);

    
    useEffect(() => {
        if (socketRef.current) {
            // Listen for code change event from the server
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            // Remove the event listener when the component is unmounted
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);


    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setOption('theme', theme === 'dark' ? 'dracula' : 'neat');
        }
    }, [theme]);

    return (
        <div className="h-full w-full">
            <textarea id="realtimeEditor"></textarea>
        </div>
    );
};

export default Editor;