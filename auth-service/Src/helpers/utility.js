const createUser = (UserAttributes) =>
{  
    let user = {};
    UserAttributes.map(attr =>
    {
        if(attr.Name ==='sub') user['id'] = attr.Value;
        if(attr.Name ==='given_name') user['firstname'] = attr.Value;
        if(attr.Name ==='family_name') user['lastname'] = attr.Value;
        if(attr.Name ==='email') user['email'] =  attr.Value;
        if(attr.Name ==='phone_number') user['phone'] = attr.Value;           
        if(attr.Name ==='gender') user['gender'] = attr.Value;
    });
    return user;
}

const createUsers = (Users) =>
{
    let userList = [];
    Users.map(user => userList.push(createUser(user.Attributes)));
    return userList
}

const createAttributes = (req) =>
{
    const { email, given_name, family_name, phone_number, gender } = req.body;
    const attrs =[
        { name: 'email', value: email },
        { name: 'name', value: given_name + " " +  family_name},
        { name: 'given_name', value: given_name },
        { name: 'family_name', value: family_name },
        { name: 'phone_number', value: phone_number },
        { name: 'gender', value: gender },
    ]
    return attrs;
};

export default { createAttributes, createUser, createUsers}