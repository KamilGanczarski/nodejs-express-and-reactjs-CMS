import React from 'react';

type Props = {
  index: number;
  componentType: string;
  componentsLength: number;
}

export default function ComponentPosition({
  index,
  componentType,
  componentsLength
}: Props) {
  const swapLayouts = (id: number, nextId: number) => {

  }

  return (
    <div className="col-sm-12 col-md-10 col-lg-8 row pt-2 mx-auto">
      <button
        className="btn col d-flex align-self-center text-start text-theme-1">
        {componentType}
      </button>
      <div className="text-end" style={{ width: 60 + 'px' }}>
        {componentsLength > 1 && index == 0 &&
          <button
            onClick={()=>swapLayouts(index, (index + 1))}
            className="btn px-3 fw-bold text-hover-theme">
            <i className="icon-down-open"></i>
          </button>
        }

        {index > 0 && index < componentsLength - 1 &&
          <button
            onClick={()=>swapLayouts(index, (index - 1))}
            className="btn px-3 py-0 fw-bold text-hover-theme">
            <i className="icon-up-open"></i>
          </button>
        }

        {index > 0 && index < componentsLength - 1 &&
          <button
            onClick={()=>swapLayouts(index, (index + 1))}
            className="btn px-3 py-0 fw-bold text-hover-theme">
            <i className="icon-down-open"></i>
          </button>
        }
        
        {componentsLength > 1 && index == componentsLength - 1 &&
          <button
            onClick={()=>swapLayouts(index, (index - 1))}
            className="btn px-3 fw-bold text-hover-theme">
            <i className="icon-up-open"></i>
          </button>
        }
      </div>
      <div className={`w-100 pb-2 border-theme ' ${index < componentsLength - 1 && 'border-bottom'}`}></div>
    </div>
  )
}