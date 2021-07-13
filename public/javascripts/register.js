const deleteUsers = (id) => {
    $.ajax({
        url: 'http://localhost:3000/users/deletedata/' + id,
        type: 'DELETE',
        success: function (res) {
            location.reload();

        }
    })

}

const adduser = () => {
    $.ajax({
        url: "http://localhost:3000/mongo/newuser",
        type: "POST",
        data: new FormData($('#userActionForm')[0]),
        contentType: false,
        headers:{
            'token':'Bearer ashishioshohsohso'
        },
        processData: false,
        cache: false,
        success: function (res) {
            $('#userActionForm').trigger('reset');
            $("#succmes").show();
            $('#succmes').html('User Added')

        }
    })


}

const updateUser = (id) => {
    var name = $("#username").val();
    var email = $("#useremail").val();
    $.ajax({
        url: "http://localhost:3000/users/updatedata/" + id,
        type: "PUT",
        data: { name, email },
        success: function (res) {
            $("#succmes").show();
            $('#succmes').html('User Updated')
            //alert("User Update")
            //location.reload();

        }
    })
}



const loginuser = () => {
    $.ajax({
        url: "http://localhost:3000/mongo/loginUser",
        type: "POST",
        data: new FormData($('#userActionForm')[0]),
        contentType: false,
        processData: false,
        cache: false,
        success: function (res) {
            $('#userActionForm').trigger('reset');
            $("#succmes").show();
            $('#succmes').html('User Added')

        }
    })


}
const gotToEdit = (id) => {
    window.location.href = "/users/useraction/" + id

}