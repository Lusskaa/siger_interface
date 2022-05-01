import React from 'react'
import { ContainerButton } from './styles'

import PropTypes from 'prop-types'

function Button({ children, ...props }) {
  return <ContainerButton {...props}>{children}</ContainerButton>
}

export default Button

Button.propTypes = {
  children: PropTypes.string,
}
