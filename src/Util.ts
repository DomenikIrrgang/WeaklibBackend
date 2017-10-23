export let hashFunction: (value: string) => number = (value: string) => {
    let hash = 0;
    if (value.length == 0) return hash;
    for (let i = 0; i < value.length; i++) {
        let char = value.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return hash;
}