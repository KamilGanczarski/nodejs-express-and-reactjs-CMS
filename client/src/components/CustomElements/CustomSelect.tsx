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
          className="px-4 py-1 bg-transparent text-theme btn-rounded border-light btn-shine btn-shine-hover"
          id="dropdown-basic">
          <span className="small">{selectedText}</span>
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
