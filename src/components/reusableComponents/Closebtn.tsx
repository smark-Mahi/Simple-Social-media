import React from 'react'
import Close from "@mui/icons-material/Close";


type propstype = {
  onClick: () => boolean
};

const Closebtn = ({onClick}:propstype) => {
  return (<Close className='absolute top-0 right-0 cursor-pointer' onClick={onClick}/>)
}

export default Closebtn
