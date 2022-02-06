import React from 'react';

import Block from './Block';
import BlockHyperlink from './BlockHyperlink';

type Props = {
  links: {
    id: number;
    icon: string;
    label: string;
    link: string;
    type: 'button' | 'dropdown' | 'hyperlink';
  }[]
};

export default function BlockLinks({ links }: Props) {
  return (
    <section className="w-100 row px-0 px-md-3 pb-3 mx-0">
      {links.map((btn) => {
        if (btn.type === 'hyperlink') {
          return <BlockHyperlink
            key={btn.id}
            link={btn.link}
            icon={btn.icon}
            label={btn.label} />
        }
        return <Block
          key={btn.id}
          link={btn.link}
          icon={btn.icon}
          label={btn.label} />
      })}
    </section>
  );
}
