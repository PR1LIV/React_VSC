import { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './ItemList.module.css'

const API_URL = import.meta.env.VITE_API_URL


const ItemList = () => {
    // items = [
    //   {id: "1", name: "Xiaomi Redmi 10", description: "Топ за свои деньги!", isAvailable: true},
    //   {id: "2", name: "Iphone X", description: "Крутой телефон (нет) и дорогой (да)", isAvailable: false}
    // ]
    const [items, setItems] = useState([])
    const [itemsLoading, setItemsLoading] = useState(true)
    const [itemsError, setItemsError] = useState(null)

    useEffect(() => {
        axios.get(`${API_URL}/items`)
            .then(response => {
                setItems(response.data)
                setItemsLoading(false)
            })
            .catch(error => {
                console.error(error)
                setItemsLoading(false)

                const errMsg = (
                    error.message === "Network Error" ? "Ошибка сети"
                    : error.message === "Request failed with status code 404" ? "Ресурс не найден" // Можно так: error.response.status === 404
                    : "Повторите попытку позже"
                )
                setItemsError(`Ошибка загрузки вещей: ${errMsg}`)
            })
    }, [])

    return (
        <>
            <h1>Список вещей</h1>
            <ul>
                {
                    itemsLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Загрузка вещей...</span>
                        </div>
                    ) : itemsError ? (
                        <div>{itemsError}</div>
                    ) : items.length !== 0 ? (
                        items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <strong>{item.name}</strong>
                                <div>{item.description}</div>
                                <div>{item.isAvailable ? 'В наличии :)' : 'Нет в наличии :('}</div>
                            </div>
                        ))
                    ) : (
                        <div>Вещей ещё нет</div>
                    )
                }
            </ul>
        </>
    )
}

export default ItemList
