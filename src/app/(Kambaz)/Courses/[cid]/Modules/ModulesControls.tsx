"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus, FaEye, FaEyeSlash, FaExpand, FaCompress } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { useSidebar } from "../SidebarProvider";

export default function ModulesControls() {
  const { sidebarVisible, setSidebarVisible } = useSidebar();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <FaEyeSlash className="me-2" /> Unpublish all modules and items
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button 
        variant="secondary" 
        size="lg" 
        className="me-2 float-end" 
        id="wd-width-control"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? <FaCompress className="me-2" /> : <FaExpand className="me-2" />}
        {sidebarVisible ? "Narrowest" : "Widest"}
      </Button>
      <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-view-progress">
        <FaEye className="me-2" /> View Progress
      </Button>
      <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-collapse-all">
        Collapse All
      </Button>
    </div>
  );
}

