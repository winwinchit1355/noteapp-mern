export const validateEmail = (email) =>{
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return regex.test(email);
}

export const getInitials = (name) =>{
    return name.split(" ")
                .map((word) => word[0]?.toUpperCase())
                .join("");
}