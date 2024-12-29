import { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/neat.css';

// Import language modes
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/ruby/ruby';

// Import additional features
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/selection/active-line';
import { useTheme } from "./ThemeProvider";
import ACTIONS from '../../server/Actions';
import LanguageSelector from './LanguageSelector';
import { defaultSnippets } from '../utils/defaultSnippets';

const modeMap = {
    javascript: 'javascript',
    python: 'python',
    cpp: 'text/x-c++src',
    java: 'text/x-java'
};

const Editor = ({socketRef, roomId , onCodeChange}) => {
    const editorRef = useRef(null);  //To store the reference of the editor instance
    const { theme } = useTheme();
    const [language, setLanguage] = useState('javascript');

    useEffect(() => {
        async function init() {
            const textArea = document.getElementById('realtimeEditor');
            if (!textArea) return;
            
            // Create a new CodeMirror instance
            editorRef.current = CodeMirror.fromTextArea(textArea, {
                mode: modeMap[language],
                theme: theme === 'dark' ? 'dracula' : 'neat',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                lineWrapping: true,
                tabSize: 2,
                indentWithTabs: true,
                viewportMargin: Infinity,
                styleActiveLine: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                foldGutter: true,
            });

            // Set initial code
            editorRef.current.setValue(defaultSnippets[language]);

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
    }, [language]);

    
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

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        if (editorRef.current) {
            editorRef.current.setOption('mode', modeMap[newLanguage]);
            editorRef.current.setValue(defaultSnippets[newLanguage]);
            
            // Emit the code change to other users
            socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                roomId,
                code: defaultSnippets[newLanguage],
            });
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setOption('theme', theme === 'dark' ? 'dracula' : 'neat');
        }
    }, [theme]);

    return (
        <div className="h-full w-full flex flex-col">
            <div className="p-2 border-b border-border">
                <LanguageSelector 
                    selectedLanguage={language}
                    onLanguageChange={handleLanguageChange}
                />
            </div>
            <div className="flex-1">
                <textarea id="realtimeEditor"></textarea>
            </div>
        </div>
    );
};

export default Editor;