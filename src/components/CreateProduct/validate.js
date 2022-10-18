export default function Validate(input) {
    const error = {};
    const regexName = /^[A-Z]+[^\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/; //^[a-zA-Zñáéíóúü]*$ 
    const regexNumber = /^\d*(\.\d{0,2})?$/; //[\d]{1,7}([.]\d{2,2})?

    if(!input.name) error.name = 'need a product name';

    if(!regexName.test(input.name)) error.name = 'The first letter has to be uppercase, and only letters';

    if(input.name.length < 3 || input.name.length > 30 ) error.name = 'between 3 and 30 characters';

    if(!regexNumber.test(input.price)) error.price = 'only numbers, use dot for decimal, use 2 decimals';
    if(Number(input.price) <= 0 ) error.price = 'only positive numbers';

    if(!regexNumber.test(input.stock)) error.stock = 'only numbers';
    if(parseInt(input.stock) < 1) error.stock = 'only numbers';    

    
return error
}