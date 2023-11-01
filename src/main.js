const prompt = require('prompt-sync')({ sigint: true });
function option_board(){
    console.log('1、add object')
    console.log('2、view object')
    console.log('3、bid')
    console.log('4、settle account')
    console.log('5、exit')
}
const objects = []
function object_add(){
    try{
        let new_id = prompt('please number this object:')
        let new_name = prompt('please name this object:')
        let new_base = prompt('please type the base price of this object:')
        let new_count = 0
        let new_state = ''
        for(let i of objects){
            if (new_id == i.id){
                console.log('error, id already exist')
                object_add()
                return
            }
        }
        const objects_dict = {}
        objects_dict.id = new_id
        objects_dict.name = new_name
        objects_dict.base = new_base
        objects_dict.count = new_count
        objects_dict.state = new_state
        objects.push(objects_dict)
        }catch(error){
            console.log(error)
            object_add()
        }


    }
const buyer = []   
const buyer_dict = {}
function bid(){
    try{
        if(objects.length < 2){
            console.log('insufficient inventory, please add object')
            object_add()
            return
        }else{
            let buy = prompt('please type buyer number: ')
            let item = prompt('please type the object number: ')
            let price = prompt('please type your bid price: ')
            for ( let i of objects){
                if (i.id == item && parseInt(i.base) < parseInt(price)){
                    i.count += 1
                    i.state = 'sold'
                }else if (i.id == item && parseInt(i.base) >= parseInt(price)){
                    i.state = 'less'
                }else{
                    console.log(' type error')
                    bid()  // why it turns out like bellow result
                    return
                }
            }   
            buyer_dict.item = item
            buyer_dict.buyer = buy
            buyer_dict.bid_price = price
            buyer.push(buyer_dict)
            console.log(buyer)
            console.log(objects)
    }
    
    }catch(error){
        console.log(error)
        bid()
    }
    
}
    

function custom_view(){
    try{
        if(objects.length < 2){
            console.log('insufficient inventory, please add object')
            object_add()
            return
        }else{
            let number = prompt('please type the item number(1,2,3...): ')
            for( let i of objects){
                if(i.id == number){
                    console.log(i)
                    break
            }
        }
        }
    }catch(error){
        console.log(error)
        custom_view()
    }
    
}
   

function summary(){
    try{
        for (let i of buyer){
            let sum = 0
            let elsum = 0
            sum += parseInt(i.bid_price)
            elsum += parseInt(i.bid_price)*0.1
            console.log('total amount: ' + (sum+elsum))
            break
        }
    }catch(error){
        console.log(error)
    }
    
}
    
function account(){
    try{
        let o=[]
        let p=[]
        let q=[]
        for (let i of objects){
            if (i.state == 'sold'){
                o.push(i)
            }else if(i.state == 'less'){
                p.push(i)
            }else if(i.state == ''){
                q.push(i)
            }else{
                console.log('Error')
            }
        }
        console.log('sold: '+ o.length +', less: ' + p.length + ', no view: ' + q.length)
    }catch(error){
        console.log(error)
    }
    
}

function info_all(){
    try{
        console.log(summary())
        console.log(account())
        for(let i of objects){
            if (i.state == 'less'){
                for ( j of buyer){
                    if (j.item == i.id){
                        console.log('less:%o', j )
                    }
                        
                }
                    
            }else if (i.state == ''){
                console.log('no view:%o ', i)
            }else{
                console.log('Error')
            }
            
        }
    }catch(error){
        console.log(error)
    }
    
        
}
    
    
while(true){
    try{
        option_board()
        let num = parseInt(prompt('please enter number: '))
        if (num == 1){
            object_add()
        }else if(num == 2){
            custom_view()
        }else if(num == 3){
            bid()
        }else if(num == 4){
            info_all()
        }else if(num == 5){
            exit_flag = prompt('Exit? (yes or no): ')
            if(exit_flag == 'yes'){
                break
            }else{
                console.log('type error')
            }
                    
        }
    }catch(error){
        console.log(error)
    }
    
       
}
