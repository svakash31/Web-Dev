// ITEM CONTROLLER
const ItemCtrl = (function () {
    const Item = function (id, name, money) {
        this.id = id;
        this.name = name;
        this.money = money;
    };

    const data = {
        items: [
            { id: 0, name: "Clothes", money: 3000 },
            { id: 1, name: "Food", money: 2000 },
            { id: 2, name: "Car Service", money: 10000 }
        ],
        totalMoney: 0,
        currentItem:null
    };

    return {
        getData:function(){
            return data;
        },
        getItems: function () {
            return data.items;
        },
        getTotalMoney: function () {
            let total = data.items.reduce((sum, item) => sum + item.money, 0);
            data.totalMoney = total;
            return total;
        },
        addItem: function (name, money) {
            let ID = data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0;
            money = parseInt(money);
            let newItem = new Item(ID, name, money);
            data.items.push(newItem);
            return newItem;
        },
        getItemByID:function(id){
            let found = null;
            data.items.forEach(function(item){
                if(item.id == id){
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem:function(){
            return data.currentItem;
        }
    };
})();

// UI CONTROLLER
const UICtrl = (function () {
    return {
        populateItemList:function(items){
            
            let html = "";

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                            <strong>${item.name}</strong> :
                            <em>${item.money} RS</em>
                            <a href="#!" class="secondary-content">
                                 <i class="fa-solid fa-pencil edit-item"></i>
                            </a>
                        </li>
                        `
            });

            // Insert into the ul
            document.querySelector("#item-list").innerHTML = html;

        },
        addListItem:function(newItem){
          
            // Create a li element
            const li = document.createElement("li");

            // Add class to li
            li.className = "collection-item";
            
            // Add ID to li
            li.id = `item-${newItem.id}`;

            // Insert HTML
            li.innerHTML = `
                <strong>${newItem.name}</strong> :
                <em>${newItem.money} RS</em>
                <a href="#!" class="secondary-content">
                    <i class="fa-solid fa-pencil edit-item"></i>
                </a>
            `

            // append the li to ul
            document.querySelector("#item-list").appendChild(li);

        },

        showTotalMoney: function (total) {
            document.querySelector(".total-money").innerText = total;
        },

        clearEditState: function () {
            document.querySelector(".add-btn").style.display = "block";
            document.querySelector(".update-btn").style.display = "none";
            document.querySelector(".delete-btn").style.display = "none";
            document.querySelector(".back-btn").style.display = "none";
        },
        showEditState: function () {
            document.querySelector(".add-btn").style.display = "none";
            document.querySelector(".update-btn").style.display = "inline";
            document.querySelector(".delete-btn").style.display = "inline";
            document.querySelector(".back-btn").style.display = "inline";
        },

        clearAllBtn: function () {
            document.querySelector(".total-money").innerText = 0;
            document.querySelector("#item-list").innerHTML = ""; // Clear item list
        },

        addItemToForm:function(){
            document.querySelector("#item-name").value = ItemCtrl.getCurrentItem().name;
            document.querySelector("#item-money").value = ItemCtrl.getCurrentItem().money;
        },

        getItemInput: function () {
            return {
                name: document.querySelector("#item-name").value,
                money: document.querySelector("#item-money").value
            };
        },

        clearInputState: function () {
            document.querySelector("#item-name").value = "";
            document.querySelector("#item-money").value = "";
        }
    };
})();

// APP CONTROLLER
const App = (function () {
    const loadEventListeners = function () {
        document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);
        document.querySelector(".clear-btn").addEventListener("click", UICtrl.clearAllBtn);
        document.querySelector("#item-list").addEventListener("click",editItemClick);
    };

    const itemAddSubmit = function (e) {
        e.preventDefault();
        const input = UICtrl.getItemInput();
        if (input.name === "" || input.money === "") {
            alert("Please fill the fields");
        } else {
            const newItem = ItemCtrl.addItem(input.name, input.money);
            UICtrl.addListItem(newItem);
            UICtrl.showTotalMoney(ItemCtrl.getTotalMoney());
            UICtrl.clearInputState();
        }
    };

    const editItemClick = function(e){
        if(e.target.classList.contains("edit-item")){

            const listID = e.target.parentElement.parentElement.id;

            const listArr = listID.split("-");

            const id = parseInt(listArr[1]);

            const itemToEdit = ItemCtrl.getItemByID(id);

            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm();

            UICtrl.showEditState();

            
        }
    }

    return {
        start: function () {
            UICtrl.clearEditState();
            const items = ItemCtrl.getItems();
            if (items.length > 0) {
                UICtrl.populateItemList(items);
                UICtrl.showTotalMoney(ItemCtrl.getTotalMoney());
            }
            loadEventListeners();
        }
    };
})();

App.start();
