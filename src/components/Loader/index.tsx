import React, { ReactElement } from 'react'

import './styles.css'

const Loader = ({ loading }: { loading: boolean }): ReactElement | null => {
  if (!loading) {
    return null
  }

  return (
    <div className='loader-container'>
      <div className='loader' />
    </div>
  )  
}

export { Loader }
