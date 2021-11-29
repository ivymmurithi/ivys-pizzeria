$(document).ready( function() {

    /**
     * Business Logic
     */

    class Pizza  {
        constructor(flavor, size, crust, toppings, number) {
            this.flavor = flavor;
            this.toppings = toppings;
            this.size = size;
            this.crust = crust;
            this.number = parseInt(number);
        }

        getPriceTotal() {
            let toppingsPrice = 100;
            let sizePrices = {
                Small: 500,
                Medium: 750,
                Large: 900,
            };
            let crustPrices = {
                Thin: 0,
                Stuffed: 100,
                Gluten_Free: 250,
            }
            let total = (
                ( parseInt(toppingsPrice) + 
                  parseInt(sizePrices[this.size])+
                  parseInt(crustPrices[this.crust]) ) * 
                  parseInt(this.number)
            );
            return total; 
        }

        toHtml() {
            return `<p>${this.size} ${this.flavor} with ${this.toppings} topping 
                    and ${this.crust} crust for ${this.getPriceTotal()}</p>`;
        }
        
    }

    function getCartTotal(cart) {
        if ( !("cart" in window) ){
            return 0;
        }
        let total = 0;
        cart.forEach(pizza => {
            total += pizza.getPriceTotal();
        });
        return total;
    }

    function formToDictionary(formData) {
        let object = {};
        formData.forEach((key) => {
            object[key.name] = key.value;    
        });
        return object;
    }

    function generateCartEntries(){
        let html = "";
        window.cart.forEach((pizza) => {
            html += pizza.toHtml() + "<br>";
        });
        html += `<p><strong>TOTAL</strong>: ${getCartTotal(window.cart)}</p>`;
        return html;
    }

    function addToCart(cart, pizza) {
        let added = false;
        if(cart.length == 0) {
            cart.push(pizza);
            return
        } else {
            cart.forEach((pizza_) => {
                let newHtml = pizza_.toHtml();
                let oldHtml = pizza.toHtml();
                if(newHtml.substring(0, newHtml.lastIndexOf(' ')) === oldHtml.substring(0, oldHtml.lastIndexOf(' '))){
                    pizza_.number += 1;
                    added = true;
                }
            });
            if(!added) {
                cart.push(pizza);
            } else {
                return;
            }
        }
    }

    /**
     * User Logic
     */

    $('form').submit(function getInput(event) {
        let pizza = formToDictionary($(this).serializeArray());
        pizza = new Pizza(pizza.flavor, pizza.Size, pizza.Crust, pizza.Toppings, pizza.pizzas);
        console.log(pizza.getPriceTotal());
        if("cart" in window){
            addToCart( window.cart, pizza );
        } else {
            window.cart = [pizza];
        }
        $("#modal-body").html(generateCartEntries());
        $("#modal").modal('show');
        event.preventDefault();
        return;
    });

    $('.btn').click( function increment() {
        let input_form = $(this).parent().find('input');
        let current_value = input_form.val();
        if( $(this).html() === "+" ) {
            let new_value = parseInt(current_value)+1;
            input_form.val(new_value);
        } 
        if( $(this).html() === "-" ) {
            if (current_value == 1) return;
            let new_value = parseInt(current_value)-1;
            input_form.val(new_value);
        }
    });

    $('#checkout').click( function renderLocation() {
        if($(this).html() === "Checkout") {
            let html = `
                <h4>Please tell us your delivery location(Optional)</h4>
                <input type="text" name="location" id="location-input"/>
            `;
            $(this).html("Confirm");
            $("#modal-body").html(html);
        } else {
            let location = $("#location-input").val();
            let html = `
                <h4>Delivering:</h4><br>
                ${generateCartEntries()}<br>
                <strong>TO:</strong> ${location}<br>
            `;
            $("#modal-body").html(html);
            
            $(".modal-footer").remove();
        }
    });

});