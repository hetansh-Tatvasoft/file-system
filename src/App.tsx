import React, { useState } from "react";
import "./App.css";
import "./styles/FormStyles.css";

interface Item {
  type: "file" | "folder";
  name: string;
  id: number;
  isSelected: boolean;
  subFolder?: [
    {
      name: string;
      id: number;
    }
  ];
  files?: [
    {
      name: string;
      content: string;
    }
  ];
}

interface File extends Item {
  type: "file";
  content: string;
}

interface Folder extends Item {
  type: "folder";
  items: Item[];
}

function App() {
  const [folderlist, setFolderList] = useState<Item[]>([]);
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [selectedFolderID, setSelectedFolderID] = useState<number>();
  const [isFolderSelected, setIsFolderSelected] = useState(false);

  const handleSelection = (id?: number, isSelected?: boolean) => {
    setIsFolderSelected(isSelected ?? false);
    setFolderList((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? Object.assign({}, item, { isSelected: isSelected })
          : item
      )
    );
  };

  const createSubFolder = (id: number, name: string, isSelected: boolean) => {
    setFolderList((prevState) =>
      prevState.map((item) =>
        item.isSelected === isSelected
          ? Object.assign({}, item, {
              subFolder: [
                ...(item?.subFolder ?? []),
                { name: folderName, id: folderlist.length + 1 },
              ],
            })
          : item
      )
    );
  };

  const SubFolderItem = (name: string) => {
    return (
      <div
        className="itemWrapper"
        // onClick={() => handleSelection(id, !isSelected)}
        style={{ backgroundColor: "#f2f2f2" }}>
        <hr style={{ color: "#000", height: 1, width: "100%" }} />
        <text className="itemText" style={{ marginLeft: 15 }}>
          (folder) {name}
        </text>
        <hr style={{ color: "#000", height: 1, width: "100%" }} />
      </div>
    );
  };

  const FileItem: React.FC<File> = ({
    type,
    name,
    id,
    isSelected,
    content,
  }) => {
    return (
      <div
        className="itemWrapper"
        onClick={() => handleSelection(id, !isSelected)}
        style={{ backgroundColor: "#f2f2f2" }}>
        <hr style={{ color: "#000", height: 1, width: "100%" }} />
        <text className="itemText" style={{ marginLeft: 15 }}>
          ({type}) {name} : {content}
        </text>
        <hr style={{ color: "#000", height: 1, width: "100%" }} />
      </div>
    );
  };
  const FolderItem: React.FC<Item> = ({
    type,
    name,
    id,
    isSelected,
    files,
    subFolder,
  }) => {
    return (
      <>
        <div
          className="itemWrapper"
          onClick={() => handleSelection(id, !isSelected)}
          style={{ backgroundColor: isSelected ? "#42adf5" : "#f2f2f2" }}>
          <hr style={{ color: "#000", height: 1, width: "100%" }} />
          <text
            className="itemText"
            style={{ marginLeft: type === "file" ? 15 : 0 }}>
            ({type}) {name}
          </text>
          <hr style={{ color: "#000", height: 1, width: "100%" }} />
        </div>
        {subFolder?.map((item) => SubFolderItem(item.name))}
        {files?.map((item) => (
          <FileItem
            type="file"
            id={id}
            name={item.name}
            isSelected={isSelected}
            content={item.content}
          />
        ))}
      </>
    );
  };

  const creatFolder = (id: number, name: string, type: "file" | "folder") => {
    setFolderList([
      ...folderlist,
      {
        id: id,
        name: name,
        type: type,
        isSelected: false,
      },
    ]);
  };
  const createFile = (id?: number) => {
    setFolderList((prevState) =>
      prevState.map((item) =>
        item.isSelected
          ? Object.assign({}, item, {
              files: [
                ...(item?.files ?? []),
                { name: fileName, content: fileContent },
              ],
            })
          : item
      )
    );
  };

  const handleSubmit = (
    itemName: string,
    type: "file" | "folder",
    id: number
  ) => {
    if (itemName && id) {
      creatFolder(id, itemName, type);
    }
  };

  return (
    <div className="app">
      <div className="inputFolderWrapper">
        <label className="labelFolder">New Folder Name:</label>
        <input
          className="inputFolder"
          size={18}
          type="text"
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button
          className="addButton"
          onClick={() => {
            if (isFolderSelected) {
              createSubFolder(folderlist.length + 1, folderName, true);
            } else {
              handleSubmit(folderName, "folder", folderlist.length + 1);
            }
          }}>
          Add Folder
        </button>
      </div>
      <div className="inputFolderWrapper">
        <div className="inputFileWrapper">
          <label className="labelFolder">New File Name:</label>
          <input
            className="inputFolder"
            size={18}
            type="text"
            onChange={(e) => {
              setFileName(e.target.value);
            }}
          />
        </div>
        <div className="inputContentWrapper">
          <label className="labelFolder">Content:</label>
          <input
            className="inputFolder"
            size={18}
            type="text"
            onChange={(e) => {
              setFileContent(e.target.value);
            }}
          />
          <button className="addButton" onClick={() => createFile()}>
            Add Content
          </button>
        </div>
      </div>
      <button
        className="addButton"
        onClick={() => handleSelection(selectedFolderID, false)}>
        Clear selection
      </button>

      <hr style={{ color: "#000", height: 1, width: "100%" }} />
      {folderlist.map((item) => (
        <FolderItem
          id={item.id}
          name={item.name}
          type={item.type}
          isSelected={item.isSelected}
          files={item.files}
          subFolder={item.subFolder}
        />
      ))}
    </div>
  );
}

export default App;
