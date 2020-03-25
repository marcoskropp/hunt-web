import React, { useState, useEffect, ReactElement } from 'react'

import { api } from '../../services/api'
import { Loader } from '../../components/Loader'

import './styles.css'

interface Iprops {
    match: {
        params: {
            id: string
        }
    }
}

interface IProduct {
    title: string
    description: string
    url: string
}

const Product = (props: Iprops): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false)
    const [product, setProduct] = useState<IProduct>({
        title: '',
        description: '',
        url: ''
    })

    const onLoadPage = async (): Promise<void> => {
        setLoading(true)
        const { id } = props.match.params

        const { data } = await api.get(`/products/${id}`)

        setProduct(data)
        setLoading(false)
    }

    useEffect(() => {
       onLoadPage()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="product-info">
            <Loader loading={loading}/>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>
                URL: <a href={product.url}>{product.url}</a>
            </p>
        </div>
    )
}

export { Product }