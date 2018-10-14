//存储数据到localStorage
export const setStore = (name, content) => {
    if(!name) return
    localStorage.setItem(name, content)
}
//从localStorage获取数据
export const getStore = name => {
    if(!name) return
    return localStorage.getItem(name)
}
//删除localStorage的数据
export const removeStore = name => {
    if(!name) return
    localStorage.removeItem(name)
}