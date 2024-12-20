import { TextFileView, TFile, WorkspaceLeaf } from "obsidian";
import * as monaco from 'monaco-editor';
import { genEditorSettings } from "../../utils/utils";
import UNITADE_PLUGIN from "../../main";

/**
 * The `UNITADE_VIEW_CODE` class provides a code editor view powered by the Monaco Editor.
 * It is designed for the UNITADE plugin and is responsible for handling file loading, saving,
 * and providing an enhanced code editing experience within Obsidian.
 */
export class UNITADE_VIEW_CODE extends TextFileView {

    value = "";
    monacoEditor!: monaco.editor.IStandaloneCodeEditor;

    constructor(leaf: WorkspaceLeaf, private plugin: UNITADE_PLUGIN) {
        super(leaf);
    }

    /**
     * Executes when the view is opened. Initializes necessary components.
     */
    async onOpen() {
        await super.onOpen();
    }

    async onLoadFile(file: TFile) {
        const setting = genEditorSettings(this.plugin.settings, this.file?.extension ?? "");

        this.monacoEditor = monaco.editor.create(this.contentEl, setting);
        this.monacoEditor.onDidChangeModelContent(() => {
            this.requestSave();
        });

        this.addCtrlKeyWheelEvents();
        this.addKeyEvents();

        await super.onLoadFile(file);
    }

    async onUnloadFile(file: TFile) {
        window.removeEventListener('keydown', this.__keyHandler, true);

        await super.onUnloadFile(file);
        
        this.monacoEditor.dispose();
    }

    async onClose() {
        await super.onClose();
    }

    onResize() {
        this.monacoEditor.layout();
    }

    /**
     * Retrieves the view type for this instance.
     * 
     * @returns The view type as a string.
     */
    getViewType(): string {
        return 'codeview';
    }

    getContext(file?: TFile) {
        return file?.path ?? this.file?.path;
    }

    getViewData = (): string => {
        return this.monacoEditor.getValue();
    }

    setViewData = (data: string, clear: boolean) => {
        if (clear) {
            this.monacoEditor.getModel()?.setValue(data);
        } else {
            this.monacoEditor.setValue(data);
        }
    }

    clear = () => {
        this.monacoEditor.setValue('');
    }

    private addKeyEvents = () => {
        window.addEventListener('keydown', this.__keyHandler, true);
    }

    private addCtrlKeyWheelEvents = () => {
        this.containerEl.addEventListener('wheel', this.__mousewheelHandler, true);
    }

    private __keyHandler = async (event: KeyboardEvent) => {
        const KEYMAP = new Map<string, string>([
            ['f', 'actions.find'],
            ['h', 'editor.action.startFindReplaceAction'],
            ['/', 'editor.action.commentLine'],
            ['Enter', 'editor.action.insertLineAfter'],
            ['[', 'editor.action.outdentLines'],
            [']', 'editor.action.indentLines'],
            ['d', 'editor.action.copyLinesDownAction'],
        ]);
        
        if (event.ctrlKey) {
            const trigger_name = KEYMAP.get(event.key);
            
            if (trigger_name)
                this.monacoEditor.trigger('', trigger_name, null);
        }

        if (event.altKey) {
            if (event.key === 'z') {
                const next = {
                    ...this.plugin.settings,
                    code_editor_settings: {
                        ...this.plugin.settings.code_editor_settings,
                        word_wrapping: !this.plugin.settings.code_editor_settings.word_wrapping,
                    },
                };

                await this.plugin.uptSettings(next);

                this.monacoEditor.updateOptions({
                    wordWrap: this.plugin.settings.code_editor_settings.word_wrapping ? "on" : "off",
                });
            }
        }
    }

    private __mousewheelHandler = async (event: WheelEvent) => {
        if (event.ctrlKey) {
            const delta = event.deltaY > 0 ? 1 : -1;

            const next = {
                ...this.plugin.settings,
                code_editor_settings: {
                    ...this.plugin.settings.code_editor_settings,
                    font_size: this.plugin.settings.code_editor_settings.font_size += delta,
                },
            }

            await this.plugin.uptSettings(next);
            
            this.monacoEditor!.updateOptions({
                fontSize: this.plugin.settings.code_editor_settings.font_size,
            });

            event.stopPropagation();
        }
    }
}
