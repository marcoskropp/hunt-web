import React, { ReactElement } from 'react'

import './styles.css'

const Header = (): ReactElement => {
  const onClick = (): void => {
    window.location.href = '/'
  }

  return (
    <header id="main-header" onClick={onClick}>JSHunt</header>
  )
}

export { Header }
