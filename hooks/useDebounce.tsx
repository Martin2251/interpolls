import { useEffect,useState
 } from "react";

 const useDebounce  =(value:any, delay:number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() =>{
            setDebouncedValue(value)
        })
        return () => {
            clearTimeout(handler)
        }

    }, [value,delay])

    return debouncedValue
 }