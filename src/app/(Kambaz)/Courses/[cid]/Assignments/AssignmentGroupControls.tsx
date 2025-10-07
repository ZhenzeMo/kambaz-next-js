import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentGroupControls() {
  return (
    <div className="float-end">
      <span className="border border-dark rounded-circle p-1 me-2">
        <BsPlus className="fs-4" />
      </span>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

