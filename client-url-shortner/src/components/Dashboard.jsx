import { useEffect, useState } from 'react'
import { getItem } from '../utils/Store.jsx'
import { useNavigate } from 'react-router'

function App() {
    const navigate = useNavigate()
    const [urls, setUrls] = useState([])
    const loadUrls = async () => {
        const token = await getItem('token')
        if (!token) {
            navigate('/signin')
            return
        }
        const res = await fetch('http://127.0.0.1:8001/url/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        if (res.status == 401) {
            navigate('/signin')
            return
        }
        if (!res.ok) {
            throw new Error('something went wrong!')
        }
        const data = await res.json()
        setUrls(data['urls'])
    }

    useEffect(() => {
        const loadIt = async () => {
            loadUrls()
        }
        loadIt()
    }, [])

    return (
        <>
            <section className="center h-screen flex flex-col">
                <h1 className='text-2xl'>Dashboard</h1>
                <div className="urls ">
                    <table className='border-collapse border border-gray-400'>
                        <thead>
                            <tr>
                                <th className='text-start'>no.</th>
                                <th className='text-start'>Url</th>
                                <th className='text-start'>short link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                urls && urls.map((item, index) => (
                                    <tr key={item._id} >
                                        <td>{index + 1}</td>
                                        <td>{item.redirectUrl}</td>
                                        <td>{item.shortId}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default App
