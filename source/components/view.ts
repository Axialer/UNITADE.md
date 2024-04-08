import {
    TextFileView,
    WorkspaceLeaf
} from "obsidian";

import CodeMirror from '../../lib/codemirror';

/*
    import '../../mode/meta';
    import '../../mode/apl/apl';
    import '../../mode/asciiarmor/asciiarmor';
    import '../../mode/asn.1/asn.1';
    import '../../mode/asterisk/asterisk'
    import '../../mode/brainfuck/brainfuck'
    import '../../mode/clike/clike'
    import '../../mode/clojure/clojure'
    import '../../mode/cmake/cmake'
    import '../../mode/cobol/cobol'
    import '../../mode/coffeescript/coffeescript'
    import '../../mode/commonlisp/commonlisp'
    import '../../mode/crystal/crystal'
    import '../../mode/css/css'
    import '../../mode/cypher/cypher'
    import '../../mode/d/d'
    import '../../mode/dart/dart'
    import '../../mode/diff/diff'
    import '../../mode/django/django'
    import '../../mode/dockerfile/dockerfile'
    import '../../mode/dtd/dtd'
    import '../../mode/dylan/dylan'
    import '../../mode/ebnf/ebnf'
    import '../../mode/ecl/ecl'
    import '../../mode/eiffel/eiffel'
    import '../../mode/elixir/elixir'
    import '../../mode/elm/elm'
    import '../../mode/erlang/erlang'
    import '../../mode/factor/factor'
    import '../../mode/fcl/fcl'
    import '../../mode/forth/forth'
    import '../../mode/fortran/fortran'
    import '../../mode/gas/gas'
    import '../../mode/gherkin/gherkin'
    import '../../mode/go/go'
    import '../../mode/groovy/groovy'
    import '../../mode/haml/haml'
    import '../../mode/handlebars/handlebars'
    import '../../mode/haskell/haskell'
    import '../../mode/haskell-literate/haskell-literate'
    import '../../mode/haxe/haxe'
    import '../../mode/htmlembedded/htmlembedded'
    import '../../mode/htmlmixed/htmlmixed'
    import '../../mode/http/http'
    import '../../mode/idl/idl'
    import '../../mode/javascript/javascript'
    import '../../mode/jinja2/jinja2'
    import '../../mode/jsx/jsx'
    import '../../mode/julia/julia'
    import '../../mode/livescript/livescript'
    import '../../mode/lua/lua'
    import '../../mode/mathematica/mathematica'
    import '../../mode/mbox/mbox'
    import '../../mode/mirc/mirc'
    import '../../mode/mllike/mllike'
    import '../../mode/modelica/modelica'
    import '../../mode/mscgen/mscgen'
    import '../../mode/mumps/mumps'
    import '../../mode/nginx/nginx'
    import '../../mode/nsis/nsis'
    import '../../mode/ntriples/ntriples'
    import '../../mode/octave/octave'
    import '../../mode/oz/oz'
    import '../../mode/pascal/pascal'
    import '../../mode/pegjs/pegjs'
    import '../../mode/perl/perl'
    import '../../mode/php/php'
    import '../../mode/pig/pig'
    import '../../mode/powershell/powershell'
    import '../../mode/properties/properties'
    import '../../mode/protobuf/protobuf'
    import '../../mode/pug/pug'
    import '../../mode/puppet/puppet'
    import '../../mode/python/python'
    import '../../mode/q/q'
    import '../../mode/r/r'
    import '../../mode/rpm/rpm'
    import '../../mode/rst/rst'
    import '../../mode/ruby/ruby'
    import '../../mode/rust/rust'
    import '../../mode/sas/sas'
    import '../../mode/sass/sass'
    import '../../mode/scheme/scheme'
    import '../../mode/shell/shell'
    import '../../mode/sieve/sieve'
    import '../../mode/slim/slim'
    import '../../mode/smalltalk/smalltalk'
    import '../../mode/smarty/smarty'
    import '../../mode/solr/solr'
    import '../../mode/soy/soy'
    import '../../mode/sparql/sparql'
    import '../../mode/spreadsheet/spreadsheet'
    import '../../mode/sql/sql'
    import '../../mode/stex/stex'
    import '../../mode/stylus/stylus'
    import '../../mode/swift/swift'
    import '../../mode/tcl/tcl'
    import '../../mode/textile/textile'
    import '../../mode/tiddlywiki/tiddlywiki'
    import '../../mode/tiki/tiki'
    import '../../mode/toml/toml'
    import '../../mode/tornado/tornado'
    import '../../mode/troff/troff'
    import '../../mode/ttcn/ttcn'
    import '../../mode/ttcn-cfg/ttcn-cfg'
    import '../../mode/turtle/turtle'
    import '../../mode/twig/twig'
    import '../../mode/vb/vb'
    import '../../mode/vbscript/vbscript'
    import '../../mode/velocity/velocity'
    import '../../mode/verilog/verilog'
    import '../../mode/vhdl/vhdl'
    import '../../mode/vue/vue'
    import '../../mode/wast/wast'
    import '../../mode/webidl/webidl'
    import '../../mode/xml/xml'
    import '../../mode/xquery/xquery'
    import '../../mode/yacas/yacas'
    import '../../mode/yaml/yaml'
    import '../../mode/yaml-frontmatter/yaml-frontmatter'
    import '../../mode/z80/z80'
*/

export default class UNITADE_VIEW extends TextFileView {
    private _codemirror: CodeMirror.Editor;

    private _extension: string = '';

    constructor(leaf: WorkspaceLeaf, extension: string) {
        super(leaf);

        this._extension = extension;


        this._codemirror = CodeMirror(this.contentEl, {
            theme: 'obsidian',
        });

        this._codemirror.on('changes', this.onChange);
    }

    onResize(): void {
        this._codemirror.refresh();
    }

    onChange = async (instance: CodeMirror.Editor, changes: CodeMirror.EditorChange[]) => {
        this.requestSave();
    }

    getViewData(): string {
        return this._codemirror.getValue();
    }

    setViewData(data: string, clear: boolean): void {
        if (clear)
            this._codemirror.swapDoc(CodeMirror.Doc(data, `text/x-${this._extension}`));
        else
            this._codemirror.setValue(data);
    }

    clear(): void {
        this._codemirror.setValue('');
        this._codemirror.clearHistory();
    }

    getDisplayText(): string {
        if (this.file)
            return this.file.basename;
        else
            return 'no file';
    }

    canAcceptExtension(extension: string): boolean {
        return extension === this._extension;
    }

    getViewType(): string {
        return this._extension;
    }
}
