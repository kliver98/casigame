export function formatmoney(money) {
    var m = money.toString()
    var rst = '';
    if (money.toString().length<4)
        return money
    for(var i=m.length-1; i>=0;i--) {
        rst+=m[i]
        if ((m.length-(i))%3===0 && i!==0) {
            rst+='.'
        }
    }
    return rst.split('').reverse().join('')
}