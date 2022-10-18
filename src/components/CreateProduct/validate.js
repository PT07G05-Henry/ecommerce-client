export default function Validate(input) {
    const error = {};
    const regexName = /^[A-Z]+[^\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/; //^[a-zA-Zñáéíóúü]*$ 
    const regexNumber = /^[0-9]+$/ 

    if(!input.name) error.name = 'need a product name';
    if(!regexName.test(input.name)) error.name = 'The first letter has to be uppercase, and only letters';
    if(input.name.length < 3 || input.name.length > 30 ) error.name = 'between 3 and 30 characters';

    if(!regexNumber.test(input.price)) error.price = 'only numbers';
    if(parseInt(input.price) < 1 ) error.price = 'only numbers';

    if(!regexNumber.test(input.stock)) error.stock = 'only numbers';
    if(parseInt(input.stock) < 1) error.stock = 'only numbers';    

    
return error
}