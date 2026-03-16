import { Fragment } from 'react'
import { DataProvider } from './data/dataProvider.js'
import { RouterProvider } from './router/routerProvider.js'
import { ToasterProvider } from './toasts/toastProvider.js'


export function RootProvider() {
    return (
        <Fragment>
            <DataProvider>
                <RouterProvider />
                <ToasterProvider />
            </DataProvider>
        </Fragment>
    )
}