import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

export default function Error({}: Props) {
  return (
    <section className="container py-5 mx-auto text-center">
      <h1 className="w-100 pt-5">Oops! it's a dead end</h1>
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
    </section>
  );
}
