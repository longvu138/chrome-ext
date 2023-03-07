import './popup.css'
function App() {
  const handleGetInfo = () => {
    // @ts-ignore
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
      const message = {
        command: 'GET_INFO',
        payload: {},
      }
      chrome.tabs.sendMessage(tabs[0].id, message, function (response: any) {})
    })
  }

  const handleAddToCart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
      const message = {
        command: 'ADD_TO_CART',
        payload: {},
      }
      chrome.tabs.sendMessage(tabs[0].id, message, function (response: any) {})
    })
  }

  return (
    <body>
      <div className="flex">
        <button
          className="px-3 py-2 mx-3 text-sm font-medium bg-slate-500 border-none rounded-lg text-slate-100 text-s hover:bg-slate-300 hover:text-slate-900 font-roboto hover:cursor-pointer"
          onClick={handleAddToCart}
        >
          handleAddToCart
        </button>
        <button
          className="px-3 py-2 mx-3 text-sm font-medium bg-slate-500 border-none rounded-lg text-slate-100 text-s hover:bg-slate-300 hover:text-slate-900 font-roboto hover:cursor-pointer"
          onClick={handleGetInfo}
        >
          handleGetInfo
        </button>
      </div>
    </body>
  )
}

export default App
