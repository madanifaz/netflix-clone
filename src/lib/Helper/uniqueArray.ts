// Shuffle array via hash map
export default function uniqueArray(array :any[]) :any {
    let hashMap = []
    let result = []
    array.forEach((item) => {
        if (!hashMap.includes(item.id)) {
            result.push(item);
            hashMap.push(item.id)
        }
    })

    return result
}