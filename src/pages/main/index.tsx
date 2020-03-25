import React, { useState, useEffect, useCallback, ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { api } from '../../services/api'
import { Loader } from '../../components/Loader'

import './styles.css'

interface IProduct {
    _id: string
    title: string
    description: string
    url: string
  }

  interface IProductInfo {
    total: number
    limit: number
    page: string
    pages: number
  }

const Main = (): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [productInfo, setProductInfo] = useState<IProductInfo>({
      total: 0,
      limit: 0,
      page: '0',
      pages: 0
    })

    useEffect(() => {
        loadProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadProducts = useCallback(async (newPage = 1): Promise<void> => {
        setLoading(true)
        const response = await api.get(`/products?page=${newPage}`)
        setLoading(false)

        const { docs: newProducts, ...newProductInfo } = response.data

        setPage(newPage)
        setProducts([...products, ...newProducts])
        setProductInfo(newProductInfo)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

      const prevPage = (): void => {
        if(page === 1) {
            return
        }

        const pageNumber = page - 1

        loadProducts(pageNumber)
      }

      const nextPage = (): void => {
          if(page === productInfo.pages) {
              return
          }

          const pageNumber = page + 1

          loadProducts(pageNumber)
      }

    return (
        <div className="product-list">
            <Loader loading={loading}/>
            {products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={page === 1} onClick={prevPage}>Anterior</button>
                <button disabled={page === productInfo.pages} onClick={nextPage}>Próxima</button>
            </div>
        </div>
    )
}

export { Main }