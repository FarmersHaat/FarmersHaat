import React, { useContext } from 'react'
import { Context } from '../../utils/context'

const Footer = () => {
  const { footerRef } = useContext(Context);
  return (
    <div ref={footerRef}>
      Footer
    </div>
  )
}

export default Footer
