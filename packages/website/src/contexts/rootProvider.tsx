import { Fragment } from 'react'
import { Toaster } from 'sonner'
import { DataProvider } from './data/dataProvider.js'
import { RouterProvider } from './router/routerProvider.js'


export function RootProvider() {
    return (
        <Fragment>
            <DataProvider>
                <RouterProvider />
                <Toaster
                    position="bottom-right"
                    expand={true}
                />
            </DataProvider>
        </Fragment>
    )
}