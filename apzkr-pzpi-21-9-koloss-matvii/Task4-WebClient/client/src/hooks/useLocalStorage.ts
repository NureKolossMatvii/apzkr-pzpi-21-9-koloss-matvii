import React, { useState } from 'react'

export const useLocalStorage = (key:string, defaultValue:string): [string, (newValue: string) => void] => {
    const [storedValue, setStoredValue] = useState<string>(() =>{
        try{ 
            const value = localStorage.getItem(key)
            
            if(value){
                return JSON.parse(value)
            }else{
                localStorage.setItem(key, JSON.stringify(defaultValue))
                return defaultValue;
            }
        }catch(error){
            return defaultValue;
        }
    })

    const setValue = (newValue:string) =>{
        try{ 
            localStorage.setItem(key, JSON.stringify(newValue))
        }catch (error){
            console.log(error)
        }
        setStoredValue(newValue)
    }

  return [storedValue, setValue]
}
