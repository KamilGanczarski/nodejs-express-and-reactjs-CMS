import React from 'react';

// Utils
import { BlockLinkModel } from '../../../interfaces/interfaces';

// Components
import Block from './Block';
import BlockHyperlink from './BlockHyperlink';
import OnclickButton from './OnclickButton';

type Props = {
  links: BlockLinkModel[];
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
        } else if (btn.type === 'onclick') {
          return <OnclickButton
            key={btn.id}
            onclick={btn.onclick}
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
