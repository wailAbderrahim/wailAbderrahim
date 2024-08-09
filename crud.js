let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mod = 'create';
let t;

// get total
total.innerHTML = '';
function getTotal() {
    //console.log("done")
    if (price.value != '') {


        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";


    } else {
        total.innerHTML = '';
        total.style.background = "rgb(226, 12, 12)";

    }

}

//read data
let data;

if (localStorage.product != null) {

    data = JSON.parse(localStorage.product);

} else {
    data = [];
}

showData();
submit.onclick = function () {

    let product = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        count : count.value,
        total :  total.innerHTML,
        category : category.value.toLowerCase(),

    }
    if (title.value != '') {
        if (mod === 'create') {
            if (product.count > 1) {
    
                for (let i = 0; i < product.count; i++){
                    
                    data.push(product);
                }
                
            } else {
                data.push(product);
            } 
            
        } else {
            data[t] = product;
            mod = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
    }


        
        
    
    
    localStorage.setItem('product', JSON.stringify(data));
    clearData()
    showData();
    getTotal()




}


// create data

function clearData() {
        title.value = "";
        price.value = "";
        taxes.value = "";
        ads.value = "";
        discount.value = "";
        count.value = "";
        total.innerHTML = "";
        category.value = "";

}




function showData() {
    table = "";
    for (let i = 0; i < data.length; i++) {

        pro = data[i];
        
        table += `

                <tr>
                    <td>${i+1}</td>
                    <td>${pro.title}</td>
                    <td>${pro.price}</td>
                    <td>${pro.taxes}</td>
                    <td>${pro.ads}</td>
                    <td>${pro.total}</td>
                    <td>${pro.count}</td>
                    <td>${pro.category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                </tr>
        
        
        
        `;
        document.getElementById("tbody").innerHTML = table;

        let btnDeleteAll = document.getElementById('deleteAll');
        if (data.length > 0) {

            btnDeleteAll.innerHTML = `
                    <button onclick="deleteAll()" id="update">Delete all (${data.length})</button>
            
            
            `;
            

        } else {
            btnDeleteAll.innerHTML = "";
        }


    }
}



function deleteData(i) {
    
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    showData()
}
function deleteAll() {
    localStorage.clear();
    data.splice(0);
    showData()
}



function updateData(i ) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    count.style.display = "none";
    submit.innerHTML = "update";
    
    category.value = data[i].category;

    mod = 'update';

    getTotal()
    t = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })

}

let searchMod = 'title';

let search = document.getElementById('search')

function getSearchMode(id) {
    if (id == 'searchTitle') {
        searchMod = 'title';
        search.placeholder = 'search by title';
    } else {
        searchMod = 'category';
        
        
    }
    search.placeholder = 'search by '+ searchMod;
    search.value = '';
    search.focus()
    showData()
    
    
}

function searchData(value) {
    table = '';
    if (searchMod == 'title') {
        
        for (let i = 0; i < data.length; i++){
            
            if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `

                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                </tr>
        
        
        
        `;
        
            } 
        }

    } else {
        for (let i = 0; i < data.length; i++){
            
            if (data[i].category.toLowerCase().includes(value)) {
                table += `

                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                </tr>
        
        
        
        `;
        
            } 
        }
        
                
    }
    document.getElementById("tbody").innerHTML = table;
    
}






