import React from 'react'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className="w-100 px-0 position-relative">
      {/* www.weselezklasa.pl banner */}
      <div className="w-100 row px-2 px-lg-4 pt-5 mx-0 text-center">
        <h3 className="text-secondary mb-4">Program Partnerski</h3>
        <a
          href="https://www.weselezklasa.pl/ogloszenia-weselne/patryk-szewczyk-fotovideo,43865/"
          target="_blank"
          title="PSPHOTO PATRYK SZEWCZYK">
          <img
            src="https://www.weselezklasa.pl/banery/Weselezklasa/logo104x128przezroczystetloszarewypelnienie.png"
            alt="PSPHOTO PATRYK SZEWCZYK" />
        </a>
      </div>

      <div className="text-center px-4 px-lg-5 pt-5 transition-effect">
        <div className="w-100 d-flex align-items-center">
          <div className="col border-custom-left"></div>
          <div className="col border-custom-right"></div>
        </div>

        <p className="pt-4 pb-3 m-0">
          <b>2021</b>@Patryk Szewczyk
          {/* youngfreshcinema.pl <i className="icon-copyright"></i>
          <b>2021</b> All rights reserved */}
        </p>
        <small className="d-block pb-4 text-uppercase">
          <small className="text-secondary">Developed and designed by </small>
          <a href="https://github.com/KamilGanczarski" target="_blank"
            className="btn p-0 border-0">
            <small>Ganczarski Kamil</small>
          </a>
        </small>
      </div>
    </footer>
  )
}