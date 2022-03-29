import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

type Props = {
  textArr: string[];
  selectedText: string;
  setSelectedText: (value: string) => void; 
}

export default function CustomSelect({
  textArr,
  selectedText,
  setSelectedText
}: Props) {
  return (
    <>
      <Dropdown className="w-auto">
        <Dropdown.Toggle
          className="py-2 bg-transparent text-hover-theme border-0"
          id="dropdown-basic">
          {selectedText}
        </Dropdown.Toggle>

        <Dropdown.Menu className="py-0 border shadow bg-theme border-theme">
          {textArr.map((text, index) => {
            return (
              <Dropdown.Item
                key={index}
                className="btn btn-sm w-100 px-4 py-2 bg-theme text-hover-theme"
                active={text === selectedText}
                onClick={()=>setSelectedText(text)}>
                {text}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
