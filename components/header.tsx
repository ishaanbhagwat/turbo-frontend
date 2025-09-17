'use client';
import { ThemeToggleButton } from "./theme-toggle-button";
import { useAuth } from "../app/context/authContext";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Folder, FileText, ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";

export function Header() {
    const handleSignOut = () => {
        signOut();
        console.log('Logged Out...')
      };

    const { user, signOut } = useAuth();

    return(
        <header className="w-full border-b">
            <div className="mx-auto flex flex-row justify-between items-center h-14">
                <div className="ml-2">
                    <Menu />
                </div>
                <div className="flex justify-ends items-center justify-end gap-3 mr-2">
                    <ThemeToggleButton />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="rounded-full outline-none ring-0">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60">
                            <DropdownMenuLabel className="flex flex-row justify-ends items-center gap-1">
                                <Avatar className="w-5 h-5">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <h1>{user?.name!}</h1>
                            </DropdownMenuLabel>
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                                <LogOut className="h-4 w-4" />
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

function FolderList({ creating, setCreating, inputValue, setInputValue }: {
  creating: null | 'folder' | 'file',
  setCreating: React.Dispatch<React.SetStateAction<null | 'folder' | 'file'>>,
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
}) {
  // Mock data
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({ root: true });
  const [data, setData] = useState([
    {
      id: "root",
      name: "Root Folder",
      type: "folder",
      children: [
        { id: "f1", name: "Project A", type: "folder", children: [
          { id: "file1", name: "Notes.txt", type: "file" },
          { id: "file2", name: "Todo.md", type: "file" },
        ] },
        { id: "f2", name: "Project B", type: "folder", children: [
          { id: "file3", name: "Readme.md", type: "file" },
        ] },
        { id: "file4", name: "Summary.docx", type: "file" },
      ],
    },
  ]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (creating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [creating]);

  function handleCreateClick(type: 'folder' | 'file') {
    setCreating(type);
    setInputValue("");
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputValue.trim()) {
      setData(prev => {
        const newItem = creating === 'folder'
          ? { id: `f${Date.now()}`, name: inputValue.trim(), type: 'folder', children: [] }
          : { id: `file${Date.now()}`, name: inputValue.trim(), type: 'file' };
        // Add to root folder
        return prev.map(node =>
          node.id === "root"
            ? { ...node, children: [newItem, ...node.children] }
            : node
        );
      });
      setCreating(null);
      setInputValue("");
    } else if (e.key === "Escape") {
      setCreating(null);
      setInputValue("");
    }
  }

  function handleInputBlur() {
    setCreating(null);
    setInputValue("");
  }

  function renderNode(node: any, depth = 0) {
    if (node.type === "folder") {
      const isOpen = openFolders[node.id] || false;
      return (
        <div key={node.id} className="mb-1">
          <div
            className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded hover:bg-accent"
            style={{ paddingLeft: 8 + depth * 16 }}
            onClick={() => setOpenFolders(f => ({ ...f, [node.id]: !isOpen }))}
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <Folder className="w-4 h-4 text-primary" />
            <span className="font-medium">{node.name}</span>
          </div>
          {isOpen && node.children && (
            <div>
              {node.children.map((child: any) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div key={node.id} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-accent" style={{ paddingLeft: 8 + depth * 16 }}>
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span>{node.name}</span>
        </div>
      );
    }
  }

  // Find root folder
  const root = data.find(d => d.id === "root");

  return (
    <div>
      {creating && (
        <div className="flex items-center gap-2 px-2 py-1 mb-1">
          {creating === 'folder' ? <Folder className="w-4 h-4 text-primary" /> : <FileText className="w-4 h-4 text-muted-foreground" />}
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-b border-muted outline-none px-1 text-sm"
            placeholder={creating === 'folder' ? 'New folder name' : 'New file name'}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
          />
        </div>
      )}
      {root && root.children.map((child: any) => renderNode(child))}
    </div>
  );
}