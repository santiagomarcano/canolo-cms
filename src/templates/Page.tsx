import React from 'react'
import { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {}

const Page = ({ path }: Props) => {
    return <div>{path}</div>
}

export default Page;