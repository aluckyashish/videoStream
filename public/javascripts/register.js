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
    var name = $("#username").val();
    var email = $("#useremail").val();
    var pwd = $("#userpwd").val();
    $.ajax({
        url: "http://localhost:3000/users/postdata",
        type: "POST",
        data: { name, email, pwd },
        success: function (res) {
          
            $("#succmes").show();
            $('#succmes').html('User Added')

        }
    })


}

const updateUser=(id)=>{
    var name = $("#username").val();
    var email = $("#useremail").val();
    $.ajax({
        url: "http://localhost:3000/users/updatedata/"+id,
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
const gotToEdit = (id) => {
    window.location.href = "/users/useraction/" + id

}