const KEY_CODES = [
    "Again",
    "AltLeft",
    "AltRight",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "AudioVolumeDown",
    "AudioVolumeMute",
    "AudioVolumeUp",
    "Backquote",
    "Backslash",
    "Backspace",
    "BracketLeft",
    "BracketRight",
    "BrowserBack",
    "BrowserFavorites",
    "BrowserForward",
    "BrowserHome",
    "BrowserRefresh",
    "BrowserSearch",
    "BrowserStop",
    "Cancel",
    "CapsLock",
    "Comma",
    "ContextMenu",
    "ControlLeft",
    "ControlRight",
    "Convert",
    "Copy",
    "Cut",
    "Delete",
    "Digit0",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Eject",
    "End",
    "Enter",
    "Equal",
    "Escape",
    "F1",
    "F10",
    "F11",
    "F12",
    "F13",
    "F14",
    "F15",
    "F16",
    "F17",
    "F18",
    "F19",
    "F2",
    "F20",
    "F21",
    "F22",
    "F23",
    "F24",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "Find",
    "Fn",
    "HangulMode",
    "Hanja",
    "Help",
    "Home",
    "Insert",
    "IntlBackslash",
    "IntlRo",
    "IntlYen",
    "KanaMode",
    "KeyA",
    "KeyB",
    "KeyC",
    "KeyD",
    "KeyE",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyI",
    "KeyJ",
    "KeyK",
    "KeyL",
    "KeyM",
    "KeyN",
    "KeyO",
    "KeyP",
    "KeyQ",
    "KeyR",
    "KeyS",
    "KeyT",
    "KeyU",
    "KeyV",
    "KeyW",
    "KeyX",
    "KeyY",
    "KeyZ",
    "Lang1",
    "Lang2",
    "LaunchApp1",
    "LaunchApp2",
    "LaunchMail",
    "LaunchMediaPlayer",
    "MediaPlayPause",
    "MediaStop",
    "MediaTrackNext",
    "MediaTrackPrevious",
    "MetaLeft",
    "MetaRight",
    "Minus",
    "NonConvert",
    "NumLock",
    "Numpad0",
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "NumpadAdd",
    "NumpadChangeSign",
    "NumpadComma",
    "NumpadDecimal",
    "NumpadDivide",
    "NumpadEnter",
    "NumpadEqual",
    "NumpadMultiply",
    "NumpadParenLeft",
    "NumpadParenRight",
    "NumpadSubtract",
    "OSLeft",
    "OSRight",
    "Open",
    "PageDown",
    "PageUp",
    "Paste",
    "Pause",
    "Period",
    "Power",
    "PrintScreen",
    "Props",
    "Quote",
    "ScrollLock",
    "Select",
    "Semicolon",
    "ShiftLeft",
    "ShiftRight",
    "Slash",
    "Space",
    "Tab",
    "Undo",
    "Unidentified",
    "VolumeDown",
    "VolumeUp",
    "WakeUp",
]


class KeyboardLayout {
    constructor(rows) {
        this.rows = rows
    }

    render(keyboard) {
        keyboard.innerHTML = ""

        for (let row of this.rows) {
            const rowElement = document.createElement("div")
            rowElement.className = "keyboard-row"
            rowElement.style.display = "flex"

            for (let key of row) {
                rowElement.appendChild(key.element)
            }

            keyboard.appendChild(rowElement)
        }
    }
}

class Key {
    constructor(code) {
        this.code = code
        this.pressed = false

        this.element = document.createElement("span")
        this.element.innerText = code
        this.element.style.backgroundColor = "WhiteSmoke"
        this.element.style.flexGrow = code === "Space" ? 16 : 1

    }

    press(e) {
        this.element.innerText = e.key
        this.element.style.backgroundColor = "Lime"
    }

    release(e) {
        this.element.innerText = e.code
        this.element.style.backgroundColor = "LimeGreen"
    }
}


class KeyListener {
    constructor() { }

    init() {
        this.kbd = document.getElementById("keyboard")
        this.log = document.getElementById("keyboard-log")

        // Set up key state tracking
        this.keys = new Map()
        KEY_CODES.map(k => this.keys.set(k, new Key(k)))

        // Trick browser to "disable" back button
        history.pushState(null, document.title, location.href)
        window.addEventListener("popstate", () => history.pushState(null, document.title, location.href))

        // Listen for all keystrokes globally for page
        document.addEventListener("keydown", e => this.press(e))
        document.addEventListener("keyup", e => this.release(e))

        // Set up our default layout
        this.setLayout("TKL-NB_NO")
    }

    press(e) {
        this.keys.get(e.code).press(e)
        this.log.innerText = `Last keystroke: "${e.key}" (${e.code}) [ctrl=${e.ctrlKey} shift=${e.shiftKey} alt=${e.altKey}]`

        console.debug('Pressed', e.code)

        // Disable some all default behaviour
        e.preventDefault()
    }

    release(e) {
        this.keys.get(e.code).release(e)
        console.debug('Released', e.code)
    }

    setLayout(name) {
        const rows = [
            ["Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PrintScreen", "ScrollLock", "Pause"],
            ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Insert", "Home", "PageUp"],
            ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyP", "BracketLeft", "BracketRight", "Enter", "Delete", "End", "PageDown"],
            ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Backslash"],
            ["ShiftLeft", "IntlBackslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight", "ArrowUp"],
            ["ControlLeft", "OSLeft", "AltLeft", "Space", "AltRight", "Fn", "ContextMenu", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]
        ]

        console.debug('Setting layout', name, "with", rows.length, "rows and", rows.map(r => r.length).reduce((a, b) => a.length + b.length), "keys")

        const layout = new KeyboardLayout(rows.map(r => r.map(k => {
            if (!this.keys.has(k)) {
                console.error("Found unrecognized key", k)
                return this.keys.get("")
            }
            else {
                return this.keys.get(k)
            }
        })))
        layout.render(this.kbd)
    }
}

const kl = new KeyListener()
document.addEventListener("DOMContentLoaded", () => kl.init())
