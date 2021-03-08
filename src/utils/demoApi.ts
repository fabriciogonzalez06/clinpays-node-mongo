export const demoApi=()=>[
    {
        apiUrl:'<IP or  domain>/api/v1/phoneBook',
        type:'GET',
    },
    {
        apiUrl:'<IP or  domain>/api/v1/phoneBook',
        type:'POST',
        params:{
            firstName:"Angel2",
            lastName:"González2",
            phone:"939393932"
        }
    },
    {
        apiUrl:'<IP or  domain>/api/v1/phoneBook/<id>',
        type:'PUT',
        params:{
            firstName:"Angel2",
            lastName:"González2",
            phone:"939393932"
        }
    },
    {
        apiUrl:'<IP or  domain>/api/v1/phoneBook/<id>',
        type:'DELETE',
    }
];