import React from 'react'
import Loadable from 'react-loadable'

const initOptions = {
    loading({ error, timedOut, pastDelay, retry }) {
        if (error) {
            return <div>Error! <button onClick={ retry }>Retry</button></div>
        } else if (timedOut) {
            return <div>Taking a long time... <button onClick={ retry }>Retry</button></div>
        } else if (pastDelay) {
            return <div>Loading...</div>
        } else {
            return null
        }
    }
}

// Thanks to umi
function dynamicLoad(dynamicOptions, options, defaultOptions) {
    let loadableFn = Loadable
    let loadableOptions = defaultOptions

    if (typeof dynamicOptions.then === 'function') {
        // Support for direct import(),
        // eg: dynamic(import('../hello-world'))
        loadableOptions.loader = () => dynamicOptions
    } else if (typeof dynamicOptions === 'object') {
        // Support for having first argument being options,
        // eg: dynamic({loader: import('../hello-world')})
        loadableOptions = { ...loadableOptions, ...dynamicOptions }
    }

    // Support for passing options,
    // eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})
    loadableOptions = { ...loadableOptions, ...options }

    // Support for `render` when using a mapping,
    // eg: `dynamic({ modules: () => {return {HelloWorld: import('../hello-world')}, render(props, loaded) {} } })
    if (dynamicOptions.render) {
        loadableOptions.render = (loaded, props) =>
        dynamicOptions.render(props, loaded)
    }

    // Support for `modules` when using a mapping,
    // eg: `dynamic({ modules: () => {return {HelloWorld: import('../hello-world')}, render(props, loaded) {} } })
    if (dynamicOptions.modules) {
        loadableFn = Loadable.Map
        const loadModules = {}
        const modules = dynamicOptions.modules()
        Object.keys(modules).forEach(key => {
            const value = modules[key]
            if (typeof value.then === 'function') {
                loadModules[key] = () => value.then(mod => mod.default || mod)
                return
            }
            loadModules[key] = value
        })
        loadableOptions.loader = loadModules
    }

    return loadableFn(loadableOptions)
}

// 动态加载器
export function dynamic(dynamicOptions, options) {
    return dynamicLoad(dynamicOptions, options, { ...initOptions })
}

// 初始化动态加载器
export function genDynamic(rawOptions) {
    let loadableOptions = { ...initOptions, ...rawOptions }

    return (dynamicOptions, options) => dynamicLoad(dynamicOptions, options, loadableOptions)
}
