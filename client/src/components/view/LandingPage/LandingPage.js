import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect( () => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div>
            Landing Page 랜딩 페이지
        </div>
    )
}

export default LandingPage
