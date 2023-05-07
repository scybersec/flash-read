import { useState, useEffect } from "react"

import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from "../services/article"

const Demo = () => { 
  
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })

  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState([])

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery()

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [setAllArticles])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data } = await getSummary({ articleUrl: article.url })

    if(data?.summary) {
      const newArticle = {...article, summary: data.summary}
      const updateAllArticles = [newArticle, ...allArticles]

      setArticle(newArticle)
      setAllArticles(updateAllArticles)

      localStorage.setItem('articles', JSON.stringify(updateAllArticles))
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleCopySummary = () => {
    if (article.summary) {
      setCopied("summary");
      navigator.clipboard.writeText(article.summary);
      setTimeout(() => setCopied(false), 3000);
    }
  }

  return (
    <section className="mt-16 w-full">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center glassmorphism" onSubmit={handleSubmit}
        >
          
          <img 
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5 "
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle ({...article, url: e.target.value})}
            required
            className="url_input peer "
          />

          <button
          type="submit"
          className="glassmorphism submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            🚀
          </button>
        </form>
        
        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div 
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn " onClick={() => handleCopy(item.url)}>
                <img 
                  src={copied === item.url ? tick: copy} 
                  alt="copy_icon"
                  className="w-[60%] h-[60%] object-contain" 
                />  
              
              </div>
              <p className="flex-1 text-stone-900 font-PTsans font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-robotoC font-bold text-black text-center">
            Well, that wasn't supposed to happen.......
            <br />
            <span className="font-PTsans font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 ">
              <div className="flex justify-between items-center">
              <h2 className="font-PTsans font-bold text-2xl blue_gradient">
                Article Summary
              </h2>
              <button
                onClick={handleCopySummary}
                className="copy_summary_btn"
              >
                <img
                  src={copied === "summary" ? tick : copy}
                  alt="copy_summary_icon"
                  className="w-[25px] h-[25px] object-contain"
                />
              </button>
             </div>
              <div className="summary_box">
                <p className=" font-robotoC font-normal text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )
      }
      </div>
    </section>
  )
}

export default Demo