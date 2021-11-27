$(document).ready( function() {

    $('.btn').click(function increment() {
        let input_form = $(this).parent().find('input');
        let current_value = input_form.val();
        if( $(this).html() === "+" ) {
            let new_value = parseInt(current_value)+1;
            input_form.val(new_value);
        } else {
            if (current_value == 0) return;
            let new_value = parseInt(current_value)-1;
            input_form.val(new_value);
        }
    });

});

class Pizza  {
    constructor(flavor, size, crust) {
        this.flavor = flavor;
        this.toppings = toppings;
        this.size = size;
        this.crust = crust;
    }
}