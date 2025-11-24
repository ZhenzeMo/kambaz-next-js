"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { RootState } from "../../../store";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import * as coursesClient from "../../client";

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
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, module]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await coursesClient.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    await coursesClient.updateModule(module);
    const newModules = modules.map((m: any) => m._id === module._id ? module : m);
    dispatch(setModules(newModules));
  };

  return (
    <div className="wd-modules">
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}
      <br />
      <br />
      <br />
      <br />
          <ListGroup id="wd-modules" className="rounded-0">
            {modules.map((module: Module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <FaFolder className="me-2 text-primary" />
                {isFaculty && module.editing ? (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                ) : (
                  <span className="flex-grow-1">{module.name}</span>
                )}
                {isFaculty && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                )}
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
  
  