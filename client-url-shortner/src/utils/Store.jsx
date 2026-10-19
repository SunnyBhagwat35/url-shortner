
export const getItem = async (key) => {
    return localStorage.getItem(key)
}

export const setItem = async (key, value) => {

    localStorage.setItem(key, value)
    return { key: value }

}
