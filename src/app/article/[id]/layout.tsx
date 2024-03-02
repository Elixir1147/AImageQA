import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import "@/_components/editor/lexical-palyground/src/index.css";
import "@/_components/editor/lexical-palyground/src/nodes/ImageNode.css";
import "@/_components/editor/lexical-palyground/src/nodes/InlineImageNode.css";
import "@/_components/editor/lexical-palyground/src/nodes/PageBreakNode/index.css";
import "@/_components/editor/lexical-palyground/src/nodes/PollNode.css";
import "@/_components/editor/lexical-palyground/src/nodes/StickyNode.css";
import "@/_components/editor/lexical-palyground/src/plugins/CodeActionMenuPlugin/components/PrettierButton/index.css";
import "@/_components/editor/lexical-palyground/src/plugins/CodeActionMenuPlugin/index.css";
import "@/_components/editor/lexical-palyground/src/plugins/CollapsiblePlugin/Collapsible.css";
import "@/_components/editor/lexical-palyground/src/plugins/CommentPlugin/index.css";
import "@/_components/editor/lexical-palyground/src/plugins/DraggableBlockPlugin/index.css";
import "@/_components/editor/lexical-palyground/src/plugins/FloatingLinkEditorPlugin/index.css";
import "@/_components/editor/lexical-palyground/src/plugins/FloatingTextFormatToolbarPlugin/index.css";
import "@/_components/editor/lexical-palyground/src/plugins/TableCellResizer/index.css";
import "@/_components/editor/lexical-palyground/src/plugins/ToolbarPlugin/fontSize.css";
import "@/_components/editor/lexical-palyground/src/themes/CommentEditorTheme.css";
import "@/_components/editor/lexical-palyground/src/themes/PlaygroundEditorTheme.css";
import "@/_components/editor/lexical-palyground/src/themes/StickyEditorTheme.css";
import "@/_components/editor/lexical-palyground/src/ui/Button.css";
import "@/_components/editor/lexical-palyground/src/ui/ColorPicker.css";
import "@/_components/editor/lexical-palyground/src/ui/ContentEditable.css";
import "@/_components/editor/lexical-palyground/src/ui/Dialog.css";
import "@/_components/editor/lexical-palyground/src/ui/EquationEditor.css";
import "@/_components/editor/lexical-palyground/src/ui/Input.css";
import "@/_components/editor/lexical-palyground/src/ui/KatexEquationAlterer.css";
import "@/_components/editor/lexical-palyground/src/ui/Modal.css";
import "@/_components/editor/lexical-palyground/src/ui/Placeholder.css";
import "@/_components/editor/lexical-palyground/src/ui/Select.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "question",
};

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
