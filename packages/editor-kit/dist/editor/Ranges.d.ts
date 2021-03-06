import { Range } from "slate";
import { ReactEditor } from "slate-react";
export declare type EditorRange = "character-before" | "character-after" | "word-before" | "word-after" | "line" | "line-before" | "line-after" | "block" | "block-before" | "block-after";
export declare type Unit = "character" | "word" | "line" | "block" | "offset";
export declare const characterBefore: (editor: ReactEditor) => Range | null;
export declare const characterAfter: (editor: ReactEditor) => Range | null;
export declare const wordBefore: (editor: ReactEditor) => Range | null;
export declare const wordAfter: (editor: ReactEditor) => Range | null;
export declare const lineBefore: (editor: ReactEditor) => Range | null;
export declare const lineAfter: (editor: ReactEditor) => Range | null;
export declare const block: (editor: ReactEditor) => Range | null;
export declare const blockBefore: (editor: ReactEditor) => Range | null;
export declare const blockAfter: (editor: ReactEditor) => Range | null;
export declare const all: (editor: ReactEditor, unit: Unit) => Range | null;
export declare const currentBlock: (editor: ReactEditor) => Range | null;
export declare const before: (editor: ReactEditor, unit: Unit) => Range | null;
export declare const after: (editor: ReactEditor, unit: Unit) => Range | null;
