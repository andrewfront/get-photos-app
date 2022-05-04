import React, { useState, useEffect, useRef } from 'react'
import './index.css';
import logo from './logo.png'
import spinner from './spinner.svg'
import Photo from './components/Photo';
import { FaSearch } from 'react-icons/fa';
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [newImages, setNewImages] = useState(false)
  const mounted = useRef(false)
  const fetchImages = async () => {
    setLoading(true)
    let url;
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results
        }
        else if (query) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setNewImages(false)
      setLoading(false)
    } catch (error) {
      setNewImages(false)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newImages) return
    if (loading) return
    setPage((oldPage) => oldPage + 1)
  }, [newImages])
  const event = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
      setNewImages(true)
    }
  }
useEffect(() => {
  window.addEventListener('scroll', event)
  return () => window.removeEventListener('scroll', event)
}, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query) return
    if (page === 1) {
      fetchImages()
      return
    }
    setPage(1)
  }
  return (
   <div className="wrapper">
     <header className="header">
       <div className="container">
         <div className="header__inner">
           <a href="#" className='header__link'><img src={logo} alt="" /></a>
         </div>
       </div>
     </header>
     <main className="main">
        <section className='form'>
          <div className="container">
            <form className='form__main'>
              <input type="text" className='form__input' placeholder='enter your photo' value={query} onChange={(e) => setQuery(e.target.value)}/>
              <button type='submit' className='form__submit' onClick={handleSubmit}>search <FaSearch></FaSearch></button>
            </form>
          </div>
        </section>
        <section className='photos'>
          <div className="container">
            <div className="photos__inner">
                  {photos.map((image, index) => {
                    return <Photo key={index} {...image}></Photo>
                  })}
            </div>
            {loading && <img src={spinner} alt="spinner" className='photos__spinner'/>}
          </div>
        </section>
     </main>
     <footer className="footer">
       <p className="footer__copyright">made by | andrew || unsplash database is used</p>
     </footer>
   </div>
  );
}

export default App;
