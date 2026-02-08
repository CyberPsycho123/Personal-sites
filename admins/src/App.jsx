import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './compenents/Login'
import Home from './compenents/Home'
import Projectuploadpage from './compenents/Projectuploadpage'
import CertificateUploadPage from './compenents/Certificateuploadpage'
import Logout from './compenents/Logout'
import { useEffect,useState } from 'react'
import config from './config'
import './App.css'


const App = () => {
  const [loading, setload] = useState(true)
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

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout loading={loading}><Home /></Layout>
    },

    {
      path: '/certificate',
      element: <CertificateUploadPage />
    },
    {
      path: '/project',
      element: <Projectuploadpage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/logout',
      element: <Logout />
    }
  ])
  return (
    <RouterProvider router={Router} />
  )
}

export default App
