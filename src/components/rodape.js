import React from 'react'
import '../css/rodape.css'

const Rodape = () => {
    return (
        <footer className='rodape'>
            <p>&copy; {new Date().getFullYear()} Auction. All rights reserved.</p>
        </footer>
    )
}

export default Rodape;