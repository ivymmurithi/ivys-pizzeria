$(document).ready( function() {

    $('.btn').click(function increment() {
        let input_form = $(this).parent().find('input');
        let current_value = input_form.val();
        if( $(this).html() === "+" ) {
            let new_value = parseInt(current_value)+1;
            input_form.val(new_value);
        } 
        if( $(this).html() === "-" ) {
            if (current_value == 0) return;
            let new_value = parseInt(current_value)-1;
            input_form.val(new_value);
        }
    });

    class Pizza  {
        constructor(flavor, size, crust, toppings, number) {
            this.flavor = flavor;
            this.toppings = toppings;
            this.size = size;
            this.crust = crust;
            this.number = number;
        }

        getPriceTotal() {
            let toppingsPrice = 100;
            let sizePrices = {
                Small: 500,
                Medium: 750,
                Large: 900
            };
            let crustPrices = {
                Thin: 0,
                Stuffed: 100,
                Gluten_free: 250,
            }
            return (
                ( (this.toppings.length*toppingsPrice) +
                  (sizePrices[this.size])+
                  (crustPrices[this.crust]) ) * this.number
            );
        }
        
    }

    function getCartTotal(cart) {
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

    $('form').submit(function getInput(event) {
        let pizza = formToDictionary($(this).serializeArray());
        pizza = new Pizza(pizza.flavor, pizza.Size, pizza.Crust, pizza.Toppings, pizza.pizzas);
        console.log(pizza);
        if("cart" in window){
            window.cart.push(pizza);
        } else {
            window.cart = [pizza];
        }
        $("#modal").modal('show');
        event.preventDefault();
        return;
    });

});