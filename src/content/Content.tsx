import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import './style.css'
const selector = document.querySelector.bind(document)
const selectorAll = document.querySelectorAll.bind(document)

const Content = () => {
  const [priceProduct, setPriceProduct] = useState<string>()
  const [priceSale, setPriceSale] = useState<any>()
  const [openModalInfo, setOpenModalInfo] = useState(false)
  const [openModalCart, setOpenModalCart] = useState(false)
  // const [listCart, setListCart] = useState(() => JSON.parse(localStorage.getItem(CART_KEY)) || [])

  useEffect(() => {
    const boxPrice = selector('.box-price.active')
    let priceProduct
    if (boxPrice) {
      console.log('vaoday')

      priceProduct =
        selector('.box-price.active .box-price-old')?.textContent?.replace('*', '') || ''
    }
    console.log('aâ')

    priceProduct = selector('.box-price-old')?.textContent?.replace('*', '') || ''
    setPriceProduct(priceProduct)
    console.log('rpci', priceProduct)

    const priceSale =
      selector('.box-price.active .box-price-present')?.textContent?.replace('*', '') || ''
    setPriceSale(priceSale)
    const id = selector('.detail')?.getAttribute('data-id')
    console.log('id', id)
  }, [])

  const handleGetInfo = () => {
    setOpenModalInfo(!openModalInfo)
    if (openModalCart) setOpenModalCart(!openModalCart)
  }
  const handleAddToCart = () => {
    setOpenModalCart(!openModalCart)
    if (openModalInfo) setOpenModalInfo(!openModalInfo)
  }

  chrome.runtime.onMessage.addListener(function (request: any, sender: any, sendResponse: any) {
    if (request.command == 'GET_INFO') {
      handleGetInfo()
    }

    if (request.command == 'ADD_TO_CART') {
      handleAddToCart()
    }
  })

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center w-screen h-16 bg-amber-600 z-1000000000000000 px-9 place-content-between ">
      {/* <div className="absolute h-6 right-10 bottom-28 z-1000000000000000">
        <button className="p-4 font-medium text-white border-none rounded-full bg-amber-600 font-roboto hover:cursor-pointer">
        </button>
      </div> */}
      <div className="text-lg font-normal text-white font-roboto">
        Giá sản phẩm:{' '}
        {priceSale ? (
          <>
            <span className="pr-2 font-medium text-white">{priceSale}</span>
            <del className="text-black">{priceProduct}</del>
          </>
        ) : (
          <span>{priceProduct}</span>
        )}
      </div>
      <div>
        <button
          className="px-3 py-2 text-sm font-medium bg-white border-none rounded-lg text-slate-800 text-s hover:bg-slate-100 hover:text-slate-900 font-roboto hover:cursor-pointer"
          onClick={handleGetInfo}
        >
          Thông tin sản phẩm
        </button>
        {openModalInfo && (
          <Modal
            bodyStyle={{ overflow: 'auto', height: '70vh' }}
            footer={null}
            width={1000}
            title="Thông Tin Sản Phẩm"
            open={openModalInfo}
            onCancel={() => setOpenModalInfo(!openModalInfo)}
          >
            <h1 className="mb-2 text-2xl font-medium font-roboto">{selector('h1')?.textContent}</h1>
            <div className="flex items-center mb-4 ">
              <div className="mr-2">Đánh Giá: </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: selector('.box02__left .detail-rate p')?.innerHTML || '',
                }}
              ></div>
            </div>
            <div className="">
              <img
                className="image-product"
                src={
                  selector(
                    '.detail-slider .owl-stage-outer .owl-stage .owl-item.active img',
                  )?.getAttribute('src') || ''
                }
                alt=""
              />
              <div
                className="whitespace-pre-line info-product"
                dangerouslySetInnerHTML={{
                  __html: selector('.content-article')?.innerHTML || '',
                }}
              ></div>
            </div>
          </Modal>
        )}
        <button
          className="px-3 py-2 mx-4 text-sm font-medium bg-white border-none rounded-lg text-slate-800 text-s hover:bg-slate-100 hover:text-slate-900 font-roboto hover:cursor-pointer"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
        {openModalCart && (
          <Modal
            bodyStyle={{ overflow: 'auto', height: '60vh' }}
            footer={null}
            width={700}
            title=""
            open={openModalCart}
            onCancel={() => setOpenModalCart(!openModalCart)}
          >
            <div className="mt-10">
              <img
                className="image-product"
                src={
                  selector(
                    '.detail-slider .owl-stage-outer .owl-stage .owl-item.active img',
                  )?.getAttribute('src') || ''
                }
                alt=""
              />
              <h1 className="mb-2 text-2xl font-medium text-center font-roboto">
                {selector('h1')?.textContent}
              </h1>

              <h1 className="mb-2 text-2xl font-medium text-center font-roboto">
                {priceSale && priceProduct && <span>Giá Tiền:</span>}{' '}
                {priceSale ? priceSale : priceProduct}
              </h1>
            </div>
            <div className="text-center">
              {selector('.group .act')?.textContent ? (
                <button className="px-4 py-3 mx-2 border-none bg-lime-300">
                  {selector('.group .act')?.textContent}
                </button>
              ) : (
                <></>
              )}
              {selector('.color .act')?.textContent ? (
                <button className="px-4 py-3 mx-2 border-none bg-lime-300">
                  {selector('.color .act')?.textContent}
                </button>
              ) : (
                <></>
              )}
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default Content
