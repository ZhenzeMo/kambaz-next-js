"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { RootState } from "../../../store";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

interface Lesson {
  _id: string;
  name: string;
  [key: string]: unknown;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
  [key: string]: unknown;
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          if (cid) {
            dispatch(addModule({ name: moduleName, course: cid as string }));
            setModuleName("");
          }
        }}
      />
      <br />
      <br />
      <br />
      <br />
          <ListGroup id="wd-modules" className="rounded-0">
            {modules
              .filter((module: Module) => module.course === (cid as string))
              .map((module: Module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <FaFolder className="me-2 text-primary" />
                {!module.editing && (
                  <span className="flex-grow-1">{module.name}</span>
                )}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1 bg-white d-flex align-items-center"
                      style={{
                        borderLeft: "5px solid #198754",
                        borderTop: "1px solid #dee2e6",
                        borderRight: "1px solid #dee2e6",
                        borderBottom: "1px solid #dee2e6",
                      }}
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      <FaFileAlt className="me-2 text-success" />
                      <span className="flex-grow-1">{lesson.name}</span>
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
  
  