import { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { useTheme } from "./ThemeProvider";
import ACTIONS from '../../server/Actions';

const Editor = ({socketRef, roomId, onCodeChange}) => {
    const editorRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        async function init() {
            const textArea = document.getElementById('realtimeEditor');
            if (!textArea) return;
            
            editorRef.current = CodeMirror.fromTextArea(textArea, {
                mode: 'text/x-c++src',
                theme: theme === 'dark' ? 'dracula' : 'neat',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                lineWrapping: true,
            });

            editorRef.current.setValue('#include <iostream>\n\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}');

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
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current?.off(ACTIONS.CODE_CHANGE);
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