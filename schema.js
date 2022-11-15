/* validMW({
    type: 'object',
    properties: {
        name: { 
            type: 'string', 
            minLength: 3,
            maxLength: 15,
        },
        surname: { 
            type: 'string', 
            minLength: 3,
            maxLength: 15, 
        },
        age: { 
            type: 'string', 
            minLength: 1,
            maxLength: 3, 
        },
        date: { 
            type: 'string', 
            pattern: '[12][09][0-9][0-9]-[01][1-9]-[0-3][1-9]', 
        },    
    },
    additionalProperties: false,
    required: ['name', 'surname', 'age', 'date'],
})
*/
const search = {
    type: 'object',
    properties: {
        search: { 
            type: 'string',
            minLength: 3,
            maxLength: 15, 
        },  
    }, 
};

const comment = {
    type: 'object',
    properties: {
        author: { 
            type: 'string', 
            minLength: 3,
            maxLength: 15,
        },
        comment: { 
            type: 'string', 
            minLength: 5,
            maxLength: 280, 
        },
        params: { 
            type: 'string',
            minLength: 23,
            maxLength: 25, 
        },
    },
    required: ['author', 'comment'],
}

module.exports = {search, comment};