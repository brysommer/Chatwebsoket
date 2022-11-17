const post = {
    type: 'object',
    properties: {
        author: { 
            type: 'string', 
            minLength: 3,
            maxLength: 25,
        },
        title: { 
            type: 'string', 
            minLength: 10,
            maxLength: 80, 
        },
        content: { 
            type: 'string', 
            minLength: 5,
            maxLength: 500, 
        },
        price: { 
            type: 'string', 
            minLength: 1,
            maxLength: 9, 
        },
        keywordsinput: { 
            type: 'string', 
            minLength: 1,
        },
        location: { 
            type: 'string', 
            minLength: 1,
            maxLength: 50, 
        },
    },
    required: ['author', 'title', 'content', 'price', 'keywordsinput', 'location'],
}

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

module.exports = {search, comment, post};