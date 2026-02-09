import './App.css'
import { useState, useEffect } from 'react'
import config from './config'
import Portfolio from './compenents/Portfolio'
import PdfDisplay from './compenents/PdfDisplay'
import All from './compenents/All'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const [loading, setload] = useState(true)


  const [bilalcerts, setbilal] = useState([])
  const [brittocerts, setbritto] = useState([])
  const [abhishekcerts, setabhishek] = useState([])
  const [devadathcerts, setdevadath] = useState([])
  const [akashcerts, setakash] = useState([])
  const [adhilcerts, setadhil] = useState([])
  const [vaishnavcerts, setvaishnav] = useState([])
  const [nidhincerts, setnidhin] = useState([])
  const [karthikacerts, setkarthika] = useState([])
  const [athulcerts, setathul] = useState([])
  const [hridhyacerts, sethridhya] = useState([])
  const [joyalcerts, setjoyal] = useState([])

  const [bilalprojects, setbilals] = useState([])
  const [brittoprojects, setbrittos] = useState([])
  const [abhishekprojects, setabhisheks] = useState([])
  const [devadathprojects, setdevadaths] = useState([])
  const [akashprojects, setakashs] = useState([])
  const [adhilprojects, setadhils] = useState([])
  const [vaishnavprojects, setvaishnavs] = useState([])
  const [nidhinprojects, setnidhins] = useState([])
  const [karthikaprojects, setkarthikas] = useState([])
  const [athulprojects, setathuls] = useState([])
  const [hridhyaprojects, sethridhyas] = useState([])
  const [joyalprojects, setjoyals] = useState([])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}`, { method: "GET" });
        if (res.ok) {
          setload(false)
          clearInterval(interval);
        }
      } catch { }
    }, 2000);

    return () => {
      clearInterval(interval)
    };
  }, []);



  function Layout({ children, loading }) {
    return (
      <>
        {loading ? (
          <div className='container' style={{ height: '100vh', justifyContent: 'center', backgroundColor: 'white' }}>
            <div className="spinner"></div>
            <p>Waiting for server...</p>
          </div>
        ) : (
          <main>{children}</main>
        )}

      </>
    )
  }

  async function certs() {
    const res = await fetch(`${config.API_BASE_URL}/readcerts`, {
      method: "POST",
      credentials: 'include',
    });

    const response = await res.json();
    if (response.success == true) {
      setbilal(response.bilal)
      setbritto(response.britto)
      setabhishek(response.abhishek)
      setdevadath(response.devadath)
      setakash(response.akash)
      setadhil(response.adhil)
      setvaishnav(response.vaishnav)
      setnidhin(response.nidhin)
      setkarthika(response.karthika)
      setathul(response.athul)
      sethridhya(response.hridhya)
      setjoyal(response.joyal)
    }
  }

  async function projects() {
    const res = await fetch(`${config.API_BASE_URL}/readprojects`, {
      method: "POST",
      credentials: 'include'
    });

    const response = await res.json();
    if (response.success == true) {
      setbilals(response.bilal)
      setbrittos(response.britto)
      setabhisheks(response.abhishek)
      setdevadaths(response.devadath)
      setakashs(response.akash)
      setadhils(response.adhil)
      setvaishnavs(response.vaishnav)
      setnidhins(response.nidhin)
      setkarthikas(response.karthika)
      setathuls(response.athul)
      sethridhyas(response.hridhya)
      setjoyals(response.joyal)
    }
  }

  useEffect(() => {
    async function certificate() {
      await certs()
      await projects()
    }
    certificate()
  }, [])



  const Router = createBrowserRouter([
    {
      path: "/Bilal",
      element: <Layout loading={loading}><Portfolio certificates={bilalcerts} projects={bilalprojects} /></Layout>
    },
    {
      path: "/Britto",
      element: <Layout loading={loading}><Portfolio certificates={brittocerts} projects={brittoprojects} /></Layout>
    },
    {
      path: "/Abhishek",
      element: <Layout loading={loading}><Portfolio certificates={abhishekcerts} projects={abhishekprojects} /></Layout>
    },
    {
      path: "/Devadath",
      element: <Layout loading={loading}><Portfolio certificates={devadathcerts} projects={devadathprojects} /></Layout>
    },
    {
      path: '/Akash',
      element: <Layout loading={loading}><Portfolio certificates={akashcerts} projects={akashprojects} /></Layout>
    },
    {
      path: '/Adhil',
      element: <Layout loading={loading}><Portfolio certificates={adhilcerts} projects={adhilprojects} /></Layout>
    },
    {
      path: '/vaishnav',
      element: <Layout loading={loading}><Portfolio certificates={vaishnavcerts} projects={vaishnavprojects} /></Layout>
    },
    {
      path: '/nidhin',
      element: <Layout loading={loading}><Portfolio certificates={nidhincerts} projects={nidhinprojects} /></Layout>
    },
    {
      path: '/karthika',
      element: <Layout loading={loading}><Portfolio certificates={karthikacerts} projects={karthikaprojects} /></Layout>
    },
    {
      path: '/athul',
      element: <Layout loading={loading}><Portfolio certificates={athulcerts} projects={athulprojects} /></Layout>
    },
    {
      path: '/hridhya',
      element: <Layout loading={loading}><Portfolio certificates={hridhyacerts} projects={hridhyaprojects} /></Layout>
    },
    {
      path: '/joyal',
      element: <Layout loading={loading}><Portfolio certificates={joyalcerts} projects={joyalprojects} /></Layout>
    },
    {
      path: '/display/:name',
      element: <Layout loading={loading}><PdfDisplay /></Layout>
    },
    {
      path: '/*',
      element: <All />
    }
  ])
  return (
    <RouterProvider router={Router} />
  )
}

export default App
