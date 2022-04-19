import React from "react"
import {Title} from './styles'

function TitlePage ({children, ...props}) {
    return  (<Title {...props}>{children}</Title>)
}

export default TitlePage
