import React from 'react';
import { Link } from 'react-router-dom';

// Components
import TextLink from './TextLink'
import SocialMediaIcon from './SocialMediaIcon'

type Props = {}

export default function FooterLarge({}: Props) {
  return (
    <footer
      className="w-100 row px-0 mx-0 mb-0 bg-black text-light">
      <div className="col-12 row px-4 px-lg-5 pt-5 pb-3 mx-auto transition-effect bg-main">
        <div className="w-100 d-flex align-items-center">
          <div className="col border-custom-left"></div>
          <div className="col border-custom-right"></div>
        </div>

        <div className="col-12 col-lg-6 row px-0 pt-4 pb-1 m-0 justify-content-center justify-content-lg-start">
          {/* Logo */}
          <div className="w-auto px-0 px-xl-4 pt-3 pb-0">
            <a
              href="/index"
              title="Home"
              className="btn p-0">
              <img
                src="/images/psphoto/logo/min/PSPHOTO_LOGO_białe-min.png"
                width="80"
                height="80"
                alt="Pspoto logo white"
                className="py-2 logo-img" />
            </a>
          </div>

          <div className="w-auto px-2 py-2">
            <h5 className="text-uppercase fw-bold letter-spacing">PSPHOTO</h5>
            <small className="d-block w-100 m-0 text-uppercase text-secondary">
              kontakt@psphoto.pl
            </small>
            <small className="d-block w-100 m-0 text-uppercase text-secondary">
              +48 791 110 448
            </small>
          </div>

          {/* <div className="w-100 px-0 px-xl-4 pt-4 pt-lg-0 text-center text-lg-left"></div> */}
        </div>

        {/* Social media */}
        <div className="col-12 col-lg-6 px-0 px-xl-4 pt-3 pt-4 pb-4 mx-auto">
          <div className="w-100 row pb-3 m-0 justify-content-center justify-content-lg-end">
            {/* Home */}
            <TextLink url="/index" text="Home" />

            {/* Let's meet */}
            <TextLink url="/lets-meet" text="Let's meet" />

            {/* Offers */}
            <TextLink url="/offers" text="Offers" />

            {/* Customer area */}
            <TextLink url="/login" text="Customer area" />

            {/* Contact */}
            <TextLink url="/contact" text="Contact" />
          </div>

          <div className="w-100 row px-0 px-xl-2 py-3 m-0 justify-content-center justify-content-lg-end">
            {/* Facebook */}
            <SocialMediaIcon
              url="link-facebook"
              style="text-facebook"
              icon="icon-facebook" />

            {/* Instagram */}
            <SocialMediaIcon
              url="link-instagram"
              style="text-instagram"
              icon="icon-instagram" />

            {/* YouTube */}
            <SocialMediaIcon
              url="link-youtube"
              style="text-youtube"
              icon="icon-youtube" />

            {/* Twitter */}
            <SocialMediaIcon
              url="link-twitter"
              style="text-twitter"
              icon="icon-twitter" />
          </div>
        </div>

        <div className="col-12 p-0 m-0 text-secondary">
          <small className="d-block w-100 px-5 text-center text-lg-left">
            psphoto.pl
            <i className="icon-copyright"></i>
            <b>2021</b>
            <span>All rights reserved</span>
          </small>
        </div>

        <div className="col-12 py-3 m-0 text-center">
          <small className="text-uppercase text-secondary">
            <span>Developed and designed by </span>
            <a
              href="https://github.com/KamilGanczarski"
              target="_blank"
              className="btn p-0 pb-1 border-0 text-light">
              <small>Ganczarski Kamil</small>
            </a>
          </small>
        </div>
      </div>
    </footer>
  )
}