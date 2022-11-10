export default function Validate(input) {
    const error = {};
    
    if(input.first_name && input.first_name.length > 50) error.first_name = 'Maximum 50 characters for the first name';
    if(input.first_name && input.first_name.length < 3) error.first_name = 'Minimum 50 characters for the first name';
    if(input.last_name && input.last_name.length > 50) error.last_name = 'Maximum 50 characters for the last name';
    if(input.last_name && input.last_name.length < 3) error.last_name = 'Minimum 3 characters for the last name';
    if(input.birth_date && new Date(input.birth_date) > new Date('01/01/2004')) error.birth_date = 'You must be over 18 years old';
    if(input.birth_date && new Date(input.birth_date) < new Date('01/01/1912')) error.birth_date = 'You must be under 110 years old';

    return error;
};