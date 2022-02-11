import React from 'react';

type Props = {
  link: string;
  icon: string;
  label: string;
};

export default function BlockHyperlink({ link, icon, label }: Props) {
  return (
    <div className="col-6 col-lg-4 col-xl-3 col-3xl-2 row p-1 m-0">
      {/* Left line */}
      <div className="w-auto ps-0 pe-1 bg-custom-dark rounded-start"></div>
      {/* Content */}
      <a
        href={link}
        className="btn col h-100 border-0 rounded-custom-right btn-gray-2 img-16-9-container btn-shine btn-shine-animation">
        <div className="text-middle-absolute">
          {/* Large icon */}
          <h1 className="text-huge-2 ps-2 pe-3 m-0 text-white text-uppercase text-middle">
            <i className={`${icon} icon-zoom`}></i>
          </h1>
          {/* Text */}
          <div className="text-middle-absolute bg-shadow">
            <div className="text-middle">
              <h6 className="px-3 m-0 text-center fw-bold text-white">
                <span>{label}</span>
              </h6>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
