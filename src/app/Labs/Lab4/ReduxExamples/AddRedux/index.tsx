"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FormControl, Button } from "react-bootstrap";
import { add } from "./addReducer";
import { RootState } from "../../store";
export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const addState = useSelector((state: RootState) => state.addReducer);
  const sum = addState?.sum ?? 0;
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Initialize with default values
    dispatch(add({ a: 12, b: 23 }));
  }, [dispatch]);

  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <FormControl type="number" value={a}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 0;
          setA(value);
        }} />
      <FormControl type="number" value={b}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 0;
          setB(value);
        }} />
      <Button id="wd-add-redux-click"
              onClick={() => {
                const numA = typeof a === 'number' ? a : parseInt(String(a)) || 0;
                const numB = typeof b === 'number' ? b : parseInt(String(b)) || 0;
                dispatch(add({ a: numA, b: numB }));
              }}>
        Add Redux
      </Button>
      <hr/>
    </div>
  );
}

