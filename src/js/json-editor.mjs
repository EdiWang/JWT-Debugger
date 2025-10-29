import { highlightJSON } from './json-highlighter.mjs';

/**
 * Initialize a JSON editor with syntax highlighting and smart editing features
 * @param {HTMLTextAreaElement} textarea - The textarea element
 * @param {HTMLElement} highlightElement - The element for syntax highlighting
 * @param {Function} onChange - Callback function when content changes
 */
export function initJSONEditor(textarea, highlightElement, onChange) {
    // Synchronize scroll between textarea and highlight
    const syncScroll = () => {
        highlightElement.scrollTop = textarea.scrollTop;
        highlightElement.scrollLeft = textarea.scrollLeft;
    };

    // Update syntax highlighting
    const updateHighlight = () => {
        const text = textarea.value;
        highlightElement.innerHTML = highlightJSON(text) || '\n';
        if (onChange) onChange();
    };

    // Handle auto-indentation and smart editing
    const handleKeyDown = (e) => {
        const { selectionStart, selectionEnd, value } = textarea;

        // Tab key - insert 2 spaces
        if (e.key === 'Tab') {
            e.preventDefault();
            const before = value.substring(0, selectionStart);
            const after = value.substring(selectionEnd);
            const spaces = '  '; // 2 spaces
            
            textarea.value = before + spaces + after;
            textarea.selectionStart = textarea.selectionEnd = selectionStart + spaces.length;
            updateHighlight();
            return;
        }

        // Enter key - auto-indent
        if (e.key === 'Enter') {
            e.preventDefault();
            const before = value.substring(0, selectionStart);
            const after = value.substring(selectionEnd);
            
            // Get current line indentation
            const currentLineStart = before.lastIndexOf('\n') + 1;
            const currentLine = before.substring(currentLineStart);
            const indentMatch = currentLine.match(/^(\s*)/);
            let indent = indentMatch ? indentMatch[1] : '';
            
            // Check if previous character is opening bracket/brace
            const lastChar = before.trim().slice(-1);
            const nextChar = after.trim().charAt(0);
            
            if ((lastChar === '{' || lastChar === '[') && (nextChar === '}' || nextChar === ']')) {
                // Insert newline with extra indent, then newline with current indent
                const newIndent = indent + '  ';
                textarea.value = before + '\n' + newIndent + '\n' + indent + after;
                textarea.selectionStart = textarea.selectionEnd = selectionStart + newIndent.length + 1;
            } else if (lastChar === '{' || lastChar === '[' || lastChar === ',') {
                // Add extra indentation
                indent += '  ';
                textarea.value = before + '\n' + indent + after;
                textarea.selectionStart = textarea.selectionEnd = selectionStart + indent.length + 1;
            } else {
                // Maintain current indentation
                textarea.value = before + '\n' + indent + after;
                textarea.selectionStart = textarea.selectionEnd = selectionStart + indent.length + 1;
            }
            
            updateHighlight();
            return;
        }

        // Auto-complete brackets and quotes
        const pairs = {
            '{': '}',
            '[': ']',
            '"': '"',
            "'": "'"
        };

        if (pairs[e.key]) {
            const nextChar = value.charAt(selectionEnd);
            
            // For quotes, only auto-complete if not already closing a quote
            if ((e.key === '"' || e.key === "'") && nextChar === e.key) {
                // Skip the existing closing quote
                e.preventDefault();
                textarea.selectionStart = textarea.selectionEnd = selectionEnd + 1;
                return;
            }

            // Auto-complete if there's no selection or we're at the end/whitespace
            if (selectionStart === selectionEnd && (!nextChar || /[\s\]}),]/.test(nextChar))) {
                e.preventDefault();
                const before = value.substring(0, selectionStart);
                const after = value.substring(selectionEnd);
                const pair = pairs[e.key];
                
                textarea.value = before + e.key + pair + after;
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
                updateHighlight();
                return;
            }
        }

        // Auto-delete closing pair
        if (e.key === 'Backspace') {
            const before = value.charAt(selectionStart - 1);
            const after = value.charAt(selectionEnd);
            
            const shouldDeletePair = 
                (before === '{' && after === '}') ||
                (before === '[' && after === ']') ||
                (before === '"' && after === '"') ||
                (before === "'" && after === "'");
            
            if (shouldDeletePair && selectionStart === selectionEnd) {
                e.preventDefault();
                textarea.value = value.substring(0, selectionStart - 1) + value.substring(selectionEnd + 1);
                textarea.selectionStart = textarea.selectionEnd = selectionStart - 1;
                updateHighlight();
                return;
            }
        }

        // Skip closing bracket/brace if it's the next character
        if ((e.key === '}' || e.key === ']') && value.charAt(selectionEnd) === e.key) {
            e.preventDefault();
            textarea.selectionStart = textarea.selectionEnd = selectionEnd + 1;
            return;
        }
    };

    // Attach event listeners
    textarea.addEventListener('input', updateHighlight);
    textarea.addEventListener('scroll', syncScroll);
    textarea.addEventListener('keydown', handleKeyDown);

    // Initial highlight
    updateHighlight();

    // Return cleanup function
    return () => {
        textarea.removeEventListener('input', updateHighlight);
        textarea.removeEventListener('scroll', syncScroll);
        textarea.removeEventListener('keydown', handleKeyDown);
    };
}