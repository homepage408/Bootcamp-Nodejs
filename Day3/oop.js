class Loger{
    #message
    #INFO = `INFO`
    #ERROR = `ERROR`
    #NOTICE = `NOTICE`
    #WARNING = `WARNING`
    #DEBUG = `DEBUG`
    #ALERT = `ALERT`
    #CRITICAL = `CRITICAL`
    #EMERGENCY = `EMERGENCY`
    arrayMsg = []
    
    printLog(){
        this.arrayMsg.map((e)=> console.log(e))
    }

    createMessage(msg){
        const date = new Date()
        let mes = `[${date}], ${msg}`
        this.arrayMsg.push(mes)
    }

    INFO(msg){
        this.createMessage(`${this.#INFO} : ${msg}`)
    }

    ERROR(msg){
        this.createMessage(`${this.#ERROR} : ${msg}`)
    }

    NOTICE(msg){
        this.createMessage(`${this.#NOTICE} : ${msg}`)
    }

    WARNING(msg){
        this.createMessage(`${this.#WARNING} : ${msg}`)
    }

    DEBUG(msg){
        this.createMessage(`${this.#DEBUG} : ${msg}`)
    }

    ALERT(msg){
        this.createMessage(`${this.#ALERT} : ${msg}`)
    }

    CRITICAL(msg){
        this.createMessage(`${this.#CRITICAL} : ${msg}`)
    }

    EMERGENCY(msg){
        this.createMessage(`${this.#EMERGENCY} : ${msg}`)
    }

}
const logger = new Loger
logger.INFO("This is an information about something.")
logger.ERROR("We can't divide any numbers by zero.")
logger.NOTICE("Someone loves your status")
logger.WARNING("Insufficient funds")
logger.DEBUG("This is debug message")
logger.ALERT("Achtung! Achtung!")
logger.CRITICAL("Medic!! We've got critical damages")
logger.EMERGENCY("System hung. Contact system administrator immediatly")
logger.printLog()


console.log('================================================')

class Chiper{
    constructor() {
        this.CryptoJS=require('crypto-js')
    }
    encrypt(text, password){
        const encrypted= this.CryptoJS.AES.encrypt(text,password)
        console.log("Anyone cant read this messages without password")
        return encrypted.toString();
    }
    decrypt(text, password){
        const decrypted=this.CryptoJS.AES.decrypt(text, password);
        return decrypted.toString(this.CryptoJS.enc.Utf8);
    }
}

const chiper= new Chiper();
const messages=chiper.encrypt("Hallo","password");
console.log(`encrypted : ${messages}`);
const decrypt=chiper.decrypt(messages,"password");
console.log(`decrypted : ${decrypt}`);

console.log('================================================')

class Cart{
    constructor(){
        this.itemObject=[]
        this.discount=0
    }

    addItem({item_id,price,quantity}){
        // console.log({item_id,price,quantity})
        if(quantity==undefined){
            this.itemObject.push({item_id,price,quantity:1})
        } else {
            this.itemObject.push({item_id,price,quantity})
        }
        return this;
    }

    removeItem({item_id}){
        // console.log(item_id)
        for (let i = 0; i < this.itemObject.length; i++) {
            if(this.itemObject[i]['item_id']==item_id){
                this.itemObject.splice(i,1)
            }
            
        }
        return this;
    }

    addDiscount(discount){
        this.discount = parseInt(discount)
        return this
    }

    totalItem(){
        let sumItem = 0
        for (let i = 0; i < this.itemObject.length; i++) {
            sumItem += 1
        }
        console.log(`Total Item : ${sumItem}`)
    }

    totalQuantity(){
        let sumQuantity = 0
        for (let i = 0; i < this.itemObject.length; i++) {
            sumQuantity += this.itemObject[i]['quantity']
        }
        console.log(`Quantity : ${sumQuantity}`)
    }

    totalPrice(){
        let price=0
        for (let i = 0; i < this.itemObject.length; i++) {
            price += this.itemObject[i]['price'] * this.itemObject[i]['quantity']   
        }
        if(this.discount==0){
            price=price
        } else {
            price -= price*(this.discount/100)
        }
        console.log(`Price : ${price}`)
    }

    showAll(){
        console.log(this.itemObject)
    }
}

const cart= new Cart();
console.log(cart.addItem({item_id:1, price:30000, quantity:3})
.addItem({item_id:2, price:10000})
.addItem({item_id:3, price:5000, quantity:2})
.removeItem({item_id:2})
.addItem({item_id:4, price:400, quantity:6})
.addDiscount("50%")
)
cart.totalItem();
cart.totalQuantity();
cart.totalPrice();
cart.showAll();
