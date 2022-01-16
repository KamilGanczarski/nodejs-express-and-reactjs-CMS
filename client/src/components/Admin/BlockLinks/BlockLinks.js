import React from 'react'

import Block from './Block'
import BlockHyperlink from './BlockHyperlink'

export default function BlockLinks({ links }) {
  return (
    <section className="w-100 row px-0 px-md-3 pb-3 mx-0">
      {links.map((btn) => {
        if (btn.type === 'hyperlink') {
          return <BlockHyperlink key={btn.id} btn={btn} />
        }
        return <Block key={btn.id} btn={btn} />
      })}
    </section>
  )
}
