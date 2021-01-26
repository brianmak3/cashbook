const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
},
getInitialLetters = (name)=>{
    const names = name.split(' ');
    return names.length > 1? names[0][0]+''+names[1][0] : names[0].substr(0,2)
}
export {
    getRandom,
    getInitialLetters
}