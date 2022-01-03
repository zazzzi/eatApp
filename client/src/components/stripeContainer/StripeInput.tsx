
import React, { useRef, useImperativeHandle } from 'react'

const StripeInput = (
     { component : Component, inputRef, ...props }: any
) => {
     const elementRef: any = useRef();
     useImperativeHandle(inputRef, () => ({
          focus: () => elementRef.current.focus
     }));
     return (
          <Component
               onReady={(element: any) => (elementRef.current = element)}     
               {...props}
          />
     )
}
export default StripeInput