'use client'
import { createContext, ReactNode, useState } from "react";

export interface IToaster {
    type: string;
    message: string;
}

export interface IToasterState {
    toaster: IToaster,
    setToaster: (toaster: { type: string; message: string}) => void;
}

const defaultData: IToaster= {
    type: '',
    message: ''
}

const ToasterContext = createContext<IToasterState>({
    toaster: defaultData,
    setToaster: () => {},
})

const ToasterProvider = ({ children }: {children: ReactNode}) => {
    const [toaster, setToaster] = useState<IToaster>(defaultData);

    return (
        <ToasterContext.Provider value={{toaster, setToaster}} >
            {children}
        </ToasterContext.Provider>
    )
}

export { ToasterContext,ToasterProvider }



// HOW TO USE

// wrap with <ToasterProvider> children <ToasterProvider>


// create innerChild =>

// const ProviderInner = ({children}: {children :ReactNode}) => {
//     const {toaster, setToaster} = useContext(ToasterContext);

//     useEffect(() => {
//         setToaster({
//             type: 'success',
//             message: "hello"
//         })
//     },[])

//     return (
//         <>
//             {toaster.type !== '' && (
//                 <Toaster type={toaster.type} message={toaster.message} />
//                 {children}
//             )}
//         </>
//     )
// }