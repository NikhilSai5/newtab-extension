import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const API_KEY = "e4747bc0eb834a96b6c034ee74f63285";

const Sidebar = () => {
  const {
    data: newsData,
    error,
    isLoading,
  } = useQuery("newsData", async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=in`
    );
    const data = await response.json();
    return data.articles;
  });

  const [sidebarWidth, setSidebarWidth] = useState(0);
  const openSidebar = () => {
    setSidebarWidth(500);
  };

  const closeSidebar = () => {
    setSidebarWidth(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching news</div>;

  return (
    <>
      <div className="SidebarContainer" style={{ width: sidebarWidth + "px" }}>
        <button className="SidebarCloseBtn" onClick={closeSidebar}>
          <img className="CloseImg" src="/close.png" />
        </button>
        <div className="newsArea">
          <div className="newsHeader">
            <h2 className="headlines">Headlines</h2>
          </div>

          {newsData &&
            newsData.length > 0 &&
            newsData.slice(0, 10).map((newsItem, index) => (
              <div className="newsComponent">
                <div className="newsText">
                  <h3 className="newsWebsiteName">
                    <a className="newsLink" href={newsItem.url}>
                      {newsItem.source.name}
                    </a>
                  </h3>
                  <p className="newsDiscription">{newsItem.title}</p>
                </div>
                <div className="newsImgArea">
                  <img className="newsImg" src={newsItem.urlToImage} />
                </div>
              </div>
            ))}
        </div>
      </div>

      <button className="SidebarOpenBtn" onClick={openSidebar}>
        <img className="OpenImg" src="/right.png" />
      </button>
    </>
  );
};

export default Sidebar;
