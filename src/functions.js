import parsePhoneNumber from 'libphonenumber-js';
import images from './Common/images';
import moment from 'moment';
const uri = 'http://192.168.100.5:3000/',
    networkError = 'A network error occured. Please try again later.',
    Api = (data) => new Promise((resolve, reject) => {
        fetch(uri, {
            method: 'post',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json().then(res => resolve(res))).catch(e => reject(e))
    }),
    returnUserImg = (user) => {
        return user.pic ? { uri: user.pic } : images.avatar
    },
    validateFields = (type, value) => {
        var regx;
        switch (type) {
            case 'phone':
                const error = 'Please enter a valid phone number.'
                if (!value || value.length < 10)
                    return error;
                else {
                    const phoneNumber = parsePhoneNumber(value);
                    if (!phoneNumber.isValid())
                        return error;
                    else return true
                }
            case 'email':
                regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regx.test(value))
                    return 'Please enter a valid email address.';
                else return true
            default:
                return true
        }
    },
    getDateTime = (ms) => {
        var date = new Date(ms),
            dateStr = date.toString().substr(0, 15);
        return {
            date: moment(ms).format('MMM D, YYYY'),
            time:  moment(ms).format('HH:mm') ,
            dateStr: dateStr.substr(0, 10) + ' ' + dateStr.substr(13, 2),
            ms: date.getTime()
        }
    },
    getIndex = (array, field, value) => {
        return array.findIndex(item => item[field] === value);
    },
    returnDate = (ms) => {
        return moment(ms).format('MMM D, YYYY HH:mm') 
    },
    formatDate = (date)=>{
        return new Date(moment(date).format()).getTime()
    },
    numberWithCommas = (number) =>{
        return isNaN(number)?0: number.toString().length < 10?  number.toLocaleString(): number.toExponential(2);
    },
    toPlainString = (num) => {
        return (''+ +num).replace(/(-?)(\d*)\.?(\d+)e([+-]\d+)/,
          function(a,b,c,d,e) {
            return e < 0
              ? b + '0.' + Array(1-e-c.length).join(0) + c + d
              : b + c + d + Array(e-d.length+1).join(0);
          });
      }
export {
    Api,
    validateFields,
    returnUserImg,
    getDateTime,
    getIndex,
    networkError,
    returnDate,
    numberWithCommas,
    formatDate
}