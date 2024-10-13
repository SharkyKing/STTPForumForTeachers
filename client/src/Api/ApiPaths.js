
const ApiPaths = {
    user:{
        base: 'api/user',
        byID:(id) => `api/user/${id}`
    },
    account:{
        login: 'api/account/login',
        register: 'api/account/register',
        logout: 'api/account/logout',
        auth: 'api/account/auth'
    },
    grade:{
        base:'api/grade',
        byID:(id) => `api/grade/${id}`
    },
    role:{
        base:'api/role',
        byID:(id) => `api/role/${id}`
    },
    category:{
        base:'api/category',
        byID:(id) => `api/category/${id}`
    },
    thread:{
        base:'api/thread',
        vote:(id) => `api/thread/vote/${id}`,
        byID:(id) => `api/thread/${id}`,
        comment:{
            base:'api/thread/comment',
            byThreadID:(id) => `api/thread/${id}/comment`,
            vote:(id) => `api/thread/comment/vote/${id}`,
            byID:(id) => `api/thread/comment/${id}`
        }
    }
};

export default ApiPaths;
