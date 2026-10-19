import { useEffect, useState } from 'react'
import { getItem } from '../utils/Store.jsx'
import { useNavigate } from 'react-router'

function Dashboard() {
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
            <section className="center h-screen flex flex-col px-5 mx-5 my-5">
                <h1 className='text-2xl'>Dashboard</h1>
                <div className="urls ">
                    <table className='w-screen border-collapse border border-gray-400'>
                        <thead>
                            <tr>
                                <th className='text-start border border-gray-300 py-3 px-2'>no.</th>
                                <th className='text-start border border-gray-300 py-3 px-2'>Url</th>
                                <th className='text-start border border-gray-300 py-3 px-2'>short link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                urls && urls.map((item, index) => (
                                    <tr key={item._id} className="">
                                        <td className="border border-gray-300 py-3 px-2">{index + 1}</td>
                                        <td className="border border-gray-300 py-3 px-2">{item.redirectUrl}</td>
                                        <td className="border border-gray-300 py-3 px-2">
                                            <a href={`http://127.0.0.1:8001/url/${item.shortId}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className='bg-blue-200 hover:bg-blue-500 hover:text-white rounded py-1 px-2'>
                                                Redirect
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section >
        </>
    )
}

export default Dashboard
