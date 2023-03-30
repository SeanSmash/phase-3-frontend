import React, { createContext, useState } from "react"

// create the context object
const CurrentUserContext = createContext()

// create the context provider (component)
function CurrentUserProvider({ children }){
    // makes the user info available across all specified components
    const [ currentUser, setCurrentUser ] = useState([])

    const value = [currentUser, setCurrentUser]

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}

// export
export { CurrentUserContext, CurrentUserProvider}

// Wrap application
// ReactDOM.render(
//    <CurrentUserProvider>
//      <App />
//    </CurrentUserProvider>