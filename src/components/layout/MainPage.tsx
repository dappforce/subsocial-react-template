import React from 'react'

const Page: React.FunctionComponent = ({ children }) => <>
    {children}
</>

const NextLayout: React.FunctionComponent = (props) => {
    return <Page {...props} />
}

export default NextLayout
